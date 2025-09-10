// Fichier principale qui réuni tout les autres modules et qui lance.

import { mode } from "./setup.js";
import { chronoMode } from "./chronoMode.js";
import { survivalMode } from "./survivalMode.js";

if (mode === "survival") {
  survivalMode();
} else {
  chronoMode();
}
