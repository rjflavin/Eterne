import { checkParentsForClass } from "../utils/check-parents-for-class/check-parents-for-class";

const burgerMenuElement = document.getElementById('BurgerMenu');
const burgerMenuButtonElement = document.getElementById('BurgerMenuButton');
const burgerMenuListWrapperElement = document.getElementById('BurgerMenuListWrapper');
const burgerMenuItemsElements = burgerMenuListWrapperElement.querySelectorAll('[data-burger-menu-item]');

// burger menu open/close

const showBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'true';
  document.body.classList.add('scr-dis-on-mbl');
  burgerMenuElement.classList.add('brgr-actv');
}

const hideBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'false';
  document.body.classList.remove('scr-dis-on-mbl');
  burgerMenuElement.classList.remove('brgr-actv');
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
      const isDropdownItemClicked = checkParentsForClass(event.target, 'brgr-drpd-item');
      const stateIndicatorPlus = itemElement.querySelector('[data-dropdown-state-plus]');
      const stateIndicatorMinus = itemElement.querySelector('[data-dropdown-state-minus]');
      const dropdownElement = itemElement.querySelector('[data-burger-menu-item-dropdown]');
      const shouldShowDropdown = hasItemDropdown.dataset.isDropdownOpen === 'false';

      if (!isDropdownItemClicked) {
        if (shouldShowDropdown) {
          dropdownElement.dataset.isDropdownOpen = 'true';
          itemElement.classList.remove('brgr-list-item-hid-drpd');
          stateIndicatorPlus.classList.add('brgr-list-state-hide');
          stateIndicatorMinus.classList.remove('brgr-list-state-hide');
        } else {
          dropdownElement.dataset.isDropdownOpen = 'false';
          itemElement.classList.add('brgr-list-item-hid-drpd');
          stateIndicatorPlus.classList.remove('brgr-list-state-hide');
          stateIndicatorMinus.classList.add('brgr-list-state-hide');
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
