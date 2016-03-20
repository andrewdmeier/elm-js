var Type = require('union-type');
var compose = require('lodash/flow');

var h = require('virtual-dom/h');

var targetValue = require('./helpers.js').targetValue;


// Actions
var Action = Type({ Input: [ String ] });

// Model
var init = function() {
    return '';
};

// View
var view = function(actions$, model) {
    return h('div', {},
        [ h('textarea',
            { oninput: compose(targetValue, function(s) { actions$(Action.Input(s))(); }),
              value: model
            },
            [ ]
           ),
        ]
    );
};

// Update
var update = function(action, model) {
    return Action.case({
        Input: function(input) { return input; },
        _: function() { return model; },
    }, action);
};

module.exports = {
    init: init,
    view: view,
    update: update,
    Action: Action,
};
