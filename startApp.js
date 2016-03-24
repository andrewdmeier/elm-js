// Reference:
// https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f#.k3oqwurq4
// https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.ywybwoyne
// https://medium.com/@chetcorcos/elmish-functional-programming-in-javascript-50995f1d4b9e#.dfw4k28ob
// https://github.com/evancz/elm-architecture-tutorial
// https://github.com/paldepind/functional-frontend-architecture
// https://medium.com/@yelouafi/react-less-virtual-dom-with-snabbdom-functions-everywhere-53b672cb2fe3#.cnc1ktfqs

var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var flyd = require('flyd');
var lift = require('flyd-lift');
var patch = require('virtual-dom/patch');
var rearg = require('lodash/rearg');

var oneOff = require('./helpers.js').oneOff;

var start = function(mvu) {
    var actions$ = flyd.stream();

    var state$ = flyd.scan(rearg(mvu.update, 1, 0), mvu.init(), actions$);

    var vDom$ = flyd.map(mvu.view.bind(null, actions$), state$);

    var patches$ = lift(diff, oneOff(vDom$), vDom$);

    var dom$ = flyd.scan(patch, createElement(vDom$()), patches$);

    document.body.appendChild(dom$());
};

module.exports = {
    start: start,
};
