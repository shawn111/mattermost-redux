'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function config() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.CLIENT_CONFIG_RECEIVED:
            return Object.assign({}, state, action.data);
        case _action_types.GeneralTypes.CLIENT_CONFIG_RESET:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function appState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.RECEIVED_APP_STATE:
            return action.data;

        default:
            return state;
    }
}

function credentials() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.RECEIVED_APP_CREDENTIALS:
            return Object.assign({}, state, action.data);

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function dataRetentionPolicy() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.RECEIVED_DATA_RETENTION_POLICY:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function deviceToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.RECEIVED_APP_DEVICE_TOKEN:
            return action.data;
        default:
            return state;
    }
}

function license() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.CLIENT_LICENSE_RECEIVED:
            return Object.assign({}, state, action.data);
        case _action_types.GeneralTypes.CLIENT_LICENSE_RESET:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function timezones() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.SUPPORTED_TIMEZONES_RECEIVED:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];
        default:
            return state;
    }
}

function serverVersion() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.GeneralTypes.RECEIVED_SERVER_VERSION:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({
    appState: appState,
    credentials: credentials,
    config: config,
    dataRetentionPolicy: dataRetentionPolicy,
    deviceToken: deviceToken,
    license: license,
    serverVersion: serverVersion,
    timezones: timezones
});