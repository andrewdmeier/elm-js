var counter = require('./counter.js');
var counterPair = require('./counter-pair.js');
var listOf = require('./list-of.js');
var textarea = require('./textarea.js');
var start = require('./start-app.js').start;

start(listOf(textarea));
