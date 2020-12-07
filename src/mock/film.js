import {getRandomArrayElement} from "../utils.js";
import {getRandomInteger} from "../utils.js";
import {generateRandomSet} from "../utils.js";
import {generateRandomArray} from "../utils.js";
import {generateComment} from "./comment";
import dayjs from "dayjs";

const MAX_DESCRIPTION_SENTENCE_COUNT = 5;
const MAX_COMMENTS_COUNT = 5;
const POSTERS_DIR = `./images/posters/`;
const DAYS = 30;
const MONTHS = 12;
const YEARS = 100;
const START_DATE = `1920-01-01`;
const MAX_HOURS = 2;
const MIN_HOURS = 1;
const MAX_MINUTES = 59;

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

const DIRECTORS = [`Rick Famuyiwa	`,
  `Dave Filoni`,
  `Bryce Dallas Howard`,
  `Deborah Chow`,
  `Taika Waititi`,
  `Jon Favreau`,
  `Peyton Reed`,
  `Carl Weathers`];

const SCREENWRITERS = [`Jon Favreau`,
  `George Lucas`,
  `Rick Famuyiwa`,
  `Dave Filoni`,
  `Christopher L. Yost`];

const CAST = [`Pedro Pascal`,
  `Gina Carano`,
  `Misty Rosas`,
  `Chris Bartlett`,
  `Werner Herzog`,
  `Omid Abtahi`,
  `Emily Swallow`,
  `Alexandra Manea`,
  `Richard Ayoade`];

const COUNTRYS = [`USA`, `FRANCE`, `GGY`, `GIB`, `HND`, `HKG`, `GRD`, `GRL`, `GRC`, `GEO`];
const RATINGS = [`7.3`, `9.2`, `5.6`, `4.7`, `8.6`];
const GENRES = [`blockbuster`, `cartoon`, `comedy`, `music`];
const AGE_RATING = [`0+`, `6+`, `12+`, `18+`, `21+`];
const GENRES_COUNT = 2;

const generateFilmCaption = () => getRandomArrayElement(CAPTIONS);

const generateFilmPoster = () => POSTERS_DIR + getRandomArrayElement(POSTERS);

const generateDirector = () => getRandomArrayElement(DIRECTORS);

const generateRating = () => getRandomArrayElement(RATINGS);


const generateDuration = () => {
  return {
    h: getRandomInteger(MIN_HOURS, MAX_HOURS),
    m: getRandomInteger(0, MAX_MINUTES),
  };
};

const generateCountry = () => getRandomArrayElement(COUNTRYS);

const generateAgeRating = () => getRandomArrayElement(AGE_RATING);

const generateGenres = () => Array.from(generateRandomSet(GENRES, GENRES_COUNT));

const generateScreenwriters = () => Array.from(generateRandomSet(SCREENWRITERS));

const generateCast = () => Array.from(generateRandomSet(CAST));

const getDescriptionElement = () => getRandomArrayElement(DESCRIPTIONS);

const generateDescription = () => generateRandomArray(getDescriptionElement, MAX_DESCRIPTION_SENTENCE_COUNT);

const generateComments = () => generateRandomArray(generateComment, MAX_COMMENTS_COUNT);

const generateReleaseDate = () => {
  const maxDaysGap = DAYS * MONTHS * YEARS;
  const daysGap = getRandomInteger(0, maxDaysGap);

  return dayjs(START_DATE).add(daysGap, `day`).toDate();
};

export const generateFilm = () => {
  const filmCaption = generateFilmCaption();

  return {
    caption: filmCaption,
    poster: generateFilmPoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    duration: generateDuration(),
    genres: generateGenres(),
    // далее идут расширеные значения используемые в попап
    originalName: `Original: ${filmCaption}`,
    director: generateDirector(),
    screenwriters: generateScreenwriters(),
    cast: generateCast(),
    releaseDate: generateReleaseDate(),
    country: generateCountry(),
    ageRating: generateAgeRating()
  };
};
