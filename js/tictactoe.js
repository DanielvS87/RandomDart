assembleSVG();

resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetGame)
turn = document.getElementById("turn");
squareArray = Array.from(document.querySelectorAll(".square"));
circleArray = Array.from(document.querySelectorAll(".circle"));
crossArray = Array.from(document.querySelectorAll(".cross"));
squareArray.map((it)=>it.addEventListener("click", placeChoice));
winningConditions = [["11","12","13"],["12","22","32"],["13","23","33"],["11","21","31"],["21","22","23"],["31","32","33"],["11","22","33"],["13","22","31"]];
let isWinner = false;
let isCrossTurn = true;
let turns = 0; 

function createGrid(completeWidth){
    const width = completeWidth/3;
    let d = '';
    for(var i = 1;i<5;i++){
        d += (i<3) ? `M${width*i} ${0}L ${width*(i)} ${completeWidth}` : `M${0} ${width*(i-2)} L ${completeWidth} ${width*(i-2)}`; 
    }
    let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d", d);
    path.setAttribute("stroke", "#111");
    path.setAttribute("stroke-width", 2.5);
    path.setAttribute("stroke-linecap", "round");

    return path;
}

function createSquares(completeWidth){
    const width = completeWidth/3;
    let g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    for(var i = 0 ; i<3 ; i++){
        for(var j = 0 ; j<3 ; j++){
            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
            let d = `M ${width*i+2} ${width*j+2} L ${width*(i+1)-2} ${width*j+2} L ${width*(i+1)-2} ${width*(j+1)-2} L ${width*(i)+2} ${width*(j+1)-2}`;
            path.setAttribute("d", d);
            path.setAttribute("fill", "transparent");
            path.setAttribute("class", "square");
            path.classList.add(`${i+1}${j+1}`);
            g.appendChild(path);
        }
    }
    return g;
}

function addCrosses(completeWidth){
    const width = completeWidth/3;
    let g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    for(var i = 0 ; i<3 ; i++){
        for(var j = 0 ; j<3 ; j++){
            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            let d = `M${5+i*30} ${5+j*30} L ${25+i*30} ${25+j*30} M${5+i*30} ${25+j*30} L ${25+i*30} ${5+j*30}`;
            path.setAttribute("d", d);
            path.setAttribute("fill", "transparent");
            path.setAttribute("stroke", "blue");
            path.setAttribute("class", "cross");
            path.classList.add(`${i+1}${j+1}`);
            g.appendChild(path);
        }
    }
    return g;
}

function addCircles(completeWidth){
    const width = completeWidth/3;
    let g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    for(var i = 1 ; i<4 ; i++){
        for(var j = 1 ; j<4 ; j++){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            circle.setAttribute("cx", width*i-15);
            circle.setAttribute("cy", width*j-15);
            circle.setAttribute("r", 10);
            circle.setAttribute("stroke", "red");
            circle.setAttribute("fill", "transparent");
            circle.setAttribute("class", "circle");
            circle.classList.add(`${i}${j}`);
            g.appendChild(circle);
        }
    }
    return g;
}

function assembleSVG(){
    const svg = document.getElementById("ttt");
    svg.appendChild(createGrid(90));
    svg.appendChild(createSquares(90));
    svg.appendChild(addCrosses(90));
    svg.appendChild(addCircles(90));

}

function placeChoice(e){
    let currentElem = e.target
    let index = squareArray.indexOf(currentElem);
    (isCrossTurn) ? crossArray[index].classList.add("show") : circleArray[index].classList.add("show");
    currentElem.classList.add("used");
    currentElem.removeEventListener("click", placeChoice);
    (isCrossTurn) ? winnerCheck("cross") : winnerCheck("circle");
    isCrossTurn = !isCrossTurn;
    (!isCrossTurn) ? turn.innerHTML = "circle <br> it is your turn" : turn.innerHTML = "cross <br> it is your turn";
    turns++;
    (isWinner) && squareArray.map(it=>it.removeEventListener("click", placeChoice));
    (isWinner) && squareArray.map(it=>it.classList.add("used"));
    (turns===9 && !isWinner) && alert("draw");
    (isWinner) && (turn.innerHTML = "Please reset the game");
}


// winnerCheck Needs Further testing;

function winnerCheck(name){
    let a = Array.from(document.querySelectorAll("."+name));
    a = a.filter((it)=>it.classList.contains("show"));
    if(a.length>2){
        a = a.map(it=>it.classList[1]);
        winningConditions.map((it)=>{
            (a.includes(it[0])&&a.includes(it[1])&&a.includes(it[2])) && (isWinner = true);
        });
        (isWinner) && alert(name + " won");
    }
}

function resetGame(){
    squareArray.map(it=>it.classList.remove("used"));
    squareArray.map(it=>it.addEventListener("click", placeChoice));
    circleArray.map(it=>it.classList.remove("show"));
    crossArray.map(it=>it.classList.remove("show"));
    isCrossTurn = true;
    isWinner = false;
    turns = 0;
    turn.innerHTML = "cross <br> it is your turn"
}