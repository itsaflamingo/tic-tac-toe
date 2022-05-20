const submit = document.querySelector('.submit');
const modal = document.querySelector('.modal');
const compOption = document.querySelector('.compOption');
const gameLevels = document.querySelectorAll('.levels');
const gameboard = document.querySelector('.gameBoard');
const restart = document.querySelector('.restart');
let easy = document.querySelector('#easy');
let med = document.querySelector('#med');
let impossible = document.querySelector('#imp');
const gameDiv = document.querySelectorAll('.gameDiv');


let selectedDifficulty;

easy.addEventListener('click', (e) => (selectedDifficulty = "easy"));
med.addEventListener('click', (e) => (selectedDifficulty = "med"));
impossible.addEventListener('click', (e) => (selectedDifficulty = "imp"));

compOption.addEventListener('click', () => toggleComp());
restart.addEventListener('click', () => gameController().sendRestart());

toggleComp = () => {
    compOption.classList.toggle('active');
}

(formRetrieve = () => {

//create factory that returns object with everything we need. 

    modal.classList.add('invis');

    const playerOneInput = document.querySelector('#playerOneInput').value;
    let playerTwoInput;

    if (document.querySelector('#playerTwoInput').value !== '') {
        playerTwoInput = document.querySelector('#playerTwoInput').value;
    }
    else {
        playerTwoInput = 'Computer';
    }

    return {
        playerOneInput,
        playerTwoInput,
    };

});

submit.addEventListener("click", (e) => {
    
    let form = formRetrieve();

    const sendNames = playerFactory.playerInfo(form);
    
});

const playerFactory = (() => {

    const playerInfo = (form) => {

        console.log(form);

        //get each player's score, send to GC

        const gameControl = gameController.displayName(form);

    }

    let playerScore = (patterns) => {

        //patterns representing possible win combinations
        let pattern = [[1, 2, 3], [1, 5, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]];

        //if x's turn, get array from playerOnePattern
        if(obj.toggle === true) {
            match = obj.playerOnePattern;
            arr = Array.from(String(obj.playerOnePattern), Number);
        }

        //if o's turn, get array from playerTwoPattern
        else if (obj.toggle === false) {
            match = obj.playerTwoPattern;
            arr = Array.from(String(obj.playerTwoPattern), Number);
        }

        //loop interates over each pattern. Match will return array with same numbers as pattern if they match. 
        for(i = 0; i < pattern.length; i++) {

            match = pattern[i].filter(function(item) {
                let index = arr.indexOf(item);
                let num = item === arr[index];
                return num;
            });

            if(match.length === 3) {
                let display = gameController(obj);
                display.displayWin();
            }

        }

    }

    return {
        playerInfo
    }

})();

const gameController = (() => {

    const displayName = (form) => {

        const dispController = displayController.displayName(form);

    }

    return {

        displayName: displayName

    }

})();

const displayController = (() => {

    const nameDisplay = document.querySelector('.display-name');

    const playerChoice = () => {

        const playerOneChoice = () => {

            const p = document.createElement('p');
            p.setAttribute('class', 'para');
            playerOne = document.createTextNode('X');

            div.appendChild(p);
            p.appendChild(playerOne);

            //next selection will trigger playerTwoComp
            toggle = true;

        }

        const playerTwoChoice = () => {

            const p = document.createElement('p');
            p.setAttribute('class', 'para');
            playerTwo = document.createTextNode('O');

            div.appendChild(p);
            p.appendChild(playerTwo);

            toggle = false;

        }

        (function togglePlayers () {
            toggle ? playerOneChoice() : playerTwoChoice();
        })();
    }
    

    const displayName = (form) => {

        let namesDisplay; 

        const p = document.createElement('p');
        p.setAttribute('class', 'name-para');

        if(compOption.classList.contains('active')) {

            namesDisplay = document.createTextNode(`Hi, ${form.playerOneInput}!`);

        }

        else {

            if(modal.classList.contains('invis')) {
                namesDisplay = document.createTextNode(`Hi, ${form.playerOneInput} & ${form.playerTwoInput}!`);
            }
            else {
                return;
            }

        }

        nameDisplay.appendChild(p);
        p.appendChild(namesDisplay);

    }

    return {
        displayName,
    }

})();

const gameBoard = (() => {
    
    //create board matrix. Takes array property in array-like object, uses map() to replace all undefined with an index number, and raises that index by 1 until it reaches the stated length. 
    let divArray = Array.from({length: 9}, (undefined, index) => ++index);
    id = 0;

    gameDiv.forEach((div) => div.addEventListener('click', (e) => {

        console.log(e);
        // displayController.playerChoice(e, div)
    
    }));

    divArray.forEach((div, divArray) => {

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

