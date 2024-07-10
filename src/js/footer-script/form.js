import { validateEmail } from '../utils/form-validation';

const formElement = document.getElementById('NewsletterForm');
const sendRequestButtonElement = document.getElementById('NewsletterButton');
const successMessageContainerElement = document.getElementById('NewsletterSuccess');
const inputsElements = document.querySelectorAll("[name]");
const inputElement = document.getElementById('NewsletterInput');
const errorMessageContainerElement = document.getElementById('FooterErrorMessageContainer');
const errorInputClassName = 'ftr-error-msg-cont_error';

const updateValidationMessage = (status) => {
  const emptyErrorMessageElement = errorMessageContainerElement.querySelector(`[data-error-type="empty"]`);
  const invalidErrorMessageElement = errorMessageContainerElement.querySelector(`[data-error-type="invalid"]`);

  switch (status) {
    case 'empty': {
      inputElement.classList.add(errorInputClassName);
      successMessageContainerElement.classList.remove('disp-flx-imp');
      errorMessageContainerElement.classList.add('disp-flx-imp');
      emptyErrorMessageElement.classList.remove('disp-none-imp');
      invalidErrorMessageElement.classList.add('disp-none-imp');
      break;
    }
    case 'invalid': {
      inputElement.classList.add(errorInputClassName);
      successMessageContainerElement.classList.remove('disp-flx-imp');
      errorMessageContainerElement.classList.add('disp-flx-imp');
      invalidErrorMessageElement.classList.remove('disp-none-imp');
      emptyErrorMessageElement.classList.add('disp-none-imp');
      break;
    }
    case 'hide': {
      inputElement.classList.remove(errorInputClassName);
      successMessageContainerElement.classList.remove('disp-flx-imp');
      errorMessageContainerElement.classList.remove('disp-flx-imp');
      invalidErrorMessageElement.classList.add('disp-none-imp');
      emptyErrorMessageElement.classList.add('disp-none-imp');
      break;
    }
    default:
      break;
  }
}

const formToJSON = (elements) => {
  return [].reduce.call(elements, function (data, element) {
    data[element.name] = element.value;
    return data;
  }, {});
}

const getUrlString = (data) => {
  return Object.entries(data).map(function (event) {
    return event.join('=');
  }).join('&');
}

inputElement.addEventListener('input', () => {
  const isInputEmpty = !inputElement.value;

  if (inputElement && isInputEmpty) {
    formElement.setAttribute('data-empty', '');
  } else if (inputElement) {
    formElement.removeAttribute('data-empty');
  }

  if (errorMessageContainerElement) {
    updateValidationMessage('hide');
  }
});

sendRequestButtonElement.addEventListener('click', (event) => {
  event.preventDefault();

  const isEmptyInputValue = formElement.hasAttribute('data-empty');

  if (isEmptyInputValue && errorMessageContainerElement) {
    updateValidationMessage('empty');
    return;
  } else {
    const isEmailValueValid = validateEmail(inputElement.value);

    if (!isEmailValueValid && errorMessageContainerElement) {
      updateValidationMessage('invalid');
      return;
    }
  }

  if (sendRequestButtonElement.dataset.clicked !== 'true') {
    sendRequestButtonElement.dataset.clicked = 'true';
    const action = formElement.getAttribute("action");

    fetch(action, {
      method: 'POST',
      body: getUrlString(formToJSON(inputsElements)),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(() => {
      successMessageContainerElement.classList.add('disp-flx-imp');
      inputElement.value = '';
      sendRequestButtonElement.dataset.clicked = 'false';
    })
  }
});
