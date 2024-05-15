import { validateEmail } from '../utils/form-validation';

const formElement = document.getElementById('ContactFooter');
const inputElement = formElement.querySelector('input.newsletter__input');
const sendFormButtonElement = formElement.querySelector('#Subscribe');
const footerErrorMessageContainerElement = document.getElementById('FooterErrorMessageContainer');
const errorInputClassName = 'footerFormSideInput_error';

const updateValidationMessage = (status) => {
  const emptyErrorMessageElement = footerErrorMessageContainerElement.querySelector(`[data-error-type="empty"]`);
  const invalidErrorMessageElement = footerErrorMessageContainerElement.querySelector(`[data-error-type="invalid"]`);

  switch (status) {
    case 'empty': {
      if (!inputElement.classList.contains(errorInputClassName)) {
        inputElement.classList.add(errorInputClassName);
      }

      if (emptyErrorMessageElement.classList.contains('disp-none-imp')) {
        emptyErrorMessageElement.classList.remove('disp-none-imp');
      }

      if (!invalidErrorMessageElement.classList.contains('disp-none-imp')) {
        invalidErrorMessageElement.classList.add('disp-none-imp');
      }
      break;
    }
    case 'invalid': {
      if (!inputElement.classList.contains(errorInputClassName)) {
        inputElement.classList.add(errorInputClassName);
      }

      if (invalidErrorMessageElement.classList.contains('disp-none-imp')) {
        invalidErrorMessageElement.classList.remove('disp-none-imp');
      }

      if (!emptyErrorMessageElement.classList.contains('disp-none-imp')) {
        emptyErrorMessageElement.classList.add('disp-none-imp');
      }
      break;
    }
    case 'hide': {
      if (inputElement.classList.contains(errorInputClassName)) {
        inputElement.classList.remove(errorInputClassName);
      }

      if (!invalidErrorMessageElement.classList.contains('disp-none-imp')) {
        invalidErrorMessageElement.classList.add('disp-none-imp');
      }

      if (!emptyErrorMessageElement.classList.contains('disp-none-imp')) {
        emptyErrorMessageElement.classList.add('disp-none-imp');
      }
      break;
    }
    default:
      break;
  }
}

if (inputElement) {
  inputElement.addEventListener('input', (event) => {
    const isInputEmpty = !inputElement.value;

    if (inputElement && isInputEmpty) {
      formElement.setAttribute('data-empty', '');
    } else if (inputElement) {
      formElement.removeAttribute('data-empty');
    }

    if (footerErrorMessageContainerElement) {
      updateValidationMessage('hide');
    }
  });
}

if (sendFormButtonElement) {
  sendFormButtonElement.addEventListener('click', (event) => {
    event.preventDefault();

    const isEmptyInputValue = formElement.hasAttribute('data-empty');

    if (isEmptyInputValue && footerErrorMessageContainerElement) {
      updateValidationMessage('empty');

      return;
    } else {
      const isEmailValueValid = validateEmail(inputElement.value);

      if (!isEmailValueValid && footerErrorMessageContainerElement) {
        updateValidationMessage('invalid');

        return;
      }
    }

    formElement.submit();
  });
}
