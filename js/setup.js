/* 
Fichier qui sert à initialiser les variables (qui vont chercher dans le DOM) 
initialise le timer,
et stocke les modes de jeu (chrono1/2 ou survie).
*/

import { currentBox, randomizeBox, randomizedBox } from "./boxRandomizer.js";
import {highscoreDisplayer, initializeHighscore, updateHighscore} from "./highscore.js";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const score = document.getElementById("score-number");
const allTheBox = document.getElementsByClassName("case");
let timer = new easytimer.Timer();

export {
  mode,
  score,
  allTheBox,
  timer,
  randomizeBox,
  currentBox,
  randomizedBox,
  highscoreDisplayer,
  initializeHighscore,
  updateHighscore
};