export const toUpperCase = (word) => {
  return word.toUpperCase();
};

export const random = (object) => {
  const oldChoices = Array.from(object);
  const newChoices = [];
  let randomChoice = 0;
  for (let i = 0; i < object.length; i++) {
    randomChoice = Math.floor(Math.random() * oldChoices.length);
    newChoices[i] = oldChoices[randomChoice];
    oldChoices.splice(randomChoice, 1);
  }
  return newChoices;
};
