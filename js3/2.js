// Write a function that takes in an array, and returns the most common number. Hint: Use an object!

const solution = (arr, idx = 0, obj = {}, most = arr[idx]) => {
    if (idx === arr.length) return most;
    obj[arr[idx]] = (obj[arr[idx]] || 0) + 1;
    if (obj[arr[idx]] > obj[most]) most = arr[idx];
    return solution(arr, idx + 1, obj, most);
};