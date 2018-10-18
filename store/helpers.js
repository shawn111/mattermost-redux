'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.offlineConfig = undefined;
exports.createReducer = createReducer;

var _redux = require('redux');

var _reduxBatchedActions = require('redux-batched-actions');

var _constants = require('../constants');

var _reducer_registry = require('./reducer_registry');

var _reducer_registry2 = _interopRequireDefault(_reducer_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var offlineConfig = {
    effect: function effect(_effect, action) {
        if (typeof _effect !== 'function') {
            throw new Error('Offline Action: effect must be a function.');
        } else if (!action.meta.offline.commit) {
            throw new Error('Offline Action: commit action must be present.');
        }

        return _effect();
    },
    discard: function discard(error, action, retries) {
        if (action.meta && action.meta.offline.hasOwnProperty('maxRetry')) {
            return retries >= action.meta.offline.maxRetry;
        }

        return retries > 10;
    }
};

exports.offlineConfig = offlineConfig;
function createReducer(baseState) {
    for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        reducers[_key - 1] = arguments[_key];
    }

    _reducer_registry2.default.setReducers(Object.assign.apply(Object, [{}].concat(reducers)));
    var baseReducer = (0, _redux.combineReducers)(_reducer_registry2.default.getReducers());

    // Root reducer wrapper that listens for reset events.
    // Returns whatever is passed for the data property
    // as the new state.
    function offlineReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        if (action.type === _constants.General.OFFLINE_STORE_RESET) {
            return baseReducer(baseState, action);
        }

        return baseReducer(state, action);
    }

    return (0, _reduxBatchedActions.enableBatching)(offlineReducer);
}