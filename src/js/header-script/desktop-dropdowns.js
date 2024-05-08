const desktopMenuElement = document.getElementById('DesktopMenu');
const desktopMenuItemsElements = desktopMenuElement.querySelectorAll('[data-desktop-menu-item]');

desktopMenuItemsElements.forEach((itemElement) => {
  const hasItemDropdown = itemElement.querySelector('[data-desktop-menu-item-dropdown]');

  if (hasItemDropdown) {
    itemElement.addEventListener('mouseenter', () => {
      itemElement.classList.remove('header__desktopMenu__list__item_hideDropdown');
    });

    itemElement.addEventListener('mouseleave', () => {
      itemElement.classList.add('header__desktopMenu__list__item_hideDropdown');
    });
  }
});
