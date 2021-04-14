import {Ball} from "./ball.js";

let ball = null;

const instance = new p5(function (instance) {
    instance.setup = function () {
        let canvas = instance.createCanvas(400, 400);
        canvas.parent("p5canvas");
        ball = new Ball(instance.width / 2, instance.height / 2, 20);
    }

    instance.draw = function () {
        instance.background(55);
        ball.show(instance);
        ball.move(instance);
    }
});

console.log("bouncing ball");

export {instance};