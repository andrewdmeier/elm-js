// Reference:
// https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f#.k3oqwurq4
// https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.ywybwoyne
// https://medium.com/@chetcorcos/elmish-functional-programming-in-javascript-50995f1d4b9e#.dfw4k28ob
// https://github.com/evancz/elm-architecture-tutorial
// https://github.com/paldepind/functional-frontend-architecture

var start = function(mvu, $root) {
    var model = mvu.init();
    var dispatch = function dispatch(action) {
        // NOTE: wrapped fn will eventually be called by event handlers.
        return function() {
            model = mvu.update(action, model);
            $root.html(mvu.view(dispatch, model));
        };
    };
    $root.html(mvu.view(dispatch, model));
};

module.exports = {
    start: start,
};
