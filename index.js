var $ = require('jquery');

var counter = require('./counter.js');
// var counterPair = require('./counter-pair.js');
var listOf = require('./list-of.js');
var start = require('./start-app.js').start;

$(document).ready(function() {
    start(listOf(counter), $('#app'));
});
