var bitInterpreter = require('./bitInterpreter.js');
var counter = require('./counter.js');
var counterPair = require('./counterPair.js');
var listOf = require('./listOf.js');
var start = require('./startApp.js').start;
var textarea = require('./textarea.js');
var undoable = require('./undoable.js');

start(undoable(bitInterpreter));
