var _ = require('lodash');

var createAction = function(type, data) {
    return {
        type: type,
        data: data,
    };
};

var forward = _.flowRight;

module.exports = {
    createAction: createAction,
    forward: forward,
};
