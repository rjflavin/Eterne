export const checkParentsForClass = (element, className) => {
  let currentElement = element;
  let isParentHaveClass = false;

  while (currentElement !== null) {
    if (currentElement.classList.contains(className)) {
      isParentHaveClass = true;
    }
    currentElement = currentElement.parentElement;
  }

  return isParentHaveClass;
}
