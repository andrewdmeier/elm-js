var Type = require('union-type');
var h = require('virtual-dom/h');
var forwardTo = require('flyd-forwardto');
var compose = require('lodash/flow');
var _ = require('lodash');

var canvas = require('./canvas');
var textarea = require('./textarea.js');
var targetValue = require('./helpers.js').targetValue;

// Actions
var Action = Type({
    Textarea: [ textarea.Action ],
    Rows: [ String ],
    Cols: [ String ],
    Length: [ String ],
});

// Model
var init = function() {
    return {
        textarea: textarea.init(),
        grid: {
            length: 400,
            rows: 5,
            cols: 10,
        }
    };
};

var bits2Elements = function(bits, grid) {
    var PAD_CHARACTER = '_';
    var BACKGROUND_COLOR = '#CCCCCC';
    var ZERO_BIT_COLOR = '#000000';
    var ONE_BIT_COLOR = '#ffffff';
    var EMPTY_BIT_COLOR = '#ffdddd';

    var getFill = function(bit) {
        return bit === PAD_CHARACTER ?
            EMPTY_BIT_COLOR :
            (bit === '1' ? ONE_BIT_COLOR : ZERO_BIT_COLOR);
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
    })(grid.length, grid.rows, grid.cols);

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
    })(grid.length, grid.rows, grid.cols);

    var getCell = _.curry(function(length, row, col, fill, index) {
        var cellLength = Math.min(length / row, length / col);
        return {
            fill: fill,
            x: (index % col) * cellLength,
            y: (Math.floor(index / col)) * cellLength,
            width: cellLength,
            height: cellLength,
        };
    })(grid.length, grid.rows, grid.cols);

    return [ { x: 0, y: 0, width: grid.length, height: grid.length, fill: BACKGROUND_COLOR } ]
        .concat(
            _.chain(bits)
                // TODO combine replace and truncate for performance.
                .replace(/[^10]/g, '')
                .truncate({ length: grid.rows * grid.cols, omission: '' })
                .padEnd(grid.rows * grid.cols, PAD_CHARACTER)
                .map(function(bit, index) {
                    return _.flow(
                        getCell,
                        addCellMargin,
                        adjustCellDrawPosition
                    )(getFill(bit), index);
                })
                .value()
            );
};

// View
var view = function(actions$, model) {
    return h('div', {},
        [ textarea.view(forwardTo(actions$, Action.Textarea), model.textarea),
          canvas(
              { height: model.grid.length, width: model.grid.length },
              bits2Elements(model.textarea, model.grid)
          ),
          h('br', {}, []),
          h('input', {
              oninput: compose(targetValue, function(s) { actions$(Action.Rows(s))(); }),
              type: 'number',
              value: model.grid.rows
          }, []),
          h('input', {
              oninput: compose(targetValue, function(s) { actions$(Action.Cols(s))(); }),
              type: 'number',
              value: model.grid.cols
          }, []),
          h('input', {
              oninput: compose(targetValue, function(s) { actions$(Action.Length(s))(); }),
              type: 'number',
              value: model.grid.length
          }, []),
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
        Rows: function(rows) {
            return {
                textarea: model.textarea,
                grid: Object.assign({}, model.grid, { rows: parseInt(rows, 10) }),
            };
        },
        Cols: function(cols) {
            return {
                textarea: model.textarea,
                grid: Object.assign({}, model.grid, { cols: parseInt(cols, 10) }),
            };
        },
        Length: function(length) {
            return {
                textarea: model.textarea,
                grid: Object.assign({}, model.grid, { length: parseInt(length, 10) }),
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
