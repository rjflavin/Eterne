const desktopMenuElement = document.getElementById('DesktopMenu');
const desktopMenuItemsElements = desktopMenuElement.querySelectorAll('[data-desktop-menu-item]');

desktopMenuItemsElements.forEach((itemElement) => {
  const hasItemDropdown = itemElement.querySelector('[data-desktop-menu-item-dropdown]');

  if (hasItemDropdown) {
    itemElement.addEventListener('mouseenter', () => {
      itemElement.classList.remove('hide-drpd');
    });

    itemElement.addEventListener('mouseleave', () => {
      itemElement.classList.add('hide-drpd');
    });
  }
});
