#!/usr/bin/env babel-node

import program from 'commander';
import { Suite } from 'benchmark';

import benchmarks from './benchmarks';


program
  .version('0.0.1')
  .parse(process.argv);


const [testToRun] = program.args;

if (testToRun in benchmarks.node) {
  const benchmark = benchmarks.node[testToRun];
  const suite = new Suite();

  suite
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    });


  for (let test of benchmark.tests) {
    try {
      benchmark.assertReturnValue(test.fn);  
    } catch(e) {
      console.error(`Error asserting test return value for test "${test.label}"`, e);
      process.exit(1);
    }
    
    suite.add(test.label, () => test.fn(benchmark.options));
  }

  suite.run({ 'async': true });
}