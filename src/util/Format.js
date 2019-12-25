export function formatDecimal(number, decimal) {
  let num = number.toString();
  const index = num.indexOf('.');
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
}

export function formatMoney(value, unit = 2) {
  const val = parseFloat(value, 10) || 0;
  return (val / 100).toFixed(unit);
}
