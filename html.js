var $ = require('jquery');

var createElement = function(tag, attrs, children) {
    var $elem = $('<' + tag + '>');

    Object.keys(attrs).forEach(function(key) {
        var event;
        var val = attrs[key];
        if (key.indexOf('on') === 0) {
            event = key.substr(2).toLowerCase();
            $elem.on(event, val);
        } else {
            $elem.attr(key, val);
        }
    });

    children.forEach(function(child) {
        $elem.append(child);
    });

    return $elem;
};

var div = createElement.bind(null, 'div');
var button = createElement.bind(null, 'button');
var span = createElement.bind(null, 'span');

module.exports = {
    div: div,
    button: button,
    span: span,
};
