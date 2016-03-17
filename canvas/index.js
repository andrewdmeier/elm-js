var h = require('virtual-dom/h');

var DrawHook = require('./DrawHook');

// View
var canvas = function(length, elements) {
    return h('canvas',
        { height: length,
          width: length,
          'draw-hook': DrawHook(elements),
        }, []
    );
};

module.exports = canvas;
