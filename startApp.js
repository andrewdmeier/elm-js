// Reference:
// https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f#.k3oqwurq4
// https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.ywybwoyne
// https://medium.com/@chetcorcos/elmish-functional-programming-in-javascript-50995f1d4b9e#.dfw4k28ob
// https://github.com/evancz/elm-architecture-tutorial
// https://github.com/paldepind/functional-frontend-architecture
// https://medium.com/@yelouafi/react-less-virtual-dom-with-snabbdom-functions-everywhere-53b672cb2fe3#.cnc1ktfqs

var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var flyd = require('flyd');
var rearg = require('lodash/rearg');

var start = function(mvu) {
    var actions$ = flyd.stream();
    var state$ = flyd.scan(rearg(mvu.update, 1, 0), mvu.init(), actions$);
    var vnode$ = flyd.map(mvu.view.bind(null, actions$), state$);
    flyd.scan(
        function(prev, curr) { return patch(prev, diff(prev, curr)); },
        document.getElementById('app'),
        vnode$
    );
};

module.exports = {
    start: start,
};
