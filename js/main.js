// Fichier principal qui réunit tous les autres modules et qui lance.

import { mode, initializeHighscore, highscoreDisplayer, resetHighscore } from "./setup.js";
import { chronoMode } from "./chronoMode.js";
import { survivalMode } from "./survivalMode.js";

// Initialisation du Highscore lorsque la page est chargée
initializeHighscore();

// Lancement du Jeu
const countdownValue = document.querySelector("#countdown .countdown-value");
const startButton = document.getElementById("startButton");

if (mode === "survival") {
  // Affiche le highscore survival
  highscoreDisplayer.textContent = localStorage.highscoreSurvival;

  // Affiche le chrono de départ
  countdownValue.textContent = "3.00s | Vies : 3";

  // Réinitialise le bouton (supprime les anciens listeners)
  const newButton = startButton.cloneNode(true);
  startButton.replaceWith(newButton);

  // Configure le bouton
  newButton.style.display = "inline-block";
  newButton.textContent = "Commencer";
  newButton.addEventListener("click", () => {
    survivalMode();
    newButton.style.display = "none"; // cache le bouton après clic
  });
} else {
  chronoMode();
}
