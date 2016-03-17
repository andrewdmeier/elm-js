var Type = require('union-type');
var h = require('virtual-dom/h');
var forward = require('lodash/flowRight');
var _ = require('lodash');

var canvas = require('./canvas');
var textarea = require('./textarea.js');

// Actions
var Action = Type({ Textarea: [ textarea.Action ] });

// Model
var init = function() {
    return {
        textarea: textarea.init(),
        grid: {
            length: 400,
            rows: 10,
            cols: 10,
        }
    };
};

var adjustCellDrawPosition = _.curry(function(length, row, col, cell) {
    var cellLength = Math.min(length / row, length / col);
    var adjustLength = Math.abs(row - col);
    return {
        fill: cell.fill,
        x: cell.x + (row > col ? adjustLength * cellLength / 2 : 0),
        y: cell.y + (row < col ? adjustLength * cellLength / 2 : 0),
        width: cell.width,
        height: cell.width,
    };
});

var addCellMargin = _.curry(function(length, row, col, cell) {
    var cellLength = Math.min(length / row, length / col);
    var margin = cellLength / 50;
    return {
        fill: cell.fill,
        x: cell.x + margin,
        y: cell.y + margin,
        width: cell.width - margin * 2,
        height: cell.width - margin * 2,
    };
});

var getCell = _.curry(function(length, row, col, fill, index) {
    var cellLength = Math.min(length / row, length / col);
    return {
        fill: fill,
        x: (index % col) * cellLength,
        y: (Math.floor(index / col)) * cellLength,
        width: cellLength,
        height: cellLength,
    };
});

var bits2Elements = function(bits, grid) {
    return [ { x: 0, y: 0, width: grid.length, height: grid.length, fill: '#CCCCCC' } ]
        .concat(
            bits
                .replace(/[^10]/g, '')
                .split('')
                // TODO: use filteredMap instead of replace for performance
                // filterMap : (a -> Maybe b) -> List a -> List b
                // filterMap f xs =
                //   foldr (maybeCons f) [] xs
                .map(function(bit, index) {
                    return _.flow(
                        getCell(grid.length, grid.rows, grid.cols),
                        addCellMargin(grid.length, grid.rows, grid.cols),
                        adjustCellDrawPosition(grid.length, grid.rows, grid.cols)
                    )((bit === '0' ? '#000000' : '#FFFFFF'), index);
                })
        );
};

// View
var view = function(dispatch, model) {
    return h('div', {},
        [ textarea.view(forward(dispatch, Action.Textarea), model.textarea),
          canvas.view({
              height: model.grid.length,
              width: model.grid.length,
              elements: bits2Elements(model.textarea, model.grid),
          }),
        ]
    );
};

// Update
var update = function(action, model) {
    return Action.case({
        Textarea: function(act) {
            return {
                textarea: textarea.update(act, model.textarea),
                grid: model.grid,
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
