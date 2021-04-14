const numPoints = 300;
const Point = class {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static Distance(p1 = new Point(), p2 = new Point()) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    static NewRandom() {
        return new Point(
            Math.random(),
            Math.random(),
        );
    }
};

let vertex = [];
for (let i = 0; i < numPoints; i++) {
    vertex.push(Point.NewRandom());
}

let edge = [];
for (let i1 = 0; i1 < vertex.length; i1++) {
    let dist = [];
    for (let i2 = 0; i2 < vertex.length; i2++) {
        dist.push(+Infinity);
    }
    edge.push(dist);
}
for (let i1 = 0; i1 < vertex.length; i1++) {
    for (let i2 = i1; i2 < vertex.length; i2++) {
        const dist = Point.Distance(vertex[i1], vertex[i2]);
        edge[i1][i2] = dist;
        edge[i2][i1] = dist;
    }
}
console.log("Graph generated");
