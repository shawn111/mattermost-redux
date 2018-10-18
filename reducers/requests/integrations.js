'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function createIncomingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.CREATE_INCOMING_HOOK_REQUEST, _action_types.IntegrationTypes.CREATE_INCOMING_HOOK_SUCCESS, _action_types.IntegrationTypes.CREATE_INCOMING_HOOK_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getIncomingHooks() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_INCOMING_HOOKS_REQUEST, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_SUCCESS, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_FAILURE, state, action);
}

function deleteIncomingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.DELETE_INCOMING_HOOK_REQUEST, _action_types.IntegrationTypes.DELETE_INCOMING_HOOK_SUCCESS, _action_types.IntegrationTypes.DELETE_INCOMING_HOOK_FAILURE, state, action);
}

function updateIncomingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_REQUEST, _action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_SUCCESS, _action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_FAILURE, state, action);
}

function createOutgoingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_REQUEST, _action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_SUCCESS, _action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_FAILURE, state, action);
}

function getOutgoingHooks() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_OUTGOING_HOOKS_REQUEST, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_SUCCESS, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_FAILURE, state, action);
}

function deleteOutgoingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_REQUEST, _action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_SUCCESS, _action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_FAILURE, state, action);
}

function updateOutgoingHook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_REQUEST, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_SUCCESS, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_FAILURE, state, action);
}

function getCommands() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_COMMANDS_REQUEST, _action_types.IntegrationTypes.GET_COMMANDS_SUCCESS, _action_types.IntegrationTypes.GET_COMMANDS_FAILURE, state, action);
}

function getAutocompleteCommands() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_REQUEST, _action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_SUCCESS, _action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_FAILURE, state, action);
}

function getCustomTeamCommands() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_REQUEST, _action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_SUCCESS, _action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_FAILURE, state, action);
}

function addCommand() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.ADD_COMMAND_REQUEST, _action_types.IntegrationTypes.ADD_COMMAND_SUCCESS, _action_types.IntegrationTypes.ADD_COMMAND_FAILURE, state, action);
}

function editCommand() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.EDIT_COMMAND_REQUEST, _action_types.IntegrationTypes.EDIT_COMMAND_SUCCESS, _action_types.IntegrationTypes.EDIT_COMMAND_FAILURE, state, action);
}

function regenCommandToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_REQUEST, _action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_SUCCESS, _action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_FAILURE, state, action);
}

function deleteCommand() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.DELETE_COMMAND_REQUEST, _action_types.IntegrationTypes.DELETE_COMMAND_SUCCESS, _action_types.IntegrationTypes.DELETE_COMMAND_FAILURE, state, action);
}

function addOAuthApp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.ADD_OAUTH_APP_REQUEST, _action_types.IntegrationTypes.ADD_OAUTH_APP_SUCCESS, _action_types.IntegrationTypes.ADD_OAUTH_APP_FAILURE, state, action);
}

function getOAuthApps() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_OAUTH_APPS_REQUEST, _action_types.IntegrationTypes.GET_OAUTH_APPS_SUCCESS, _action_types.IntegrationTypes.GET_OAUTH_APPS_FAILURE, state, action);
}

function getOAuthApp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.GET_OAUTH_APP_REQUEST, _action_types.IntegrationTypes.GET_OAUTH_APP_SUCCESS, _action_types.IntegrationTypes.GET_OAUTH_APP_FAILURE, state, action);
}

function deleteOAuthApp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.DELETE_OAUTH_APP_REQUEST, _action_types.IntegrationTypes.DELETE_OAUTH_APP_SUCCESS, _action_types.IntegrationTypes.DELETE_OAUTH_APP_FAILURE, state, action);
}

function updateOAuthApp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.UPDATE_OAUTH_APP_REQUEST, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_SUCCESS, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_FAILURE, state, action);
}

function executeCommand() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.IntegrationTypes.EXECUTE_COMMAND_REQUEST, _action_types.IntegrationTypes.EXECUTE_COMMAND_SUCCESS, _action_types.IntegrationTypes.EXECUTE_COMMAND_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    createIncomingHook: createIncomingHook,
    getIncomingHooks: getIncomingHooks,
    deleteIncomingHook: deleteIncomingHook,
    updateIncomingHook: updateIncomingHook,
    createOutgoingHook: createOutgoingHook,
    getOutgoingHooks: getOutgoingHooks,
    deleteOutgoingHook: deleteOutgoingHook,
    updateOutgoingHook: updateOutgoingHook,
    getCommands: getCommands,
    getCustomTeamCommands: getCustomTeamCommands,
    addCommand: addCommand,
    editCommand: editCommand,
    regenCommandToken: regenCommandToken,
    deleteCommand: deleteCommand,
    addOAuthApp: addOAuthApp,
    getOAuthApps: getOAuthApps,
    getOAuthApp: getOAuthApp,
    deleteOAuthApp: deleteOAuthApp,
    updateOAuthApp: updateOAuthApp,
    executeCommand: executeCommand,
    getAutocompleteCommands: getAutocompleteCommands
});