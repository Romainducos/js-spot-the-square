// Fichier principale qui réuni tout les autres modules et qui lance.

import { mode } from "./setup.js";
import { chronoMode } from "./chronoMode.js";
import { survivalMode } from "./survivalMode.js";

if (mode === "survival") {
  $("#countdown .countdown-value").html("3.00s | Vies : 3");
  $("#startButton")
    .off()
    .show()
    .text("Commencer")
    .click(function () {
      survivalMode();
      $(this).hide();
    });
} else {
  chronoMode();
}
