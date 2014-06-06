
var assert = require('assert');
var grammar = require('./');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('makefile', function(){
  it('target', function(){
    var str = [
      'clean:',
      '  rm -r tmp'
    ].join('\n');
    var val = parser.parse(str);
    console.log(val);
  });
});