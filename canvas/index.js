var h = require('virtual-dom/h');

var DrawHook = require('./DrawHook');

// View
var canvas = function(attributes, elements) {
    return h('canvas',
        Object.assign({}, attributes, { 'draw-hook': DrawHook(elements) }),
        []
    );
};

module.exports = canvas;
