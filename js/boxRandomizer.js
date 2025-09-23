export const randomizedBox = document.getElementById("randomized-box");
export let currentBox = "a1";

export function randomizeBox() {
  let letters = "abcdefgh".split("");
  let numbers = "123456789".split("");
  let result = "";

  result += letters[Math.floor(Math.random() * 8)];
  result += numbers[Math.floor(Math.random() * 8)];

  randomizedBox.innerHTML = result;
  currentBox = result;
  return result;
}
