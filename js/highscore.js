import {score} from "./setup.js";

export const highscoreDisplayer = document.getElementById("best-score-number");

export function initializeHighscore(){
    if (!localStorage.getItem('highscore1Min')){
        localStorage.setItem('highscore1Min','0');
    }
    if (!localStorage.getItem('highscore2Min')){
        localStorage.setItem('highscore2Min','0');
    }
    if (!localStorage.getItem('highscoreSurvival')){
        localStorage.setItem('highscoreSurvival','0');
    }
}

export function resetHighscore(){
    localStorage.highscore1Min = 0;
    localStorage.highscore2Min = 0;
    highscoreSurvival = 0;
}

export function updateHighscore(mode){
    if (mode === "1"){
        if (score.innerHTML > localStorage.highscore1Min){
            localStorage.highscore1Min = score.innerHTML;
            highscoreDisplayer.innerHTML = localStorage.highscore1Min
        }
    }
    else if (mode === "2"){
        if (score.innerHTML > localStorage.highscore2Min){
            localStorage.highscore1Min = score.innerHTML;
            highscoreDisplayer.innerHTML = localStorage.highscore2Min
        }
    }
    else if (mode === "survival"){
        if (score.innerHTML > localStorage.highscoreSurvival){
            localStorage.highscoreSurvival = score.innerHTML;
            highscoreDisplayer.innerHTML = localStorage.highscoreSurvival
        }
    }
    else{
        console.error("Error: not a proper game mode")
    }
    
}