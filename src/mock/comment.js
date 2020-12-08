import {getRandomArrayElement} from "../utils/common.js";
import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const EMOJIS_DIR = `./images/emoji/`;

const COMMENTS = [`Very very old. Meh`,
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Almost two hours? Seriously?`,
  `Very well!`,
  `Good film`,
  `Bad film`,
  `Very Good film`,
  `Very bad film`];

const EMOJIS = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];

const AUTHORS = [`Tim Macoveev`, `John Doe`, `Marc Twen`, `Peter Parker`, `Ivan NoName`];

const generateText = () => getRandomArrayElement(COMMENTS);
const generateEmoji = () => EMOJIS_DIR + getRandomArrayElement(EMOJIS);
const generateAuthor = () => getRandomArrayElement(AUTHORS);

// TODO: Потестить, и разброс поменять при случае и возможно формат вывода
const generateDate = () => {
  const maxDaysGap = 15;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

export const generateComment = () => {
  return {
    emoji: generateEmoji(),
    author: generateAuthor(),
    day: generateDate(),
    text: generateText()
  };
};


