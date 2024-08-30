const gameboard = document.querySelector(".gameboard");
const cells = document.querySelectorAll('.XO');
const resbtn = document.querySelector(".button");
const gameinfo = document.getElementById("gameinfo")
const winning_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
let gameoption = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let play = false;
gamestart();
function gamestart() {
    cells.forEach(cell => cell.addEventListener("click", onceclicked));
    play = true;
    gameinfo.textContent = `${currentplayer}'s turn`;

}
function onceclicked() {
    const index = this.getAttribute("cellIndex");
    if (gameoption[index] != "" || !play) {
        return;
    }
    updatedcell(this, index);
    // playerchange();
    winner();
}
function winner() {
    let win = false;
    for (let i = 0; i < winning_condition.length; i++) {
        let cell_index = winning_condition[i];
        let box1 = gameoption[cell_index[0]];
        let box2 = gameoption[cell_index[1]];
        let box3 = gameoption[cell_index[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            win = true;
            break;
        }



    }
    if (win) {
        gameinfo.textContent = `${currentplayer} wins`;
        play = false;
    }
    else if (!gameoption.includes("")) {
        gameinfo.textContent = `Draw!`;
        play = false;
    }
    else{
        playerchange();
    }



}

function playerchange() {
    currentplayer = (currentplayer == "X") ? "O" : "X";
    gameinfo.textContent = `${currentplayer}'s turn`;
}

function updatedcell(cel, index) {
    gameoption[index] = currentplayer;
    cel.textContent = currentplayer;
}
function restart() {
    gameinfo.textContent = `${currentplayer}'s turn`;
    gameoption = ["", "", "", "", "", "", "", "", ""];
    currentplayer = "X";
    play = true;
    cells.forEach(cell => {
        cell.textContent = "";
    });
    gamestart();
}
resbtn.addEventListener("click", restart);