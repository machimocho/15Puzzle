// State
let boxLength = 4;
let empthyIndex;
let solvedMessage = document.getElementById("win");
let box = document.getElementById("box");
let solvedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];

// Functions
const drawInitialNumbers = () => {
  let numbers = [...solvedNumbers]
  let squares = document.getElementsByClassName("square");

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
    squares[index].innerText = element;
    if (element == "") empthyIndex = index;
  }
};

const startGame = () => {
  solvedMessage.style.display = "none";
  box.addEventListener("click", handleclick);
  drawInitialNumbers();
};

const verifySolved = () => {
    let squares = Array.from(document.getElementsByClassName("square")).map(function(ele){
        return isNaN(ele.innerText == '' ? 'x' : ele.innerText) ? '' : parseInt(ele.innerText, 10)
    });
    let ordered = (JSON.stringify(solvedNumbers) === JSON.stringify(squares));
    if (ordered){
        solvedMessage.style.display = "";
        box.removeEventListener("click", handleclick);
    }
}

const toogle = (divClicked) => {
  let clickedIndex = parseInt(divClicked.id.substr(2), 10);
  let divEmpthy = document.getElementById(`sq${empthyIndex}`);

  divEmpthy.innerText = divClicked.innerText;
  divClicked.innerText = "";
  empthyIndex = clickedIndex;
};

const applyChanges = (sqr) => {
    toogle(sqr);
    verifySolved()
}

const handleclick = (e) => {
  let sqr = e.target;
  if (sqr.innerText != "") {
    let clickedIndex = parseInt(sqr.id.substr(2), 10);
    // Verify if the clicked square is next to the empthy one
    if (clickedIndex + boxLength == empthyIndex) {
      // Up
     applyChanges(sqr)
    } else if (clickedIndex - boxLength == empthyIndex) {
      // Down
     applyChanges(sqr)
    } else if (
      clickedIndex - 1 == empthyIndex &&
      clickedIndex % boxLength != 0
    ) {
      // Left
     applyChanges(sqr)
    } else if (
      clickedIndex + 1 == empthyIndex &&
      clickedIndex % boxLength != boxLength - 1
    ) {
      // Right
     applyChanges(sqr)
    }
  }
};



startGame();
