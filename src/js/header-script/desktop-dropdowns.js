const desktopMenuElement = document.getElementById('DesktopMenu');
const desktopMenuItemsElements = desktopMenuElement.querySelectorAll('[data-desktop-menu-item]');

desktopMenuItemsElements.forEach((itemElement) => {
  itemElement.addEventListener('click', () => {
    window.location.href = itemElement.dataset.url;
  });

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
