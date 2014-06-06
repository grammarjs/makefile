
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var Token = require('languagejs-token');
var grammar = new Grammar('makefile');
var rule = grammar.expression; // grammar.rule;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Makefile.
 */

rule('makefile')
  // .match(
  //   ':assignment*', 
  //   passthrough)
  .match(
    ':rule*', 
    value);

/**
 * Rule.
 */

rule('rule')
  .match(
    ':target', 
    ':ws', 
    ':punctuation.colon', 
    ':ws', 
    ':prerequisite*', 
    ':ws',
    ':recipe',
    passthrough)
  // .match(
  //   ':target', 
  //   ':ws', 
  //   ':punctuation.colon', 
  //   ':ws', 
  //   ':prerequisite*', 
  //   ':ws', 
  //   ':punctuation.semicolon', 
  //   ':recipe');

/**
 * Assignment.
 */

rule('assignment')
  .match(
    ':target', 
    ':ws', 
    ':punctuation.equals')

/**
 * Target.
 */

rule('target')
  .match(/\w+/, value);

/**
 * Prerequisite.
 */

rule('prerequisite')
  .match(
    ':ws', 
    ':target', 
    passthrough);

/**
 * Variable.
 */

rule('variable')
  .match(
    ':variable.automatic', 
    passthrough);

/**
 * Automatic variable.
 */

rule('variable.automatic')
  .match(
    ':punctuation.dollar', 
    ':variable.automatic.identifier',
    passthrough);

rule('variable.automatic.identifier')
  .match('@', value)
  .match('%', value)
  .match('<', value)
  .match('?', value)
  .match('^', value)
  .match('+', value)
  .match('*', value);

rule('variable.automatic.special.identifier')
  .match('(@D)', value)
  .match('(@D)', value)
  .match('(@D)', value)
  .match('(@D)', value)
  .match('(@D)', value)
  .match('(@D)', value)
  .match('(@D)', value);

/**
 * Function.
 */

rule('function')
  .match(
    ':punctuation.dollar', 
    ':punctuation.bracket.begin', 
    ':name',
    ':arguments?',
    ':punctuation.bracket.end',
    passthrough);

/**
 * Function arguments.
 */

rule('arguments')
  .match(
    ':ws', 
    ':expression', 
    passthrough);

/**
 * Conditional.
 */

rule('conditional')

/**
 * For loop.
 * 
 * for i in $(LIST); do \
 *   echo $$i; \
 * done
 */

rule('loop')
  .match(
    ':loop.begin', 
    ':recipe', 
    ':loop.end', 
    passthrough);

/**
 * Loop begin.
 */

rule('loop.begin')
  .match(
    ':keyword.for', 
    ':ws', 
    'i', 
    ':ws', 
    ':keyword.in', 
    ':expression', 
    ':punctuation.semicolon', 
    ':ws', 
    'keyword.do', 
    ':ws', 
    ':punctuation.backslash',
    ':ws',
    passthrough);

/**
 * Loop end.
 */

rule('loop.end')
  .match(
    ':keyword.done', 
    passthrough);

/**
 * Recipe.
 */

rule('recipe')
  .match(
    ':punctuation.at', 
    ':command', 
    passthrough)
  .match(
    ':punctuation.dash', 
    ':command', 
    passthrough)
  .match(':command', passthrough);

/**
 * Command.
 */

rule('command')
  .match(/.+/, value);

/**
 * Stem.
 */

rule('stem')
  .match(
    ':punctuation.percent',
    ':characters', 
    passthrough);

/**
 * Comment.
 */

rule('comment')
  .match(
    ':punctuation.pound', 
    ':comment.body',
    passthrough);

/**
 * Comment body.
 */

rule('comment.body')
  .match(/[^\r|\n]+/, value);

/**
 * The `%` symbol for stemming.
 */

rule('punctuation.percent')
  .match('%', value);

/**
 * The `$` symbol for variables/functions.
 */

rule('punctuation.dollar')
  .match('$', value);

/**
 * The `@` symbol, for echoing output.
 */

rule('punctuation.at')
  .match('@', value);

/**
 * The `-` symbol, for suppressing error messages.
 */

rule('punctuation.dash')
  .match('-', value);

/**
 * Backslash.
 */

rule('punctuation.backslash')
  .match('\\', value);

/**
 * The `#` symbol for comments.
 */

rule('punctuation.pound')
  .match('#', value);

/**
 * Open parenthesis.
 */

rule('punctuation.bracket.begin')
  .match('(', value);

/**
 * Close parenthesis.
 */

rule('punctuation.bracket.end')
  .match(')', value);

/**
 * Period.
 */

rule('punctuation.period')
  .match('.', value);

/**
 * Colon.
 */

rule('punctuation.colon')
  .match(':', value);

/**
 * New line + tab.
 */

rule('punctuation.newline.tab')
  .match(/\n/, /\t/, value);

/**
 * Whitespace.
 */

rule('ws')
  .match(/[\s\n]*/, value);

/**
 * Keywords.
 */

keyword('done');
keyword('for');
keyword('in');
keyword('do');

/**
 * Special targets.
 */

rule('target.special')
  .match(
    ':punctuation.period', 
    ':target.special.name', 
    passthrough);

/**
 * Special target name.
 */

rule('target.special.name')
  .match('PHONY', value);

/**
 * Define keyword rule.
 *
 * @param {String} name
 * @api private
 */

function keyword(name) {
  return rule('keyword.' + name).match(name, value);
}

function log() {
  console.log(arguments);
}