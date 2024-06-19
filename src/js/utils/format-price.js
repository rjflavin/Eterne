export const formatPrice = (priceString) => {
  const priceNumber = parseFloat(priceString) / 100;

  if (isNaN(priceNumber)) {
    throw new Error('Invalid price format');
  } else {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    });

    let formattedNumber = formatter.format(priceNumber);

    formattedNumber = formattedNumber.replace(/^(\d+)(\.\d*)$/, (match, p1, p2) => {
      return p1.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (p2 ? p2.replace(/0+$/, '') : '');
    });

    return formattedNumber;
  }
}
