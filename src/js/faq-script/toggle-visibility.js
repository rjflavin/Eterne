import { checkParentsForClass } from "../utils/check-parents-for-class";

const questionsContainerElement = document.querySelector('.faq__questions');

const toggleVisibilityHandler = (event) => {
  const questionBlockElement = event.target.closest('[data-faq-item]');
  const isClickOnQuestion = checkParentsForClass(event.target, 'faq__question');

  if (isClickOnQuestion) {
    const answerElement = questionBlockElement.querySelector('.faq__answer');
    const plusButtonElement = questionBlockElement.querySelector('[data-plus-button]');
    const minusButtonElement = questionBlockElement.querySelector('[data-minus-button]');
    const isOpen = answerElement.classList.contains('disp-none-imp');

    if (isOpen) {
      answerElement.classList.remove('disp-none-imp');
      plusButtonElement.classList.add('disp-none-imp');
      minusButtonElement.classList.remove('disp-none-imp');
    } else {
      answerElement.classList.add('disp-none-imp');
      plusButtonElement.classList.remove('disp-none-imp');
      minusButtonElement.classList.add('disp-none-imp');
    }
  }
}

questionsContainerElement.addEventListener('click', toggleVisibilityHandler);
