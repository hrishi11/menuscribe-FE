export const absLenght = (value) =>
  value
    .split("")
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item)).length;
