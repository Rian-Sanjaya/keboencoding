// Takes in the root node of a tree and a number, return a node with the same value.

// Hint: BFS or DFS from the teaching doc
const solution = (n, num, c = []) => {
    if (!n) return;
    if (n.v === num) return n;
    c = c.concat(n.children || []);
    return solution(c.shift(), num, c);
};