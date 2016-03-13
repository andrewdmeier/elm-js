var Type = require('union-type');
var div = require('./html.js').div;
var button = require('./html.js').button;
var span = require('./html.js').span;

// Actions
var Action = Type({ Increment: [], Decrement: [] });

// Model
var init = function() {
    return 0;
};

// View
var view = function(dispatch, model) {
    return div({},
        [ button({ onClick: dispatch(Action.Increment()) }, [ '+' ]),
          span({}, [ model ]),
          button({ onClick: dispatch(Action.Decrement()) }, [ '-' ]),
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
