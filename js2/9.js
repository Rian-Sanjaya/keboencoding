// Replicate Array.prototype.reduce and call it gsReduce

Array.prototype.gsReduce = function (func, acc, idx = 0) {
    if (idx === this.length) return acc;
    if (typeof acc === 'undefined') {
      acc = this[idx];
      idx += 1;
    }
    return this.gsReduce(func, func(acc, this[idx], idx, this ), idx + 1);
};