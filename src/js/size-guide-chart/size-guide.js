import {scrollbarWidth} from "../utils/modal";

export default class SizeGuide extends HTMLElement {
    constructor() {
        super();
        this.tabcontentElems = this.querySelectorAll('.size-tabcontent');
        this.tabLinksElems = this.querySelectorAll('.size-tablinks');
    }

    connectedCallback() {
        this.removeEmptyDetails();

        if (!this.tabLinksElems[0].classList.contains('active')) {
            this.tabLinksElems[0].classList.add('active');
        }

        this.tabLinksElems.forEach((tabLink) => {
            console.log(tabLink.dataset.type);
            tabLink.addEventListener('click', (event) => this.openSize(event, tabLink.dataset.type));
        })

        this.querySelectorAll('[data-toggle-modal]').forEach(( modalButton) => {
            modalButton.addEventListener('click', (e) => this.handleModalVisibility(modalButton, e))
        })
    }

    handleModalVisibility (modalButton, e) {
        e.preventDefault();
        const header = document.querySelector('.section-header');
        if (e.target == modalButton) {
            const modalElement = document.querySelector(`#${modalButton.dataset.connectedModal}`);
            switch (modalButton.dataset.toggleModal) {
                case 'open':
                    modalElement.classList.add('open');
                    const scrollWidth = scrollbarWidth();
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                    header.style.position = 'relative';
                    header.style.zIndex = '0';
                    break;
                case 'close':
                    modalElement.classList.remove('open');
                    document.body.style.overflow = null;
                    document.body.style.marginRight = '0';
                    header.style.position = 'sticky';
                    header.style.zIndex = '999';
                    break;
            }
        }
    }

    removeEmptyDetails() {
        const productDetailsElements = Array.from(this.querySelector('[data-product-details-size]').children);
        productDetailsElements.forEach((detail) => {
            const detailInnerHtml = detail.innerHTML.trim();
            if (detailInnerHtml === '' || detailInnerHtml === '<br>') {
                detail.remove();
            }
        })
    }

    openSize (evt, name) {
        this.tabcontentElems.forEach((tabContent) => tabContent.style.display = 'none');
        this.tabLinksElems.forEach((tabLink) => tabLink.className = tabLink.className.replace( 'active', ''));

        if (!evt.currentTarget.classList.contains('active')) {
            this.querySelector(`#${name}`).style.display = 'flex';
            evt.currentTarget.className += 'active';
        }
    }
}