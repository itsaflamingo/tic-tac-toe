const submit = document.querySelector(".submit");
const modal = document.querySelector(".modal");
const compOption = document.querySelector(".compOption");
const gameLevels = document.querySelectorAll(".levels");
const gameboard = document.querySelector(".gameBoard");
const restart = document.querySelectorAll(".restart");
let easy = document.querySelector("#easy");
let med = document.querySelector("#med");
let impossible = document.querySelector("#imp");
let displayWin = document.querySelector('.display-winner');
let displayName = document.querySelector('.display-name');


let turnCounter = 0;
let playerOneArray = [];
let playerTwoArray = [];
let match = [];
let arr = [];

compOption.addEventListener("click", () => toggleComp());
restart.forEach((button) => button.addEventListener('click', (e) => gameController().restartGame()));


toggleComp = () => {
  compOption.classList.toggle("active");
};

const formRetrieve = () => {
  //create factory that returns object with everything we need.

  modal.classList.add("invis");

  const playerOneInput = document.querySelector("#playerOneInput").value;
  let playerTwoInput = document.querySelector("#playerTwoInput").value;

  if (compOption.classList.contains('active')) {
    playerTwoInput = "Computer";
  }

  let sendName = gameController();
  sendName.playerNames(playerOneInput, playerTwoInput);

  return {
    playerOneInput,
    playerTwoInput,
  };
};

submit.addEventListener("click", (e) => {
  let form = formRetrieve();
  return;
});

const gameController = () => {

  let send;

  const playerNames = (playerOne, playerTwo) => {
    let sendNametoDisplay = displayController.displayNames(playerOne, playerTwo);
  }

  const winnerObj = () => [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const playerChoice = (toggle, chosenNum) => {

    if (toggle === true) {
      playerOneArray.push(chosenNum);
      currentPlayer = 'O';
      if (turnCounter >= 4) {
        send = scoreCalculator();
        send.currentPlayerPattern(currentPlayer, playerOneArray);
        scoreCalculator();
      }
      turnCounter++;
    }
    if (toggle === false) {
      playerTwoArray.push(chosenNum);
      currentPlayer = 'X';
      if (turnCounter >= 4) {
        send = scoreCalculator();
        send.currentPlayerPattern(currentPlayer, playerTwoArray);
        scoreCalculator();
      }
      turnCounter++;
    }

  }

  //possible win combinations
  const winningPattern = winnerObj();

  //loop interates over each pattern. Match will return array with same numbers as pattern if they match. If array has 3 numbers, send info of winner to game.
  const scoreCalculator = () => {

    const currentPlayerPattern = (player, array) => {
      //if x's turn (true)
      if (player === 'X') {
        return arr = array.join().split(',');
      }

      //if o's turn (false)
      else if (player === 'O') {
        return arr = array.join().split(',');
      }
    };
    for (i = 0; i < winningPattern.length; i++) {

      match = winningPattern[i].filter(function (item) {
        if (displayWin.classList.contains('invis')) {
          let index = arr.indexOf(`${item}`);
          let num = `${item}` === arr[index];

          return num;
        }
      });
      if (match.length === 3) {
        arr = '';
        displayController.displayWinner(currentPlayer);
      }

    }

    return {
      currentPlayerPattern
    };
  }


  const computer = (availableTiles, toggle) => {

    let index = Math.floor(Math.random() * availableTiles.length);
    let num = availableTiles[index];

    if (toggle === false && availableTiles.length >= 1) {
      document.getElementById(num).click();
    }

  }

  const restartGame = () => {

    displayWin.classList.add('invis');

    gameDiv.forEach(div => {
      let element = document.getElementsByClassName("para");
      if (element.length > 0) {
        element[0].remove();
      }

    })

    let names = document.getElementsByClassName('name-para');
    names[0].remove();

    let p = document.getElementsByClassName('winner');
    p[0].remove();



    //reset global variables
    displayController.resetTiles();
    turnCounter = 0;
    playerOneArray = [];
    playerTwoArray = [];
    match = [];
    arr = [];

    toggle = false;
    compOption.classList.remove('active');
    modal.classList.remove('invis');
  }

  return {
    playerChoice,
    scoreCalculator,
    computer,
    restartGame,
    playerNames
  };
};

const createGameBoard = (() => {

  //create board matrix. Takes array property in array-like object, uses map() to replace all undefined with an index number, and raises that index by 1 until it reaches the stated length. 
  let divArray = Array.from({ length: 9 }, (undefined, index) => ++index);
  id = 0;

  divArray.forEach((div) => {

    ++id;

    const gamediv = document.createElement('div');
    gamediv.classList.add('gameDiv');
    gamediv.setAttribute("id", id);

    gameboard.appendChild(gamediv);

  });

  return {
    divArray
  }

})();

const gameDiv = document.querySelectorAll('.gameDiv');
gameDiv.forEach((div) => div.addEventListener('click', (e) => displayController.playerChoice(e, div)));


const displayController = (() => {

  let currentPlayer = 'X';
  let index;
  let toggle = true;
  let availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  const playerChoice = (e, div) => {

    const playerX = () => {
      currentPlayer = 'X';
      toggle = false;
    };
    const playerO = () => {
      currentPlayer = 'O';
      toggle = true;
    };

    (function togglePlayers() {
      toggle ? playerX() : playerO();
    })();

    index = availableTiles.indexOf(parseInt(e.target.id));
    let numChoice = availableTiles.splice(index, 1);
    parseInt(numChoice[0]);


    if (div.hasChildNodes() === false) {
      const p = document.createElement('p');
      p.setAttribute('class', 'para');
      div.appendChild(p);

      player = document.createTextNode(`${currentPlayer}`);
      p.appendChild(player);
    }

    currentPlayerToScore(toggle, numChoice, index);

    if (compOption.classList.contains('active')) {
      let comp = gameController();
      comp.computer(availableTiles, toggle);
    }

  }

  const currentPlayerToScore = (toggle, chosenNum) => gameController().playerChoice(toggle, chosenNum);

  const displayNames = (playerOne, playerTwo) => {

    const p = document.createElement('p');
    p.setAttribute('class', 'name-para');
    displayName.appendChild(p);
    player = document.createTextNode(`Hi, ${playerOne} and ${playerTwo}!`);
    p.appendChild(player);

  }

  const displayWinner = () => {

    displayWin.classList.remove('invis');
    let p = document.createElement('p');
    p.setAttribute('class', 'winner')
    win = document.createTextNode(`${currentPlayer} wins!`)
    p.appendChild(win);
    displayWin.appendChild(p);

  }

  const resetTiles = () => {
    return availableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  return {
    playerChoice,
    toggle,
    displayWinner,
    displayNames,
    resetTiles
  }

})();



