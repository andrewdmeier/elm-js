var Type = require('union-type');

var forward = require('lodash/flowRight');

var div = require('./html.js').div;
var button = require('./html.js').button;

module.exports = function(component) {
    // Actions
    var Action = Type({
        Add: [],
        Edit: [ Number, component.Action ],
    });

    // Model
    var init = function() {
        return {
            list: [],
            nextId: 0,
        };
    };

    // View
    var view = function(dispatch, model) {
        return div({},
                model.list.map(function(item, index) {
                    return div({},
                        [ component.view(
                            forward(dispatch, Action.Edit(model.list[index].id)),
                            model.list[index].model)
                        ]
                    );
                }).concat([
                    button({ onClick: dispatch(Action.Add()) }, [ '+' ])
                ])
            );
    };

    // Update
    var update = function(action, model) {
        return Action.case({
            Add: function() {
                return {
                    list: model.list.concat({ id: model.nextId, model: component.init() }),
                    nextId: model.nextId + 1,
                };
            },
            Edit: function(id, act) {
                return {
                    list: model.list.map(function(item) {
                        return item.id === id ?
                            { id: item.id, model: component.update(act, item.model) } :
                            item;
                    }),
                    nextId: model.nextId,
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
