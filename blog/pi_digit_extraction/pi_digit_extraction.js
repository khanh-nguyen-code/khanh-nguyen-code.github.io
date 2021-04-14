import {PiBBP} from "./digit_extraction.js";
import {hex2dec} from "./hex2dec.js";

console.log("loaded pi_digit_extraction.js");

const hex2char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];


let n = BigInt(0);

let hex_list = [];

const CRUNCHING = 0;
const CONVERTING = 1;
const PAUSED = 2;

let state = PAUSED;

function pause() {
    let button = document.getElementById("pause");
    if (button.value === "start" || button.value === "continue") {
        state = CRUNCHING;
        button.value = "pause"
        draw();
        return;
    }
    if (button.value === "pause") {
        state = PAUSED;
        button.value = "continue"
        return;
    }
}

document.querySelector("#pause").addEventListener("click", pause);

function draw() {
    if (state === PAUSED) {
        return;
    }
    if (state === CRUNCHING) {
        // CRUNCHING
        document.getElementById("status").textContent = `status: crunching ${n}-th hexadecimal digit of pi`
        const digit = PiBBP(n);
        hex_list.push(digit);
        state = CONVERTING;
        setTimeout(draw, 0);
    }
    if (state === CONVERTING) {
        // CONVERTING
        document.getElementById("status").textContent = `status: ${n}-th hexadecimal digit of pi is ${hex2char[hex_list[hex_list.length-1]]}, converting into decimal`;
        let copied = [...hex_list];
        const dec_list = hex2dec(copied);
        document.getElementById("placeholder").textContent = "3." + dec_list.join("");
        state = CRUNCHING;
        n = n + BigInt(1);
        setTimeout(draw, 0);
    }
}


draw();
