var h = require('virtual-dom/h');

var DrawHook = require('./DrawHook');

// View
var view = function(model) {
    return h('canvas',
        { height: model.height,
          width: model.width,
          'draw-hook': DrawHook(model.elements),
        }, []
    );
};

module.exports = {
    view: view,
};
