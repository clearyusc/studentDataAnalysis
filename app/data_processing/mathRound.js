// eg (12.1239, 1) => 12.1
// eg (12.1239, 2) => 12.12
// eg.(12.1239, 3) => 12.124
module.exports = (number, precision) => {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};
