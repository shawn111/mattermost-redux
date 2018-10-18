'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function getMyPreferences() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PreferenceTypes.MY_PREFERENCES_REQUEST, _action_types.PreferenceTypes.MY_PREFERENCES_SUCCESS, _action_types.PreferenceTypes.MY_PREFERENCES_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function savePreferences() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PreferenceTypes.SAVE_PREFERENCES_REQUEST, _action_types.PreferenceTypes.SAVE_PREFERENCES_SUCCESS, _action_types.PreferenceTypes.SAVE_PREFERENCES_FAILURE, state, action);
}

function deletePreferences() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PreferenceTypes.DELETE_PREFERENCES_REQUEST, _action_types.PreferenceTypes.DELETE_PREFERENCES_SUCCESS, _action_types.PreferenceTypes.DELETE_PREFERENCES_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    getMyPreferences: getMyPreferences,
    savePreferences: savePreferences,
    deletePreferences: deletePreferences
});