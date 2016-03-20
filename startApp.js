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
var patch = require('virtual-dom/patch');
var rearg = require('lodash/rearg');

var start = function(mvu) {
    var actions$ = flyd.stream();

    // needed to rearg b/c `update` is of the form:
    // action -> state -> state
    // but scan takes an accumulator function of the form:
    // state -> action -> state
    var state$ = flyd.scan(rearg(mvu.update, 1, 0), mvu.init(), actions$);

    var vnode$ = flyd.map(mvu.view.bind(null, actions$), state$);

    // diff saves the prevTree as `.a`
    var patches$ = flyd.scan(
        function(patches, currentTree) { return diff(patches.a, currentTree) },
        diff(vnode$(), vnode$()),
        vnode$
    );

    // patch mutates the dom -- this scan has side effects.
    var dom$ = flyd.scan(patch, createElement(vnode$()), patches$);

    // append the initial dom$
    document.body.appendChild(dom$());

};

module.exports = {
    start: start,
};
