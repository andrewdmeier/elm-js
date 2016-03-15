var Type = require('union-type');

var h = require('virtual-dom/h');

var forward = require('lodash/flowRight');

module.exports = function(component) {
    // Actions
    var Action = Type({
        Undo: [],
        Redo: [],
        Edit: [ component.Action ],
    });

    // Model
    var init = function() {
        return {
            index: 0,
            history: [ component.init() ],
        };
    };

    // View
    var view = function(dispatch, model) {
        return h('div', {},
                [ h('div', {},
                    [ component.view(forward(dispatch, Action.Edit), model.history[model.index]),
                      h('button', { onclick: dispatch(Action.Undo()) }, [ 'Undo' ]),
                      h('button', { onclick: dispatch(Action.Redo()) }, [ 'Redo' ])
                    ]
                   )
                ]
            );
    };

    // Update
    var update = function(action, model) {
        return Action.case({
            Undo: function() {
                return {
                    history: model.history,
                    index: model.index !== 0 ?
                        model.index - 1 :
                        model.index,
                };
            },
            Redo: function() {
                return {
                    history: model.history,
                    index: model.index !== model.history.length - 1 ?
                        model.index + 1 :
                        model.index,
                };
            },
            Edit: function(act) {
                var newHistory = model.history
                    .slice(0, model.index + 1)
                    .concat(component.update(act, model.history[model.index]));
                return {
                    index: newHistory.length - 1,
                    history: newHistory,
                };
            },
            _: function() { return model; },
        }, action);
    };

    return {
        init: init.bind(null, component),
        view: view,
        update: update,
        Action: Action,
    };
};
