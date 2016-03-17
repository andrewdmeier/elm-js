var Type = require('union-type');
var h = require('virtual-dom/h');
var forward = require('lodash/flowRight');

var textarea = require('./textarea.js');
var undoable = require('./undoable.js');
var undoableTextarea = undoable(textarea);

// Actions
var Action = Type({ Textarea: [ undoableTextarea.Action ] });

// Model
var init = function() {
    return {
        textarea: undoableTextarea.init(),
    };
};

// View
var view = function(dispatch, model) {
    return h('div', {},
        [ undoableTextarea.view(forward(dispatch, Action.Textarea), model.textarea) ]
    );
};

// Update
var update = function(action, model) {
    return Action.case({
        Textarea: function(act) {
            return {
                textarea: undoableTextarea.update(act, model.textarea),
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
