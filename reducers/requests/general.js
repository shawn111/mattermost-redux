'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function server() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.GeneralTypes.PING_RESET) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.PING_REQUEST, _action_types.GeneralTypes.PING_SUCCESS, _action_types.GeneralTypes.PING_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function config() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.CLIENT_CONFIG_REQUEST, _action_types.GeneralTypes.CLIENT_CONFIG_SUCCESS, _action_types.GeneralTypes.CLIENT_CONFIG_FAILURE, state, action);
}

function dataRetentionPolicy() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.DATA_RETENTION_POLICY_REQUEST, _action_types.GeneralTypes.DATA_RETENTION_POLICY_SUCCESS, _action_types.GeneralTypes.DATA_RETENTION_POLICY_FAILURE, state, action);
}

function license() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.CLIENT_LICENSE_REQUEST, _action_types.GeneralTypes.CLIENT_LICENSE_SUCCESS, _action_types.GeneralTypes.CLIENT_LICENSE_FAILURE, state, action);
}

function websocket() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.GeneralTypes.WEBSOCKET_CLOSED) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.WEBSOCKET_REQUEST, _action_types.GeneralTypes.WEBSOCKET_SUCCESS, _action_types.GeneralTypes.WEBSOCKET_FAILURE, state, action);
}

function redirectLocation() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.GeneralTypes.REDIRECT_LOCATION_REQUEST, _action_types.GeneralTypes.REDIRECT_LOCATION_SUCCESS, _action_types.GeneralTypes.REDIRECT_LOCATION_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    server: server,
    config: config,
    dataRetentionPolicy: dataRetentionPolicy,
    license: license,
    websocket: websocket,
    redirectLocation: redirectLocation
});