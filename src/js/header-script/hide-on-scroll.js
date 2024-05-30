let oldValue = window.pageYOffset || document.documentElement.scrollTop;
let newValue = window.pageYOffset || document.documentElement.scrollTop;
const headerElement = document.querySelector('page-header');

window.addEventListener('scroll', () => {
    // Get the new Value
    newValue = window.pageYOffset;

    //Subtract the two and conclude
    if(oldValue - newValue < 0
        && newValue > headerElement.offsetHeight){

        headerElement.style.opacity = 0;
        headerElement.style.visibility = 'hidden';
        headerElement.style.zIndex = '-1';

    } else if(oldValue - newValue > 0){

        headerElement.style.opacity = 1;
        headerElement.style.visibility = 'visible';
        headerElement.style.zIndex = '999';
    }

    // Update the old value
    oldValue = (newValue <= 0) ? 0 : newValue;
}, false);