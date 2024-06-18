import {debounce} from "../utils/debounce";

export class FiltersForm extends HTMLElement {
    constructor() {
        super();

        this.debouncedOnFiltersFormSubmit = debounce((event) => {
            this.onSubmitHandler(event);
        }, 100);

        const facetForm = this.querySelector('form#CollectionFiltersForm');
        facetForm.addEventListener('input', this.debouncedOnFiltersFormSubmit.bind(this));

        const filterName = this.querySelectorAll('[data-render]') || null;
        if (filterName) {
            filterName.forEach(filterWrap => {
                const renderAttribute = filterWrap.getAttribute('data-render');
                const targetElement = this.querySelector(`[data-render="${renderAttribute}"]`);
                const isSeeMoreOpenKey = `isSeeMoreOpen_${renderAttribute}`;

                if (targetElement) {
                    localStorage.setItem(isSeeMoreOpenKey, 'false');
                }
            });
        }
    }

    static setListeners() {
        const onHistoryChange = (event) => {
            const searchParams = event.state ? event.state.searchParams : FiltersForm.searchParamsInitial;
            if (searchParams === FiltersForm.searchParamsPrev) return;
            FiltersForm.renderPage(searchParams, null, false);
        };

        window.addEventListener('popstate', onHistoryChange);
    }

    static renderPage(searchParams, event, updateURLHash = true) {
        FiltersForm.searchParamsPrev = searchParams;

        const sections = FiltersForm.getSections();

        sections.forEach((section) => {
            const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;

            FiltersForm.renderSectionFromFetch(url, event);
        });

        if (updateURLHash) {
            FiltersForm.updateURLHash(searchParams);
        }
    }

    static renderSectionFromFetch(url, event) {
        return fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                const html = responseText;
                FiltersForm.filterData = [...FiltersForm.filterData, {html, url}];
                FiltersForm.renderProductGridContainer(html);
            });
    }

    static renderProductGridContainer(html) {
        const newDocument = new DOMParser().parseFromString(html, 'text/html');
        const collectionContentContainerElement = newDocument.querySelector('.collection__content') || null;
        const productsWrapperElement = newDocument.querySelector('.collection__products-wrap') || null;
        const collectionCheckboxFiltersElement = newDocument.querySelector('.collection__checkbox-filters') || null;
        const productContainers = newDocument.querySelectorAll('[data-render]') || null;

        if (collectionContentContainerElement) {
            document.querySelector('.collection__products-wrap').innerHTML = productsWrapperElement.innerHTML;

            if (collectionCheckboxFiltersElement) {
                productContainers.forEach(container => {
                    const renderAttribute = container.getAttribute('data-render');
                    const targetElement = document.querySelector(`[data-render="${renderAttribute}"]`);
                    const isSeeMoreOpenKey = `isSeeMoreOpen_${renderAttribute}`;

                    if (targetElement) {
                        const isSeeMoreOpen = localStorage.getItem(isSeeMoreOpenKey) === 'true';
                        let dataIsSee = targetElement.querySelector('[data-is-see-more-open]');

                        targetElement.innerHTML = container.innerHTML;

                        if (isSeeMoreOpen && dataIsSee) {
                            let fieldsetListLi = targetElement.querySelectorAll('.filterWrapperFieldsetList li')

                            dataIsSee.setAttribute('data-is-see-more-open', 'true');

                            fieldsetListLi.forEach(function (e) {
                                e.classList.remove('collection__sort-category-option_hidden')
                                e.querySelector('label').classList.remove('disp-none-imp')
                                targetElement.querySelector('.collection__sort-category-see-more-text').classList.add('disp-none-imp');
                                targetElement.querySelector('.collection__sort-category-see-less-text').classList.remove('disp-none-imp');
                            })
                        }
                    }
                });
            }

            document.dispatchEvent(new CustomEvent('collection-items-updated', {
                bubbles: true,
                cancelable: true,
                detail: {}
            }));
        }
    }

    static updateURLHash(searchParams) {
        history.pushState({searchParams}, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    }

    static getSections() {
        return [{section: document.querySelector('.collection__content').dataset.id}];
    }

    createSearchParams(form) {
        const formData = new FormData(form);

        return new URLSearchParams(formData).toString();
    }

    onSubmitForm(searchParams, event) {
        const input = event.target;

        FiltersForm.renderPage(searchParams, event);

        if (input.hasAttribute('checked')) {
            input.removeAttribute('checked')
            input.closest('.filterWrapperListItem').classList.remove('activeFilterValue');
        } else {
            input.setAttribute('checked', '')
            input.closest('.filterWrapperListItem').classList.add('activeFilterValue');
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const sortFilterForms = document.querySelectorAll('collection-filters-form form');
        const forms = [];

        sortFilterForms.forEach((form) => {
            if (form.id === 'CollectionFiltersForm') {
                const noJsElements = document.querySelectorAll('.no-js-list');
                noJsElements.forEach((element) => {
                    element.remove()
                });

                forms.push(this.createSearchParams(form));
            }
        });

        this.onSubmitForm(forms.join('&'), event);
    }
}
