// Reference:
// https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f#.k3oqwurq4
// https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.ywybwoyne
// https://medium.com/@chetcorcos/elmish-functional-programming-in-javascript-50995f1d4b9e#.dfw4k28ob
// https://github.com/evancz/elm-architecture-tutorial
// https://github.com/paldepind/functional-frontend-architecture

var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

var start = function(mvu) {
    var rootNode;
    var tree;

    var model = mvu.init();
    var dispatch = function dispatch(action) {
        return function() {
            var newTree;
            var patches;

            model = mvu.update(action, model);
            newTree = mvu.view(dispatch, model);
            patches = diff(tree, newTree);
            rootNode = patch(rootNode, patches);
            tree = newTree;
        };
    };
    tree = mvu.view(dispatch, model); // We need an initial tree
    rootNode = createElement(tree); // Create an initial root DOM node ...
    document.body.appendChild(rootNode); // ... and it should be in the document
};

module.exports = {
    start: start,
};
