export const randomizedBox = document.getElementById("randomized-box")

export function randomizeBox(){
    // Defining box's letters/numbers possibilities array and result variable
    let letters = 'abcdefgh'
    letters = letters.split('')
    let numbers = '123456789'
    numbers = numbers.split('')
    let result = ''

    // Generating the bow which the player will have to click on
    result += letters[Math.floor(Math.random() * 8)]
    result += numbers[Math.floor(Math.random() * 8)] //note: we're using a numbers array so as to exclude 0 from possibles values

    randomizedBox.innerHTML = result
    return result;
}