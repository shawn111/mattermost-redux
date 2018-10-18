'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function getSchemes() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.GET_SCHEMES_REQUEST, _action_types.SchemeTypes.GET_SCHEMES_SUCCESS, _action_types.SchemeTypes.GET_SCHEMES_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.GET_SCHEME_REQUEST, _action_types.SchemeTypes.GET_SCHEME_SUCCESS, _action_types.SchemeTypes.GET_SCHEME_FAILURE, state, action);
}

function createScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.CREATE_SCHEME_REQUEST, _action_types.SchemeTypes.CREATE_SCHEME_SUCCESS, _action_types.SchemeTypes.CREATE_SCHEME_FAILURE, state, action);
}

function deleteScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.DELETE_SCHEME_REQUEST, _action_types.SchemeTypes.DELETE_SCHEME_SUCCESS, _action_types.SchemeTypes.DELETE_SCHEME_FAILURE, state, action);
}

function patchScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.PATCH_SCHEME_REQUEST, _action_types.SchemeTypes.PATCH_SCHEME_SUCCESS, _action_types.SchemeTypes.PATCH_SCHEME_FAILURE, state, action);
}

function getSchemeTeams() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.GET_SCHEME_TEAMS_REQUEST, _action_types.SchemeTypes.GET_SCHEME_TEAMS_SUCCESS, _action_types.SchemeTypes.GET_SCHEME_TEAMS_FAILURE, state, action);
}

function getSchemeChannels() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.SchemeTypes.GET_SCHEME_CHANNELS_REQUEST, _action_types.SchemeTypes.GET_SCHEME_CHANNELS_SUCCESS, _action_types.SchemeTypes.GET_SCHEME_CHANNELS_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    getSchemes: getSchemes,
    getScheme: getScheme,
    createScheme: createScheme,
    deleteScheme: deleteScheme,
    patchScheme: patchScheme,
    getSchemeTeams: getSchemeTeams,
    getSchemeChannels: getSchemeChannels
});