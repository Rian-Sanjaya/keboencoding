// Write a function that takes in 2 numbers (a, b) and a function. 
// It should execute the function after a milliseconds, and then execute the function again after b milliseconds. 
//You are not allowed to use this: setTimeout(c, a + b);

// using setTimeout
// const solution = (num1, num2, func) => {
//     setTimeout(() => {
//         func();
//         setTimeout(func, num2);
//     }, num1);
// };

// function delay(ms) {
//     ms += Date.now();
//     while (Date.now() < ms) {}
// }

// function dl(ms) {
//     start = Date.now();
//     while ( !(Date.now() - start === ms) ) {}
//     console.log(`Udah ${ms/1000} detik.`)
// }

// using recursive (but still wrong)
const solution = (num1, num2, func, flag = true) => {
    if (num1 <= 0 && num2 <= 0) return;

    if (flag) {
        flag = false;
        num1 += Date.now();
    }

    if (num1 > 0 && Date.now() >= num1) {
        console.log('aaa');
        func();
        num1 = 0;
        flag = true;

    } 

    if (num1 === 0) {
        if (flag) {
            flag = false;
            num2 += Date.now();
        }

        if (Date.now() >= num2) {
            func();
            num2 = 0;
        } 
    }

    return solution(num1, num2, func, flag);
};