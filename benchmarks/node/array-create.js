import { Suite } from 'benchmark';
import assert from 'assert';

export default {
  options: {
    arraySize: 100
  },
  assertReturnValue: fn => {
    const opts = { arraySize: 5 };
    const arr = fn(opts);
    assert.equal(arr.constructor, [].constructor)
    assert.equal(arr.length, opts.arraySize);
    let i = 0;
    arr.forEach(() => i++);
    assert.equal(i, opts.arraySize);
  },
  tests: [{
    label: 'Array.apply .map undefined',
    fn: opts => Array.apply(null, Array(opts.arraySize)).map(() => {})
  }, {
    label: 'Array.apply .map index',
    fn: opts => Array.apply(null, Array(opts.arraySize)).map((x, i) => i )
  }, {
    label: 'Array.from Array',
    fn: opts => Array.from(Array(opts.arraySize))
  }, {
    label: 'Array.from String.repeat',
    fn: opts => Array.from('x'.repeat(opts.arraySize))
  }, {
    label: 'For loop Array.push',
    fn: opts => {
      const arr = [];
      for (let i = 0; i < opts.arraySize; i++) {
        arr.push(null);
      }
      return arr;
    }
  }, {
    label: 'For loop array[i] =',
    fn: opts => {
      const arr = [];
      for (let i = 0; i < opts.arraySize; i++) {
        arr[i] = null;
      }
      return arr;
    }
  }]
};