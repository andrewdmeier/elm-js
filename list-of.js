var createAction = require('./actions.js').createAction;
var forward = require('./actions.js').forward;
var div = require('./html.js').div;
var button = require('./html.js').button;

// Actions
var ADD = 'add';
var Add = createAction(ADD);

var REMOVE = 'remove';
var Remove = createAction.bind(null, REMOVE);

var EDIT = 'edit';
var edit = function(index) {
    return function(data) {
        return {
            type: 'edit',
            data: data,
            index: index,
        };
    };
};

// Model
var init = function(component) {
    return {
        list: [],
        component: component,
    };
};

// View
var view = function(dispatch, model) {
    return div({},
            model.list.map(function(item, index) {
                return div({},
                    [ model.component
                        .view(forward(dispatch, edit(index)), model.list[index])
                    ]
                );
            }).concat([
                button({ onClick: dispatch(Add) }, ['+'])
            ])
        );
};

// Update
var update = function(action, model) {
    // TODO: refactor w/o assignment
    switch (action.type) {
        case ADD:
            model.list.push(model.component.init());
            return model;
        case EDIT:
            model.list = model.list.map(
                function(item, index) {
                    return index === action.index ?
                        model.component.update(action.data, item) :
                        item;
                });
            return model;
        default: return model;
    }
};

module.exports = function(component) {
    return {
        init: init.bind(null, component),
        view: view,
        update: update,
    };
};
