//Given a tree, print out an array, each element is an array of nodes at that level. Each node has a property v, and children which is an array.

const bft = (cur=[], next=[], result=[]) => {
    if (!cur.length && !next.length) return result;
    if (!cur.length) {
      result.push([]);
      console.log('cur: ', cur);
      console.log('next ', next);
      console.log('result ', result);
      return bft(next, [], result);
    }
    const n = cur.shift();
    const solution = (n)=>{
        return bft([], [n]);
    };
};