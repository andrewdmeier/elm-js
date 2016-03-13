var Type = require('union-type');

var forward = require('lodash/flowRight');

var div = require('./html.js').div;
var counter = require('./counter.js');

// Actions
var Action = Type({
    Top: [ counter.Action ],
    Bottom: [ counter.Action ],
});

// Model
var init = function() {
    return {
        top: counter.init(),
        bottom: counter.init(),
    };
};

// View
var view = function(dispatch, model) {
    return div({},
      [ counter.view(forward(dispatch, Action.Top), model.top),
        counter.view(forward(dispatch, Action.Bottom), model.bottom),
      ]
    );
};

// Update
var update = function(action, model) {
    return Action.case({
        Top: function(act) {
            return {
                top: counter.update(act, model.top),
                bottom: model.bottom,
            };
        },
        Bottom: function(act) {
            return {
                top: model.top,
                bottom: counter.update(act, model.bottom),
            };
        },
        _: function() { return model; },
    }, action);
};

module.exports = {
    init: init,
    view: view,
    update: update,
    Action: Action,
};
