// Write a function that takes in an array of numbers, and returns a new array of all duplicate numbers.

const solution = (arr, idx = 0, obj = {}, result = []) => {
    if (idx === arr.length) return result;
    obj[arr[idx]] = (obj[arr[idx]] || 0) + 1;
    if (obj[arr[idx]] === 2) result.push(arr[idx]);
    return solution(arr, idx + 1, obj, result);
}