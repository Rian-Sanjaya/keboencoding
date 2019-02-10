// Takes in the first node of a linked list, return if the linked-list loops into itself.

const solution = (node) => {
    if (!node) return false;
    if (node.wasHere) return true;
    node.wasHere = true;
    return solution(node.next);
};