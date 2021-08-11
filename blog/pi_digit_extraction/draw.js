import {PiBBP} from "./digit_extraction.js";
import {hex2dec} from "./hex2dec.js";

console.log("loaded draw.js");

const hex2char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// n - number hexadecimal digits
let n = BigInt(0);
// hex_list - list of hexadecimal digits
let hex_list = [];

// list of states
const INIT = 0;
const CRUNCHING = 1;
const CONVERTING = 2;
const PAUSED = 3;

// initial state
let state = INIT;

// draw
function draw() {
    if (state === PAUSED || state === INIT) {
        return;
    }
    if (state === CRUNCHING) {
        // CRUNCHING
        n = n + BigInt(1);
        document.getElementById("status").textContent = `status: crunching ${n}-th hexadecimal digit of pi`
        const digit = PiBBP(n);
        hex_list.push(digit);
        state = CONVERTING;
    }
    if (state === CONVERTING) {
        // CONVERTING
        document.getElementById("status").textContent = `status: ${n}-th hexadecimal digit of pi is ${hex2char[hex_list[hex_list.length-1]]}, converting into decimal`;
        let copied = [...hex_list];
        const dec_list = hex2dec(copied);
        document.getElementById("placeholder").textContent = "3." + dec_list.join("");
        state = CRUNCHING;
    }
    setTimeout(draw, 0);
}

function toggle() {
    let button = document.getElementById("pause");
    if (state === INIT) {
        n = BigInt(0);
        hex_list = [];
        state = CONVERTING;
        button.value = "pause"
        setTimeout(draw, 0);
        return;
    }
    if (state === PAUSED) {
        state = CONVERTING;
        button.value = "pause"
        setTimeout(draw, 0);
        return;
    }
    if (state === CRUNCHING || state == CONVERTING) {
        state = PAUSED;
        button.value = "continue"
        return;
    }
}


export {toggle};