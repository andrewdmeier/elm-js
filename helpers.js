var flyd = require('flyd');

module.exports = {
    targetValue: function(ev) {
        return ev.target.value;
    },
    oneOff: function(s) {
        return flyd.scan(function(prev, next) {
            return {
                curr: prev.next,
                next: next,
            };
        }, { curr: s(), next: s() }, s)
        .map(function (currNext) { return currNext.curr });
    }
};
