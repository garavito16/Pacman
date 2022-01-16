var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,2,1,3,1,1,3,0,1,1,1,2,1,2],
    [2,1,2,2,1,0,2,1,1,0,3,1,0,1,2],
    [2,1,3,1,1,1,2,2,2,2,1,1,2,1,2],
    [2,0,2,1,1,1,2,1,1,0,1,1,2,3,2],
    [2,1,2,2,2,0,1,1,1,1,3,1,1,1,2],
    [2,1,1,0,2,1,3,2,1,2,1,0,1,1,2],
    [2,3,2,1,1,3,1,0,1,1,1,1,2,2,2],
    [2,0,2,1,1,0,1,2,0,2,1,0,3,1,2],
    [2,1,2,2,1,1,1,2,0,1,1,1,1,1,2],
    [2,1,2,2,1,1,1,2,3,1,1,1,2,1,2],
    [2,3,1,1,1,0,1,0,1,2,3,1,2,1,2],
    [2,1,3,2,1,1,3,1,1,2,1,1,1,1,2],
    [2,1,2,1,1,1,1,1,1,2,1,1,3,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var score = 0;
var pacman = {
    x:1,
    y:1
};
var pacman2 = {
    x:5,
    y:5
};
var fantasma = {
    x:Math.trunc(Math.random()*(14-7)+7),
    y:Math.trunc(Math.random()*(14-7)+7),
    movimiento : "",
    cantidad: 0
};

function displayWorld() {
    let output = "";
    for (let i = 0; i < world.length; i++) {
        output += "<div class='row'>";
        for (let j = 0; j < world[i].length; j++) {
            if(world[i][j] === 2) {
                output+="<div class='brick'></div>";
            } else if(world[i][j] === 1) {
                output+="<div class='coin'></div>";
            } else if(world[i][j] === 0) {
                output+="<div class='empty'></div>";
            }
            else if(world[i][j] === 3) {
                output+="<div class='cereza'></div>";
            }
        }
        output += "</div>"
    }
    document.getElementById('world').innerHTML = output;
}

function displayPacman() {
    document.getElementById("pacman").style.top = pacman.y*20+"px";
    document.getElementById("pacman").style.left = pacman.x*20+"px";
}

function displayPacman2() {
    document.getElementById("pacman2").style.top = pacman2.y*20+"px";
    document.getElementById("pacman2").style.left = pacman2.x*20+"px";
}

function displayFantasma() {
    document.getElementById("fantasma").style.top = fantasma.y*20+"px";
    document.getElementById("fantasma").style.left = fantasma.x*20+"px";
}

function displayScore() {
    document.getElementById("score").innerHTML = score;
}

function deathPacman() {
    if (pacman.x == fantasma.x && pacman.y == fantasma.y) {
        console.log("murio el sujeto");
    }
}

function moverFantasma() {
    let cambio = 0;
    if (world[fantasma.y][fantasma.x-1] != 2 && fantasma.movimiento === "left" && fantasma.cantidad <=4) {
        fantasma.x--;
        cambio++;
        fantasma.cantidad++;
    }
    else if (world[fantasma.y][fantasma.x+1] != 2 && fantasma.movimiento === "right" && fantasma.cantidad <=4) {
        fantasma.x++;
        cambio++;
        fantasma.cantidad++;
    }
    else if (world[fantasma.y-1][fantasma.x] != 2 && fantasma.movimiento === "top" && fantasma.cantidad <=4) {
        fantasma.y--;
        cambio++;
        fantasma.cantidad++;
    } 
    else if (world[fantasma.y+1][fantasma.x] != 2 && fantasma.movimiento === "bottom" && fantasma.cantidad <=4) {
        fantasma.y++;
        cambio++;
        fantasma.cantidad++;
    }

    if (cambio === 0) {
        let aux = [];
        let random = 0;
        if (world[fantasma.y][fantasma.x-1] != 2) aux.push("left");
        if (world[fantasma.y][fantasma.x+1] != 2) aux.push("right");
        if (world[fantasma.y-1][fantasma.x] != 2) aux.push("top");
        if (world[fantasma.y+1][fantasma.x] != 2) aux.push("bottom");
        random = Math.trunc(Math.random()*(aux.length));
        if (aux[random] === "left") fantasma.x--;
        else if (aux[random] === "right") fantasma.x++;
        else if (aux[random] === "top") fantasma.y--;
        else if (aux[random] === "bottom") fantasma.y++;
        fantasma.movimiento = aux[random];
        fantasma.cantidad=1;
    }    
    displayFantasma();
}

displayWorld();
displayPacman();
displayPacman2();
displayScore();
displayFantasma();
setInterval(moverFantasma,300);

document.onkeydown = function(e) {
    if(e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) {
        pacman.x --;
    } else if(e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) {
        pacman.x ++;
    } else if(e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) {
        pacman.y --;
    } else if(e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) {
        pacman.y ++;
    }

    if(e.keyCode === 37 && world[pacman2.y][pacman2.x-1] != 2) {
        pacman2.x --;
    } else if(e.keyCode === 39 && world[pacman2.y][pacman2.x+1] != 2) {
        pacman2.x ++;
    } else if(e.keyCode === 38 && world[pacman2.y-1][pacman2.x] != 2) {
        pacman2.y --;
    } else if(e.keyCode === 40 && world[pacman2.y+1][pacman2.x] != 2) {
        pacman2.y ++;
    }

    if (world[pacman.y][pacman.x] === 1 || world[pacman.y][pacman.x] === 3 
        || world[pacman2.y][pacman2.x] === 1 || world[pacman2.y][pacman2.x] === 3)
    {
        if (world[pacman.y][pacman.x] === 1) score+=10;
        else if (world[pacman.y][pacman.x] === 3) score+=50;

        if (world[pacman2.y][pacman2.x] === 1 && pacman2.y != pacman.y && pacman2.x != pacman.x) score+=10;
        else if (world[pacman2.y][pacman2.x] === 3 && pacman2.y != pacman.y && pacman2.x != pacman.x) score+=50;

        world[pacman.y][pacman.x] = 0;
        world[pacman2.y][pacman2.x] = 0;
        displayWorld();
        displayScore();
    }

    displayPacman();
    displayPacman2();
    deathPacman();
}