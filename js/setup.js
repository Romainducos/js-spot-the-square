/* 
Fichier qui sert à initialiser les variables (qui vont chercher dans le DOM) 
initialise le timer,
et stocke les modes de jeu (chrono1/2 ou survie).
*/

import { currentBox, randomizeBox, randomizedBox } from "./boxRandomizer.js";

function getDurationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const duration = parseInt(params.get("duration"), 10);
  if (!isNaN(duration) && duration > 0) {
    return duration;
  }
  return 2; // valeur par défaut
}

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const duration = getDurationFromUrl();
const score = document.getElementById("score-number");
const allTheBox = document.getElementsByClassName("case");
let timer = new easytimer.Timer();

export {
  mode,
  duration,
  score,
  allTheBox,
  timer,
  randomizeBox,
  currentBox,
  randomizedBox,
};
