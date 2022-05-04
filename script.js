const submit = document.querySelector('.submit');
const modal = document.querySelector('.modal');
const compOption = document.querySelector('.compOption');
const gameLevels = document.querySelector('.levels');
const gameboard = document.querySelector('.gameBoard');
const playerOneScoreDisplay = document.querySelector('.playerOneScore');
const playerTwoScoreDisplay = document.querySelector('.playerTwoScore');


submit.addEventListener('click', () => formRetrieve());
compOption.addEventListener('click', (e) => toggle(e));
// gameLevels.forEach(level => addEventListener('click', (e) => toggle(e)));
gameLevels.addEventListener('click', (e) => toggle(e));


toggle = (e) => {    

    if(e.target.classList.contains('compOption')) {
        compOption.classList.toggle('active');
        ('comp!');
    }
    if(e.target.classList.contains('levels')) {
        if(e.target.innerHTML === 'Easy') {
            let diff = {
                difficulty: 'easy'
            }
            let easy = playerFactory(diff);
            easy.easy();
        }
        else if(e.target.innerHTML === 'Medium') {
            let diff = {
                difficulty: 'medium'
            }
            let medium = playerFactory(diff);
            medium.med();
        }
        else if(e.target.innerHTML === 'Impossible') {
            let diff = {
                difficulty: 'impossible'
            }
            let imp = playerFactory(diff);
            imp.imp()
        }
    }
}

(formRetrieve = () => {
    const playerOneInput = document.querySelector('#playerOneInput').value;
    const playerTwoInput = document.querySelector('#playerTwoInput').value;

    modal.classList.add('invis');

    let obj = {
        playerOneInput,
        playerTwoInput
    }

    let sendNames = playerFactory(obj);
    sendNames.storeNames();
    

})

const playerFactory = (obj) => {

    const storeNames = () => {
        const sendNames = gameController(obj);
        sendNames.displayName();
    }
    
    function score () {
            //possible win combinations
            let pattern = [[1, 2, 3], [1, 5, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]];

            let match = [];
            let arr = [];

            //if x's turn (true)
            if(obj.toggle === true) {
                match = obj.playerOnePattern;
                para = obj.playerOnePattern
                arr = Array.from(String(obj.playerOnePattern), Number);
            }
            //if o's turn (false)
            else if (obj.toggle === false) {
                match = obj.playerTwoPattern;
                para = obj.playerTwoPattern;
                arr = Array.from(String(obj.playerTwoPattern), Number);
            }

            //loop interates over each pattern. Match will return array with same numbers as pattern if they match. If array has 3 numbers, send info of winner to game.
            for(i = 0; i<pattern.length; i++) {

                match = pattern[i].filter(function(item) {
                    let index = arr.indexOf(item);
                    let num = item === arr[index];
                    return num;
                });

                if(match.length === 3) {
                    let displayWin;
                    if(obj.toggle === true) {
                        
                    }
                    let display = gameController();
                }

            }
         
    }
    
    function easy () {
        //select random number from 0-8, round to nearest int
        if(obj.freeDivs === undefined) {
            return;
        }
        let freeDivs = obj.freeDivs;
        let index = Math.floor(Math.random() * freeDivs.length);
        let num = freeDivs[index];
        //send to gameController, then displayController as a selection for p2
        let easyNum = gameController(num);
        easyNum.sendNumToP2();
    }

    function med () {
        let num = Math.floor((Math.random() * 9) + 1);
    }
    
    function imp () {

    }

    return {
        storeNames,
        score,
        easy,
        med,
        imp
    }
}

const gameController = ((obj) => {

    let scoreDisplayToInfo = () => {

        let idRemover = playerFactory(obj);
        idRemover.score();

        if(compOption.classList.contains('active') && obj.toggle === true) {
                let diffi = playerFactory(obj);
                diffi.easy();
        }
    }

    let sendNumToP2 = () => {
        //add random num generated to player choice by triggering click event
        document.getElementById(`${obj}`).click();
    }

    const displayName = () => {
        const displayn = displayController(obj);
        displayn.displayName();
    }

    const displayWin = () => {
        const displayw = displayController();
        displayw.displayWinner();
    }

    return {
        displayName,
        displayWin,
        scoreDisplayToInfo,
        obj,
        sendNumToP2
    }
    

});

let displayController = (function(obj) {
    const winDisplay = document.querySelector('.win-display');
    const nameDisplay = document.querySelector('.display-name');
    const gameDiv = document.querySelectorAll('.gameDiv');

    gameDiv.forEach((div) => div.addEventListener('click', (e) => playerChoice(e, div)));

    let freeDivs = gameBoard.divArray; //available selection of divs
    let id;

    //bool: if false, select playerOne(); if true, select playerTwo()
    let toggle;

    //selected divs
    let playerOnePattern = []; 
    let playerTwoPattern = [];

    let playerChoice = (e, div) => {

    //get e.target.id, and remove from array to prevent div from further usage.
        id = parseInt(e.target.id);
        indexId = freeDivs.indexOf(id);

        let playerOne = () => {
        //If div has bot previously been clicked
            if(freeDivs.includes(id)) {
                //id of each div clicked is removed and placed into array. 
                playerOnePattern += freeDivs.splice(indexId, 1);
                
                //display x in div
                const p = document.createElement('p');
                playerOne = document.createTextNode('X');

                div.appendChild(p);
                p.appendChild(playerOne);

                //next selection will trigger playerTwoComp
                toggle = true;
            }
        }

        let playerTwoComp = () => {

            if(freeDivs.includes(id)) {

                playerTwoPattern += freeDivs.splice(indexId, 1);

                const p = document.createElement('p');
                playerTwo = document.createTextNode('O');

                div.appendChild(p);
                p.appendChild(playerTwo);

                toggle = false;
            }

        }
        //toggles playerOne and playerTwo 
        (function togglePlayers () {
            toggle ? playerTwoComp() : playerOne();
        })();
        
        let objControl = {
            playerOnePattern,
            playerTwoPattern,
            toggle,
            freeDivs
        }

        //send objControl to gameController, which sends to playerFactory.score
        let scoreDisplayControl = gameController(objControl); 
        scoreDisplayControl.scoreDisplayToInfo();

    }

    const displayName = () => {
        const playerOneName = obj.playerOneInput;
        const playerTwoName = obj.playerTwoInput;
        let namesDisplay; 

        const p = document.createElement('p');

        if(compOption.classList.contains('active')) {
            namesDisplay = document.createTextNode(`Hi, ${playerOneName}!`);
        }
        else {
            namesDisplay = document.createTextNode(`Hi, ${playerOneName} & ${playerTwoName}!`);
        }

        nameDisplay.appendChild(p);
        p.appendChild(namesDisplay);
    }

    const displayWinner = () => {
        let winner;
        
        if(toggle === true) {
            winner = obj.playerOneInput;
        }
        else if (toggle === false) {
            winner = obj.playerTwoInput;
        }

        const p = document.createElement('p');
        const winnerDisplay = document.createTextNode(`${winner} wins!`);

        winDisplay.appendChild(p);
        p.appendChild(winnerDisplay);
    }

    return {
        displayName,
        displayWinner
    }

});


const gameBoard = (() => {

    //create board matrix. Takes array property in array-like object, uses map() to replace all undefined with an index number, and raises that index by 1 until it reaches the stated length. 
    let divArray = Array.from({length: 9}, (undefined, index) => ++index);
    id = 0;

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