console.log("loaded hex2dec.js");

const i10 = BigInt(10);

const hex2char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

function hex2dec(hex_list = []) {
    let dec_list = [];

    if (hex_list.length === 0) {
        return [];
    }

    let h = BigInt("0x" + hex_list.map(function (num) {
        return hex2char[num];
    }).join(""));
    const l = BigInt(4 * hex_list.length);
    for (let i=0; i<hex_list.length; i++) {
        const digit = (h * i10) >> l;
        dec_list.push(Number(digit));
        h = (h * i10) - (digit << l);
    }
    return dec_list;
}



console.log(hex2dec("243f6a8885a308d313198a2".split("")));

export {hex2dec};