var h = require('virtual-dom/h');
var Type = require('union-type');

// Actions
var Action = Type({ Increment: [], Decrement: [] });

// Model
var init = function() {
    return 0;
};

// View
var view = function(actions$, model) {
    return h('div', {},
        [ h('button', { onclick: function() { actions$(Action.Increment()) } }, [ '+' ]),
          h('span', {}, [ model ]),
          h('button', { onclick: function() { actions$(Action.Decrement()) } }, [ '-' ]),
        ]
    );
};

// Update
var update = function(action, model) {
    return Action.case({
        Increment: function() { return model + 1; },
        Decrement: function() { return model - 1; },
        _: function() { return model; },
    }, action);
};

module.exports = {
    init: init,
    view: view,
    update: update,
    Action: Action,
};
