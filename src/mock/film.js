import {getRandomArrayElement} from "../utils.js";
import {getRandomInteger} from "../utils.js";
import {generateComment} from "./comment";

const MAX_DESCRIPTION_SENTENCE_COUNT = 5;
const MAX_COMMENTS_COUNT = 5;
const POSTERS_DIR = `./images/posters/`;


const POSTERS = [`made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`];

const CAPTIONS = [`Made For Each Other`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance Of Life`,
  `The Great Flamarion`,
  `The Man With The Golden Arm`];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];



const generateFilmCaption = () => getRandomArrayElement(CAPTIONS);
const generateFilmPoster = () => POSTERS_DIR + getRandomArrayElement(POSTERS);

const generateDescription = () => {
  const count = getRandomInteger(1, MAX_DESCRIPTION_SENTENCE_COUNT);
  let newDescription = [];
  for (let i = 0; i < count - 1; i++) {
    newDescription.push(getRandomArrayElement(DESCRIPTIONS));
  }
  return newDescription;
};

const generateComments = ()=>{
  const count = getRandomInteger(1, MAX_COMMENTS_COUNT);
  let newComments = [];
  for (let i = 0; i < count - 1; i++) {
    newComments.push(generateComment());
  }
  return newComments;
};

export const generateFilm = () => {
  return {
    caption: generateFilmCaption(),
    poster: generateFilmPoster(),
    description: generateDescription(),
    comments: generateComments()
  };
};
