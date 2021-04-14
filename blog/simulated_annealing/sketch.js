// innerHeight of the canvas
const Width = 600;
const Height = 600;


const edgeDraw = function (tourEdge = [0, 0]) {
    const p0 = vertex[tourEdge[0]];
    const p1 = vertex[tourEdge[1]];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(Width * p0.x, Height * p0.y, Width * p1.x, Height * p1.y);
};

const pointDraw = function (p = new Point()) {
    fill(color(255, 255, 255));
    stroke(255, 0, 0);
    strokeWeight(1);
    //noStroke();
    circle(Width * p.x, Height * p.y, 5);
};

const tourDraw = function () {
    tourEdge(tour).map(edgeDraw);
    vertex.map(pointDraw);
};

let iter = 0;
const step = 1000;
let running = false;

function setup() {
    let canvas = createCanvas(Width, Height);
    canvas.parent("p5canvas");

    //frameRate(10);
    drawIter();
    drawPage();
}

function debuggingPause() {
    let pause = document.getElementById("debuggingPause");
    let reset = document.getElementById("debuggingReset");
    if (pause.value === "Pause") {
        running = false;
        pause.value = "Continue";
        reset.style.display = "block";
    } else {
        temperatureDecay = parseFloat(document.getElementById("temperatureDecay").value);
        running = true;
        pause.value = "Pause";
        reset.style.display = "none";
    }
}

function debuggingReset() {
    tour = [];
    for (let i = 0; i < vertex.length; i++) {
        tour.push(i);
    }

    cost = tourCost(tour);

    bestTour = tour;
    bestCost = tourCost(bestTour);

    temperature = 1;

    iter = 0;
    running = false;
    drawIter();
    drawPage();
    document.getElementById("debuggingPause").value = "Start";
}


function drawIter() {
    document.getElementById('debuggingIter').innerHTML = "";
    document.getElementById('debuggingIter').innerHTML += "Iter: " + iter + "</br>";
    document.getElementById('debuggingIter').innerHTML += "Temperature: " + temperature.toExponential() + "</br>";
}

function drawPage() {
    const cost = tourCost(tour);
    if (cost < bestCost) {
        bestCost = cost;
        bestTour = tour;
    }
    document.getElementById('debuggingText').innerHTML = "";
    document.getElementById('debuggingText').innerHTML += "Tour cost: " + tourCost(tour).toFixed(4) + "</br>";
    document.getElementById('debuggingText').innerHTML += "Best cost: " + bestCost.toFixed(4) + "</br>";
    background(200, 200, 200);
    tourDraw();
}

function draw() {
    if (running) {
        drawIter();
        let twoOptBool = false;
        for (let i = 0; i < step; i++) {
            iter++;
            if (twoOpt()) {
                twoOptBool = true;
            }
        }
        if (twoOptBool) {
            drawPage();
        }
    }
}
