// Takes in the first node of a linked list, return the greatest number.

const solution = (node, max = node.v) => {
    if ( !node ) return max;
    if (node.v > max) max = node.v;
    return solution(node.next, max);
};