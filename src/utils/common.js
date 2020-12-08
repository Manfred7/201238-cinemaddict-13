const MIN_RANDOM_SET_SIZE = 1;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const generateRandomSet = (array, count = getRandomInteger(MIN_RANDOM_SET_SIZE, array.length)) => {
  let result = new Set();
  while (result.size < count) {
    result.add(getRandomArrayElement(array));
  }
  return result;
};

export const generateRandomArray = (getElement, MaxLength) => {
  const count = getRandomInteger(1, MaxLength);

  return new Array(count).fill().map(getElement);
};
