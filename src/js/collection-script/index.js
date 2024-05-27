import { EterneCollection } from "./eterneCollection";
import { FiltersForm } from './filtersForm';

if (!customElements.get('eterne-collection')) customElements.define('eterne-collection', EterneCollection);

if (!customElements.get('collection-filters-form')) {
  customElements.define('collection-filters-form', FiltersForm);

  FiltersForm.filterData = [];
  FiltersForm.searchParamsInitial = window.location.search.slice(1);
  FiltersForm.searchParamsPrev = window.location.search.slice(1);
  FiltersForm.setListeners();
}
