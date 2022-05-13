const submit = document.querySelector('.submit');
const modal = document.querySelector('.modal');
const compOption = document.querySelector('.compOption');
const gameLevels = document.querySelectorAll('.levels');
const gameboard = document.querySelector('.gameBoard');
const restart = document.querySelector('.restart');

let easy = document.querySelector('#easy');
let med = document.querySelector('#med');
let impossible = document.querySelector('#imp');


submit.addEventListener('click', () => formRetrieve());
compOption.addEventListener('click', () => toggleComp());
restart.addEventListener('click', () => gameController().sendRestart());

easy.addEventListener('click', (e) => difficulty(e));
med.addEventListener('click', (e) => difficulty(e));
impossible.addEventListener('click', (e) => difficulty(e));

let difficulty = (e) => {
        if(e.target.id === 'easy') {
            console.log('easy')
            // let easy = playerFactory();
            // easy.easy();
        }
        else if(e.target.id === 'med') {
            console.log('med')
            // let medium = playerFactory();
            // medium.med();
        }
        else if(e.target.id === 'imp') {
            console.log('imp');
            // let imp = playerFactory();
            // imp.imp()
        }
}

toggleComp = () => {
        compOption.classList.toggle('active');
}

(formRetrieve = () => {
    const playerOneInput = document.querySelector('#playerOneInput').value;
    let playerTwoInput = document.querySelector('#playerTwoInput').value;

    modal.classList.add('invis');

    if(compOption.classList.contains('active')) {
        playerTwoInput = 'Computer';
    }

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
                para = obj.playerOnePattern;
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
                    let display = gameController(obj);
                    display.displayWin();
                }

            }
         
    }
    
    function easy () {
        //select random number from 0-8, round to nearest int
        console.log(obj);
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
    
    function imp () {

        let freeDivs = obj.freeDivs;

        if(freeDivs === undefined) {
            return;
        }

        //miniMax will return bestNum. send to gameController, then displayController as a selection for p2
        function bestMove() {
            let bestScore = -Infinity;
            let bestMove;

            for(let i = 0; i<freeDivs.length; i++) {
                //iterate over available divs
                let score = minimax(freeDivs, 0, true);
                console.log(score);

                //choose div based on best score.
                if(score > bestScore) {
                    bestScore = score;
                    bestMove = freeDivs[i];
                }
            }

            let bestNum = gameController(bestMove);
            bestNum.sendNumToP2();
        }

        function  minimax(board, depth, maximizingPlayer) {
            // if depth = 0 or node is a terminal node then
            if(board == null) {
                console.log(bestScore);
            }
            if (maximizingPlayer) {
                let bestScore = -Infinity;
           
                for(let i = 0; i<board.length; i++) {
                    let score = minimax(board, depth+1, false)

                    bestScore = max(score, bestScore);
                }
                return bestScore;
            }
            else {
                let bestScore = Infinity;
                for(let i = 0; i<board.length; i++) {

                    let score = minimax(board, depth+1, true)

                    bestScore = min(score, bestScore);
                }
                return bestScore;
            }
            
        }

        return {
            bestMove
        }
  
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
                let diff = playerFactory(obj);
                diff.easy();
        }
    }

    let sendNumToP2 = () => {
        //add random num generated to player choice by triggering click event
        document.getElementById(`${obj}`).click();
    }

    const displayName = () => {
        const dispName = displayController(obj);
        dispName.displayName();
    }

    const displayWin = () => {
        const displaywinner = displayController(obj);
        displaywinner.displayWinner();
    }

    const sendRestart = () => {
        console.log("I work!");
        let reset = displayController();
        reset.restartProgram(); //Says restart() is not a function.
    }


    return {
        displayName,
        displayWin,
        scoreDisplayToInfo,
        obj,
        sendNumToP2,
        sendRestart,
    }


});

let displayController = ((obj) => {
    const winDisplay = document.querySelector('.win-display');
    const nameDisplay = document.querySelector('.display-name');
    const gameDiv = document.querySelectorAll('.gameDiv');

    let playerOneName = '';
    let playerTwoName = '';
    let freeDivs = [];
    let objControl = {};

    if(obj) {

        playerOneName = obj.playerOneInput;
        playerTwoName = obj.playerTwoInput;
    }        

    gameDiv.forEach((div) => div.addEventListener('click', (e) => playerChoice(e, div)));
        
    //available selection of divs
    freeDivs = gameBoard.divArray; 
    console.log(typeof gameBoard);
    let id;

    //bool: if false, select playerOne(); if true, select playerTwo()
    let toggle;

    //selected divs
    let playerOnePattern = []; 
    let playerTwoPattern = [];

    let playerChoice = (e, div) => {

    //get e.target.id, and remove from array to prevent div from further usage.
        if(freeDivs.includes(parseInt(e.target.id))) {;
            id = parseInt(e.target.id);
            indexId = freeDivs.indexOf(id);
        }    

        let dispPlayerOne = () => {
        //If div has bot previously been clicked
            if(freeDivs.includes(id)) {
                //id of each div clicked is removed and placed into array. 
                playerOnePattern += freeDivs.splice(indexId, 1);
                
                //display x in div
                const p = document.createElement('p');
                p.setAttribute('class', 'para');
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
                p.setAttribute('class', 'para');
                playerTwo = document.createTextNode('O');

                div.appendChild(p);
                p.appendChild(playerTwo);

                toggle = false;
            }

        }
        //toggles playerOne and playerTwo 
        (function togglePlayers () {
            toggle ? playerTwoComp() : dispPlayerOne();
        })();
        
        objControl = {
            playerOneName,
            playerTwoName,
            playerOnePattern,
            playerTwoPattern,
            toggle,
            freeDivs
        }

        // send objControl to gameController, which sends to playerFactory.score
        let scoreDisplayControl = gameController(objControl); 
        scoreDisplayControl.scoreDisplayToInfo();

    }

    const displayName = () => {
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

        if(obj.toggle === true) {
            winner = obj.playerOneName;
        }
        else if (obj.toggle === false) {
            winner = obj.playerTwoName;
        }

        const p = document.createElement('p');
        const winnerDisplay = document.createTextNode(`${winner} WINS!`);

        winDisplay.appendChild(p);
        p.appendChild(winnerDisplay);
    }

    const restartProgram = () => {

        gameDiv.forEach(div => {
            let element = document.getElementsByClassName("para");
            if(element.length > 0) {
                element[0].remove();
            }
        })

        freeDivs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        // let obj = playerChoice().objControl;

        obj.playerOneName = '';
        obj.playerTwoName = '';
        toggle = false;
        obj.playerOnePattern = [];
        obj.playerTwoPattern = [];

        objControl = obj;

        return freeDivs;
    }

    return {
        displayName,
        displayWinner,
        restartProgram,
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