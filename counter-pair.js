var createAction = require('./actions.js').createAction;
var forward = require('./actions.js').forward;
var div = require('./html.js').div;
var counter = require('./counter.js');

// Actions
var TOP = 'top';
var Top = createAction.bind(null, TOP);
var BOTTOM = 'bottom';
var Bottom = createAction.bind(null, BOTTOM);

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
      [ counter.view(forward(dispatch, Top), model.top)
      , counter.view(forward(dispatch, Bottom), model.bottom)
      ]
    );
};

// Update
var update = function(action, model) {
    switch (action.type) {

        // NOTE: may want to use a way w/o assignment.
        case TOP:
            model.top = counter.update(action.data, model.top);
            return model;
        case BOTTOM:
            model.bottom = counter.update(action.data, model.bottom);
            return model;
        default: return model;
    }
};

module.exports = {
    init: init,
    view: view,
    update: update,
};
