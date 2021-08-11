console.log("loaded digit_extraction.js");


const i0 = BigInt(0);
const i1 = BigInt(1);
const i2 = BigInt(2);
const i4 = BigInt(4);
const i5 = BigInt(5);
const i6 = BigInt(6);
const i8 = BigInt(8);
const i16 = BigInt(16);
// return a^b % m
function powerMod(a = i0, b = i0, m = i0) {
    //return (a**b) % m;
    if (b === i0) {
        return i1;
    }
    a = a % m;
    if (a === i0) {
        return i0;
    }
    let res = i1;
    while (b > i0) {
        if (b % i2 === i1) {
            res = (res * a) % m;
        }
        b = b / i2;
        a = (a * a) % m;
    }
    return res;
}

// sumX : the fractional part of
//        16^n s_x = 16^n \sum_{k=0}^{\infty} \frac{1}{16^k (8k+x)}
// let b be the number of bits of n
// shift = eps + b
// result is represented as a fixed-point number.
// example: if shift is 2
// 			big.Int 12345 is equivalent to 123.45

function sumX(n = BigInt(0), x = BigInt(0), eps = 12) {
    const shift = BigInt(eps + n.toString(2).length);
    const modulo = i1 << shift;
    let k = i0;
    let numerator;
    let denominator;
    let numeratorInv;
    // finite sum
    let sum = i0;
    while (k <= n) {
        denominator = i8 * k + x; // 8k+x
        numerator = powerMod(i16, n-k, denominator); // 16^{n-k} % 8k+x
        numerator = numerator % denominator;
        numerator = numerator << shift
        numerator = numerator / denominator;
        sum = sum + numerator;
        sum = sum % modulo;
        k = k + i1;
    }
    // infinite sum
    while (true) {
        denominator = i8 * k + x; // 8k+x
        numeratorInv = i16 ** (k-n); // 16^{k-n}
        denominator = denominator * numeratorInv;
        if (denominator > modulo) {
            break;
        }
        numerator = modulo / denominator;
        numerator = numerator / denominator;
        sum = sum + numerator;
        k = k + i1;
    }
    return sum % modulo;
}

function PiBBP(n = BigInt(0), eps = 12) {
    const shift = BigInt(eps + n.toString(2).length);
    const modulo = i1 << shift;
    const sum1 = sumX(n, i1, eps);
    const sum4 = sumX(n, i4, eps);
    const sum5 = sumX(n, i5, eps);
    const sum6 = sumX(n, i6, eps);
    const frac = (i8*modulo + i4 * sum1 - i2 * sum4 - sum5 - sum6) % modulo;
    return Number((i16 * frac) >> shift);
}

export {PiBBP};