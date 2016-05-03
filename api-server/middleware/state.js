/* eslint-env node */

var uuid = require('node-uuid');

var state = {
    ntag: undefined
};

module.exports = {
    bumpNtag: bumpNtag,
    getCurrentNtag: getCurrentNtag
};


function bumpNtag() {
    state.ntag = uuid.v4();
    return state.ntag;
}

function getCurrentNtag() {
    return state.ntag;
}
