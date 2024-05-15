const footerDropdownsTopElements = document.querySelectorAll('.mobile-drpd-top');

footerDropdownsTopElements.forEach((dropdownTopElement) => {
  const dropdownElement = dropdownTopElement.parentElement;
  const dropdownTickElement = dropdownTopElement.querySelector('.ftr-mobile-state');

  dropdownTopElement.addEventListener('click', () => {
    if (!dropdownElement.classList.contains('ftr-mobile-drpd_open')) {
      dropdownElement.classList.add('ftr-mobile-drpd_open');
      dropdownTickElement.classList.add('ftr-mobile-state_rotated');
    } else {
      dropdownElement.classList.remove('ftr-mobile-drpd_open');
      dropdownTickElement.classList.remove('ftr-mobile-state_rotated');
    }
  });
});
