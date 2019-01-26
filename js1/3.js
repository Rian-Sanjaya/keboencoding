// Write a function that takes in a number x, and returns a string with "hello" repeated x number of times.
// use recursive for loop instead of while loop

const solution = (x, i = 0, str = '') => {
    if (i === x) return str;
    return solution(x, i + 1, str + 'hello');
  };