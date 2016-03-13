var Type = require('union-type');
var h = require('virtual-dom/h');

// Actions
var Action = Type({ Increment: [], Decrement: [] });

// Model
var init = function() {
    return 0;
};

// View
var view = function(dispatch, model) {
    return h('div', {},
        [ h('button', { onclick: dispatch(Action.Increment()) }, [ '+' ]),
          h('span', {}, [ model ]),
          h('button', { onclick: dispatch(Action.Decrement()) }, [ '-' ]),
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
