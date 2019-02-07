// Write a function that takes in an array and a number, and returns true if any pairs add up to the number.

const solution = (arr, num, idx = 0, obj = {}) => {
    if (idx === arr.length) return false;
    if (obj[arr[idx]]) return true;
    obj[num - arr[idx]] = true;
    return solution(arr, num, idx + 1, obj);
};