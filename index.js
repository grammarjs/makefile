
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
  .match(':statement*', passthrough);

/**
 * For simplifying.
 */

rule('statement')
  .match(':rule', passthrough)
  .match(':assignment', passthrough)
  .match(':comment', passthrough);

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
 * Inline rule.
 */

rule('rule.inline')
  .match('all:;echo $(foo)');

/**
 * Assignment.
 */

rule('assignment')
  .match(
    ':identifier', 
    ':ws', 
    ':assignment.operator',
    ':ws',
    ':expression',
    passthrough);

/**
 * Assignment operator.
 */

rule('assignment.operator')
  .match('=', value)
  .match('?=', value)
  .match(':=', value)
  .match('::=', value)
  .match('+=', value)
  .match('!=', value); // shell assignment operator

/**
 * Identifier.
 */

rule('identifier')
  .match(/[a-zA-Z0-9_]+/, value);

/**
 * Substitution.
 */

// $(objects:.o=.c)
// equals
// $(patsubst %.o,%.c,$(objects))


/**
 * Target.
 */

rule('target')
  .match(':function', passthrough)
  .match(':pattern', passthrough);

/**
 * Pattern.
 */

rule('pattern')
  .match(/[^$\ ]+/, value);

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
    ':function.name',
    ':arguments?',
    ':punctuation.bracket.end',
    passthrough);

/**
 * Function arguments.
 */

rule('arguments')
  .match(
    ':arguments.start',
    ':arguments.end*',
    passthrough);

/**
 * Start of arguments.
 */

rule('arguments.start')
  .match(':ws', ':expression+', passthrough);

/**
 * Rest of arguments.
 */

rule('arguments.end')
  .match(
    ':ws',
    ':punctuation.comma',
    ':ws',
    ':expression+');

/**
 * Expression for arguments/variables.
 */

rule('expression')
  .match(':function', passthrough)
  .match(':variable', passthrough)
  .match(':text', passthrough);

/**
 * Text.
 */

rule('text')
  .match(/[^$]+/, value);

/**
 * Function name.
 */

rule('function.name')
  .match(/[\w-_]+/, value);

/**
 * Directive.
 */

rule('directive')
  .match('vpath %   blish');

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
 * Open curly bracket.
 */

rule('punctuation.bracket.curly.begin')
  .match('{', value);

/**
 * Close curly bracket.
 */

rule('punctuation.bracket.curly.end')
  .match('}', value);

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
 * Equal.
 */

rule('punctuation.equal')
  .match('=', value);

/**
 * Comma.
 */

rule('punctuation.comma')
  .match(',', value);

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
keyword('ifeq');
keyword('endif');
keyword('include');

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