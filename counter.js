'use strict';

var createAction = require('./actions.js').createAction;
var div = require('./html.js').div;
var button = require('./html.js').button;
var span = require('./html.js').span;

// Actions
var INCREMENT = 'inc';
var Increment = createAction(INCREMENT);
var DECREMENT = 'dec';
var Decrement = createAction(DECREMENT);

// Model
var init = function() {
    return 0;
};

// View
var view = function(dispatch, model) {
    return div({},
        [ button({ onClick: dispatch(Increment) }, ['+'])
        , span({}, [model])
        , button({ onClick: dispatch(Decrement) }, ['-'])
        ]
    );
};

// Update
var update = function(action, model) {
    switch (action.type) {
        case INCREMENT: return model + 1;
        case DECREMENT: return model - 1;
        default: return model;
    }
};

module.exports = {
    init: init,
    view: view,
    update: update,
};
