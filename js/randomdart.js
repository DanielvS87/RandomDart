

function createPizza(CompleteHeight, degAngle, singleBottomHeight, doubleHeight, singleUpperHeight, tripleHeight, numberHeight, classNameOne, classNameTwo, rotation, number){
    
    // value of the x and y coordinates at centre ( if circle is used )
    const height = CompleteHeight/2;
    
    // working from center outwards constants for every elements top point in svg y coordinates
    const lowerSTop = height - singleBottomHeight; 
    const doubleTop = lowerSTop - doubleHeight; 
    const upperSTop = doubleTop - singleUpperHeight; 
    const tripleTop = upperSTop - tripleHeight;  
    const numberH = tripleTop - numberHeight 
    
    // distance from center
    const singleBottomTopDist = singleBottomHeight;
    const doubleTopDist = singleBottomTopDist + doubleHeight;
    const singleUpperTopDist = doubleTopDist + singleUpperHeight;
    const tripleTopDist = singleUpperTopDist + tripleHeight;
    const numberTopDist = tripleTopDist + numberHeight; 
    
    // ponts for entire pizza slice
    let array = [];
    array.push( [ height , height ] ); // center point
    array.push( [ height , lowerSTop ] );  // above center point & triple left bottom
    let dis = displacement( singleBottomTopDist , degAngle ); 
    array.push( [ height + dis[0] , lowerSTop + dis[1] ] ); // point right // triple right bottom
    array.push( [ height, doubleTop ] ) // triple left top
    let dis2 = displacement( doubleTopDist , degAngle); 
    array.push( [ height + dis2[0] , doubleTop + dis2[1] ] ); //triple right top
    array.push( [ height, upperSTop ] ); // double left bottom
    let dis3 = displacement(singleUpperTopDist, degAngle);
    array.push( [ height + dis3[0] , upperSTop + dis3[1] ] ); // double right bottom
    array.push( [ height , tripleTop ] );   // double left top
    let dis4 = displacement( tripleTopDist , degAngle); 
    array.push( [ height + dis4[0] , tripleTop + dis4[1] ] ); // double right top
    array.push( [ height , numberH ] );
    let dis5 = displacement( numberTopDist , degAngle);
    array.push( [ height + dis5[0] , numberH + dis5[1] ] ); 

    const g = document.createElementNS("http://www.w3.org/2000/svg", 'g');

    // create single area ( 2 pieces )
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let d = `M${array[0][0]} ${array[0][1]}L ${array[1][0]} ${array[1][1]} A ${singleBottomTopDist} ${singleBottomTopDist} 0 0 1 ${array[2][0]},${array[2][1]}L${array[0][0]} ${array[0][1]} M ${array[3][0]} ${array[3][1]} A ${doubleTopDist} ${doubleTopDist} 0 0 1 ${array[4][0]} ${array[4][1]} L ${array[6][0]} ${array[6][1]} A ${singleUpperTopDist} ${singleUpperTopDist} 0 0 0 ${array[5][0]} ${array[5][1]} L ${array[3][0]} ${array[3][1]} `;
    path.setAttribute("d", d);
    path.setAttribute("class", classNameOne);
    path.classList.add("single");
    path.classList.add("area");
    g.appendChild(path);

    // create double area
    let tpath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let td = `M ${array[1][0]} ${array[1][1]} A ${singleBottomTopDist} ${singleBottomTopDist} 0 0 1 ${array[2][0]} ${array[2][1]} L ${array[4][0]} ${array[4][1]} A ${doubleTopDist} ${doubleTopDist} 0 0 0 ${array[3][0]} ${array[3][1]} L ${array[1][0]} ${array[1][1]}`;
    tpath.setAttribute("d", td);
    tpath.setAttribute("class", classNameTwo);
    tpath.classList.add("triple");
    tpath.classList.add("area");
    g.appendChild(tpath);

    //create triple area
    let dpath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let dd = `M ${array[5][0]} ${array[5][1]} A ${singleUpperTopDist} ${singleUpperTopDist} 0 0 1 ${array[6][0]} ${array[6][1]} L ${array[8][0]} ${array[8][1]} A ${tripleTopDist} ${tripleTopDist} 0 0 0 ${array[7][0]} ${array[7][1]} L ${array[5][0]} ${array[5][1]}`;
    dpath.setAttribute("d", dd);
    dpath.setAttribute("class", classNameTwo);
    dpath.classList.add("double");
    dpath.classList.add("area");
    g.appendChild(dpath);

    // create number line
    let npath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let nd = `M${array[9][0]} ${array[9][1]} A ${numberTopDist} ${numberTopDist}  0 0 1 ${array[10][0]} ${array[10][1]}`;
    npath.setAttribute("d", nd);
    npath.setAttribute("fill", "transparent");
    npath.setAttribute("id", "textA");

    const textP = document.createElementNS("http://www.w3.org/2000/svg", 'textPath')
    textP.setAttribute("href", "#textA");
    textP.setAttribute("startOffset", "50%");
    textP.setAttribute("text-anchor", "middle");
    textP.setAttribute("class", "scores");
    textP.innerHTML = number;
    const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    text.appendChild(textP);
    g.appendChild(text);
    g.appendChild(npath);

    // rotate around center of svg 
    g.setAttribute("transform", `rotate(${rotation} 500 500)`);
    return g;
}

// calculates the x an y displacement for a point off center
function displacement(height, degAngle){
    // divide by 2, need half the angle
    let angle = convertToRad(degAngle)/2;
    let line = height*Math.sin(angle)*2;
    let xDis = Math.cos(angle)*line;
    let yDis = Math.sin(angle)*line;
    return [xDis, yDis];  
}

function createCircle(radius, color){
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", 500);
    circle.setAttribute("cy", 500);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    circle.classList.add("area");
    return circle
}
  
function convertToRad(num) {
   return Math.PI * num / 180;
}

function createTotalBoard(){
    const numbers = [20,5,12,9,14,11,8,16,7,19,3,17,2,15,10,6,13,4,18,1]
    const colorOne = ["black", "beige"];
    const colorTwo = ["red", "green"];
    let rotation = -9;
    const svg = document.getElementById("board");

    // first add outer ring
    svg.appendChild(createCircle(500, colorOne[0]));

    // abve outer ring place all the pizza slices
    for(var i = 0; i<20; i++){
        let g; 
        g = (i%2===0) ? createPizza(1000, 18, 150, 50, 150, 50, 20, colorOne[0], colorTwo[0], rotation, numbers[i]) :
        createPizza(1000, 18, 150, 50, 150, 50, 20, colorOne[1], colorTwo[1], rotation, numbers[i]);
        rotation -= 18;
        svg.appendChild(g);
    }

    // above the slices add the single bull circle
    svg.appendChild(createCircle(50, colorTwo[1]));
    // above the single bull the bullseye
    svg.appendChild(createCircle(25, colorTwo[0]));

    getRandomAreas();
}

createTotalBoard();


function getRandomAreas(){
    const array = Array.from(document.getElementsByClassName("area"));
    let randomAreas = [];
    for( var i = 0; i<3 ;i++){
        randomAreas.push(array.splice(Math.floor(Math.random()*array.length) , 1));
    }
    randomAreas.map(it=>it[0].classList.add("selected"));
}

