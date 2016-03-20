var forwardTo = require('flyd-forwardto');
var h = require('virtual-dom/h');
var Type = require('union-type');

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
    var view = function(actions$, model) {
        return h('div', {},
                model.list.map(function(item, index) {
                    return h('div', {},
                        [ component.view(
                            forwardTo(actions$, Action.Edit(model.list[index].id)),
                            model.list[index].model)
                        ]
                    );
                }).concat([
                    h('button', { onclick: function() { actions$(Action.Add()) } }, [ '+' ])
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
