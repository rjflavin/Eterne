import { checkParentsForClass } from "../utils/check-parents-for-class/check-parents-for-class";

const burgerMenuElement = document.getElementById('BurgerMenu');
const burgerMenuButtonElement = document.getElementById('BurgerMenuButton');
const burgerMenuListWrapperElement = document.getElementById('BurgerMenuListWrapper');
const burgerMenuItemsElements = burgerMenuListWrapperElement.querySelectorAll('[data-burger-menu-item]');

// burger menu open/close

const showBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'true';
  document.body.classList.add('scr-dis-on-mbl');
  burgerMenuElement.classList.add('brgr_actv');
}

const hideBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'false';
  document.body.classList.remove('scr-dis-on-mbl');
  burgerMenuElement.classList.remove('brgr_actv');
}

burgerMenuButtonElement.addEventListener('click', () => {
  if (burgerMenuButtonElement.dataset.isBurgerMenuOpen === 'false') {
    showBurgerMenu();
  } else hideBurgerMenu();
});

// burger menu dropdowns
burgerMenuItemsElements.forEach((itemElement) => {
  const hasItemDropdown = itemElement.querySelector('[data-burger-menu-item-dropdown]');

  if (!!hasItemDropdown) {
    itemElement.addEventListener('click', (event) => {
      const isDropdownItemClicked = checkParentsForClass(event.target, 'brgr-drpd__item');
      const stateIndicatorPlus = itemElement.querySelector('[data-dropdown-state-plus]');
      const stateIndicatorMinus = itemElement.querySelector('[data-dropdown-state-minus]');
      const dropdownElement = itemElement.querySelector('[data-burger-menu-item-dropdown]');
      const shouldShowDropdown = hasItemDropdown.dataset.isDropdownOpen === 'false';

      if (!isDropdownItemClicked) {
        if (shouldShowDropdown) {
          dropdownElement.dataset.isDropdownOpen = 'true';
          itemElement.classList.remove('brgr-list__item_hid-drpd');
          stateIndicatorPlus.classList.add('brgr-list__state_hide');
          stateIndicatorMinus.classList.remove('brgr-list__state_hide');
        } else {
          dropdownElement.dataset.isDropdownOpen = 'false';
          itemElement.classList.add('brgr-list__item_hid-drpd');
          stateIndicatorPlus.classList.remove('brgr-list__state_hide');
          stateIndicatorMinus.classList.add('brgr-list__state_hide');
        }
      }
    });
  }
});

// fix 100vh bug on Safari

const updateAppHeight = () => {
  const html = document.querySelector('html');
  html.style.setProperty('--app-height', `${window.innerHeight}px`);
  html.style.setProperty('--app-width', `${window.innerWidth}px`);
}
window.addEventListener('resize', updateAppHeight);
updateAppHeight();
