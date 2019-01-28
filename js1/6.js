// Write a function that takes in a number and returns the sum of all it's divisors (except 1 or itself).

const solution = (num, iteration = 2, sum = 0) => {
    if (iteration >= num) return sum;
    if ( !(num % iteration) ) sum += iteration;
    return solution( num, iteration + 1, sum );
};