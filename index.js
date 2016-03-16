var counter = require('./counter.js');
var counterPair = require('./counterPair.js');
var listOf = require('./listOf.js');
var textarea = require('./textarea.js');
var undoable = require('./undoable.js');
var start = require('./startApp.js').start;

start(listOf(undoable(textarea)));
