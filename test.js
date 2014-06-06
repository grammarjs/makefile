
var assert = require('assert');
var grammar = require('./');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);
var fs = require('fs');

describe('makefile', function(){
  describe('comment', function(){
    test('# comment');
  });

  describe('assignment', function(){
    test('BINS= node_modules/.bin');
    test('BINS = node_modules/.bin');
    test('BINS = ./bin node_modules/.bin');
    test('BINS = $(NODE_MODULES)');
    test('BINS = $(NODE_MODULES)/.bin');
    test('BINS = $(NODE_MODULES) $(COMPONENTS)');
    test('SRC= $(wildcard index.js lib/*.js)');
    test('tests ?= *');
    test('TEST= http://localhost:4202');
    test('PHANTOM= $(BINS)/mocha-phantomjs \\'
      + '  --setting local-to-remote-url-access=true \\'
      + '  --setting web-security=false');
  });

  describe('rule', function(){
    test('clean:\n  rm -rf tmp');
    test('clean:\n  @rm -rf tmp');
    test('clean:\n  -rm -rf tmp');
    test('build: clean\n  -rm -rf tmp');
    test('build: clean install\n  -rm -rf tmp');
    test('build: clean install $(SRC)\n  @rm -rf tmp');
    test('build:\n  @rm -rf tmp\n  @component install');
    test('test: build server test-node\n  @$(PHANTOM) $(TEST)');
    test('test-browser: test');
    test('.PHONY: clean build test');
    test('$(TEST): build\n  cd test && make $@');
  });

  describe('real world', function(){
    test(fs.readFileSync('Makefile', 'utf-8'));
  });
});

/**
 * Test helper.
 *
 * @api private
 */

function test(str, log) {
  return it(str, function(){
    assert.equal(str, compile(str, log));
  });
}

/**
 * Parse `str` to ast, then stringify back.
 *
 * @param {String} str
 * @return {String}
 */

function compile(str, log) {
  var ast = parser.parse(str);
  if (log) console.log(JSON.stringify(ast, null, 2));
  return stringify(ast);
}

/**
 * For testing, it should generate the original string.
 *
 * @param {Token} token
 * @api public
 */

function stringify(token) {
  if (!token) return '';
  var html = [];
  if (Array.isArray(token.content)) {
    token.content.forEach(function(child){
      html.push(stringify(child));
    });
  } else if (null != token.content) {
    html.push(stringify(token.content));
  } else {
    html.push(token);
  }

  return html.join('');
}