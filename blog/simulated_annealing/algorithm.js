const tourEdge = function (tour = []) {
    let tourEdge = [];
    for (let i = 0; i < tour.length - 1; i++) {
        tourEdge.push([tour[i], tour[i + 1]]);
    }
    tourEdge.push([tour[tour.length - 1], tour[0]]);
    return tourEdge;
};
const edgeCost = function (tourEdge = [0, 0]) {
    return edge[tourEdge[0]][tourEdge[1]];
};
const tourCost = function (tour = []) {
    return (tourEdge(tour).map(edgeCost)).reduce((a, b) => a + b)
};

// random tour
let tour = [];
for (let i = 0; i < vertex.length; i++) {
    tour.push(i);
}

let cost = tourCost(tour);

let bestTour = tour;
let bestCost = tourCost(bestTour);

let temperature = 1;
let temperatureDecay = 1 / 100000;

const twoOpt = function () {
    // choose 2 random edges
    let i11 = -1;
    let i12 = -1;
    let i21 = -1;
    let i22 = -1;
    while (true) {
        i11 = Math.floor(Math.random() * tour.length);
        i21 = Math.floor(Math.random() * tour.length);
        i12 = (i11 + 1) % tour.length;
        i22 = (i21 + 1) % tour.length;
        if (i11 !== i21 && i12 !== i21 && i11 !== i22 && i12 !== i22) {
            break;
        }
    }
    // calculate cost of the new tour
    let newTour = [];
    for (let i = i12; i !== i21; i = (i + 1) % tour.length) {
        newTour.push(tour[i]);
    }
    newTour.push(tour[i21]);
    for (let i = i11; i !== i22; i = (i + tour.length - 1) % tour.length) {
        newTour.push(tour[i]);
    }
    newTour.push(tour[i22]);

    const newCost = tourCost(newTour);
    // decision
    let newTourAccept = false;
    const exploreCost = (newCost - cost) / cost;
    if (exploreCost < 0) {
        newTourAccept = true;
        tour = newTour;
        cost = newCost;
    } else {
        const exploreProb = Math.exp(-exploreCost / temperature);
        if (exploreProb > Math.random()) {
            console.log("Iter:", iter, " Explore a tour with prob:", exploreProb);
            newTourAccept = true;
            tour = newTour;
            cost = newCost;
        }
    }
    // decay temperature
    temperature = temperature * (1 - temperatureDecay);
    return newTourAccept;
};
