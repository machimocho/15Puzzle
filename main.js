// State
let empthyIndex

// Functions
const drawInitialNumbers = () => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
  let squares = document.getElementsByClassName("square");

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle(numbers);

  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    squares[index].innerHTML = element;
    if (element == "") empthyIndex = index;
  }
}

const startGame = () => {
  drawInitialNumbers();
}

startGame();
