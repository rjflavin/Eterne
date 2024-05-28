import { debounce } from "../utils/debounce";

export class FiltersForm extends HTMLElement {
  constructor() {
    super();

    this.debouncedOnFiltersFormSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 100);

    const facetForm = this.querySelector('form#CollectionFiltersForm');
    facetForm.addEventListener('input', this.debouncedOnFiltersFormSubmit.bind(this));
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
    fetch(url)
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

    if (collectionContentContainerElement) {
      document.querySelector('.collection__products-wrap').innerHTML = productsWrapperElement.innerHTML;

      if (collectionCheckboxFiltersElement) {
        document.querySelector('.collection__checkbox-filters').innerHTML = collectionCheckboxFiltersElement.innerHTML;
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
    return [{ section: document.querySelector('.collection__content').dataset.id }];
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    console.log('formData -', formData);
    console.log('formData to string -', new URLSearchParams(formData).toString());

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
