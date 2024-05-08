import { checkParentsForClass } from "../check-parents-for-class/check-parents-for-class";

const burgerMenuElement = document.getElementById('BurgerMenu');
const burgerMenuButtonElement = document.getElementById('BurgerMenuButton');
const burgerMenuListWrapperElement = document.getElementById('BurgerMenuListWrapper');
const burgerMenuItemsElements = burgerMenuListWrapperElement.querySelectorAll('[data-burger-menu-item]');

// burger menu open/close

const showBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'true';
  document.body.classList.add('scrollDisableOnMobile');
  burgerMenuElement.classList.add('header__burgerMenu_active');
}

const hideBurgerMenu = () => {
  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'false';
  document.body.classList.remove('scrollDisableOnMobile');
  burgerMenuElement.classList.remove('header__burgerMenu_active');
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
      const isDropdownItemClicked = checkParentsForClass(event.target, 'header__burgerMenu__list__item__dropdown__item');
      const stateIndicatorPlus = itemElement.querySelector('[data-dropdown-state-plus]');
      const stateIndicatorMinus = itemElement.querySelector('[data-dropdown-state-minus]');
      const dropdownElement = itemElement.querySelector('[data-burger-menu-item-dropdown]');
      const shouldShowDropdown = hasItemDropdown.dataset.isDropdownOpen === 'false';

      if (!isDropdownItemClicked) {
        if (shouldShowDropdown) {
          dropdownElement.dataset.isDropdownOpen = 'true';
          itemElement.classList.remove('header__burgerMenu__list__item_hideDropdown');
          stateIndicatorPlus.classList.add('header__burgerMenu__list__item__stateIndicator_hide');
          stateIndicatorMinus.classList.remove('header__burgerMenu__list__item__stateIndicator_hide');
        } else {
          dropdownElement.dataset.isDropdownOpen = 'false';
          itemElement.classList.add('header__burgerMenu__list__item_hideDropdown');
          stateIndicatorPlus.classList.remove('header__burgerMenu__list__item__stateIndicator_hide');
          stateIndicatorMinus.classList.add('header__burgerMenu__list__item__stateIndicator_hide');
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
