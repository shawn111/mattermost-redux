'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createIncomingHook = createIncomingHook;
exports.getIncomingHook = getIncomingHook;
exports.getIncomingHooks = getIncomingHooks;
exports.removeIncomingHook = removeIncomingHook;
exports.updateIncomingHook = updateIncomingHook;
exports.createOutgoingHook = createOutgoingHook;
exports.getOutgoingHook = getOutgoingHook;
exports.getOutgoingHooks = getOutgoingHooks;
exports.removeOutgoingHook = removeOutgoingHook;
exports.updateOutgoingHook = updateOutgoingHook;
exports.regenOutgoingHookToken = regenOutgoingHookToken;
exports.getCommands = getCommands;
exports.getAutocompleteCommands = getAutocompleteCommands;
exports.getCustomTeamCommands = getCustomTeamCommands;
exports.addCommand = addCommand;
exports.editCommand = editCommand;
exports.executeCommand = executeCommand;
exports.regenCommandToken = regenCommandToken;
exports.deleteCommand = deleteCommand;
exports.addOAuthApp = addOAuthApp;
exports.editOAuthApp = editOAuthApp;
exports.getOAuthApps = getOAuthApps;
exports.getOAuthApp = getOAuthApp;
exports.deleteOAuthApp = deleteOAuthApp;
exports.regenOAuthAppSecret = regenOAuthAppSecret;

var _action_types = require('../action_types');

var _constants = require('../constants');

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _errors = require('./errors');

var _helpers = require('./helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function createIncomingHook(hook) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createIncomingWebhook, _action_types.IntegrationTypes.CREATE_INCOMING_HOOK_REQUEST, [_action_types.IntegrationTypes.RECEIVED_INCOMING_HOOK, _action_types.IntegrationTypes.CREATE_INCOMING_HOOK_SUCCESS], _action_types.IntegrationTypes.CREATE_INCOMING_HOOK_FAILURE, hook);
}

function getIncomingHook(hookId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getIncomingWebhook, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_INCOMING_HOOK, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_SUCCESS], _action_types.IntegrationTypes.GET_INCOMING_HOOKS_FAILURE, hookId);
}

function getIncomingHooks() {
    var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getIncomingWebhooks, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_INCOMING_HOOKS, _action_types.IntegrationTypes.GET_INCOMING_HOOKS_SUCCESS], _action_types.IntegrationTypes.GET_INCOMING_HOOKS_FAILURE, teamId, page, perPage);
}

function removeIncomingHook(hookId) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.IntegrationTypes.DELETE_INCOMING_HOOK_REQUEST, data: {} }, getState);

                            _context.prev = 1;
                            _context.next = 4;
                            return _client.Client4.removeIncomingWebhook(hookId);

                        case 4:
                            _context.next = 11;
                            break;

                        case 6:
                            _context.prev = 6;
                            _context.t0 = _context['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.IntegrationTypes.DELETE_INCOMING_HOOK_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.IntegrationTypes.DELETED_INCOMING_HOOK,
                                data: { id: hookId }
                            }, {
                                type: _action_types.IntegrationTypes.DELETE_INCOMING_HOOK_SUCCESS
                            }]), getState);

                            return _context.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 6]]);
        }));

        return function (_x4, _x5) {
            return _ref.apply(this, arguments);
        };
    }();
}

function updateIncomingHook(hook) {
    return (0, _helpers.bindClientFunc)(_client.Client4.updateIncomingWebhook, _action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_REQUEST, [_action_types.IntegrationTypes.RECEIVED_INCOMING_HOOK, _action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_SUCCESS], _action_types.IntegrationTypes.UPDATE_INCOMING_HOOK_FAILURE, hook);
}

function createOutgoingHook(hook) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createOutgoingWebhook, _action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OUTGOING_HOOK, _action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_SUCCESS], _action_types.IntegrationTypes.CREATE_OUTGOING_HOOK_FAILURE, hook);
}

function getOutgoingHook(hookId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getOutgoingWebhook, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OUTGOING_HOOK, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_SUCCESS], _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_FAILURE, hookId);
}

function getOutgoingHooks() {
    var channelId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var teamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getOutgoingWebhooks, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OUTGOING_HOOKS, _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_SUCCESS], _action_types.IntegrationTypes.GET_OUTGOING_HOOKS_FAILURE, channelId, teamId, page, perPage);
}

function removeOutgoingHook(hookId) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_REQUEST, data: {} }, getState);

                            _context2.prev = 1;
                            _context2.next = 4;
                            return _client.Client4.removeOutgoingWebhook(hookId);

                        case 4:
                            _context2.next = 11;
                            break;

                        case 6:
                            _context2.prev = 6;
                            _context2.t0 = _context2['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_FAILURE, error: _context2.t0 }, (0, _errors.logError)(_context2.t0)]), getState);
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.IntegrationTypes.DELETED_OUTGOING_HOOK,
                                data: { id: hookId }
                            }, {
                                type: _action_types.IntegrationTypes.DELETE_OUTGOING_HOOK_SUCCESS
                            }]), getState);

                            return _context2.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[1, 6]]);
        }));

        return function (_x10, _x11) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function updateOutgoingHook(hook) {
    return (0, _helpers.bindClientFunc)(_client.Client4.updateOutgoingWebhook, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OUTGOING_HOOK, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_SUCCESS], _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_FAILURE, hook);
}

function regenOutgoingHookToken(hookId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.regenOutgoingHookToken, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OUTGOING_HOOK, _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_SUCCESS], _action_types.IntegrationTypes.UPDATE_OUTGOING_HOOK_FAILURE, hookId);
}

function getCommands(teamId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getCommandsList, _action_types.IntegrationTypes.GET_COMMANDS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_COMMANDS, _action_types.IntegrationTypes.GET_COMMANDS_SUCCESS], _action_types.IntegrationTypes.GET_COMMANDS_FAILURE, teamId);
}

function getAutocompleteCommands(teamId) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getAutocompleteCommandsList, _action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_COMMANDS, _action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_SUCCESS], _action_types.IntegrationTypes.GET_AUTOCOMPLETE_COMMANDS_FAILURE, teamId, page, perPage);
}

function getCustomTeamCommands(teamId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getCustomTeamCommands, _action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_CUSTOM_TEAM_COMMANDS, _action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_SUCCESS], _action_types.IntegrationTypes.GET_CUSTOM_TEAM_COMMANDS_FAILURE, teamId);
}

function addCommand(command) {
    return (0, _helpers.bindClientFunc)(_client.Client4.addCommand, _action_types.IntegrationTypes.ADD_COMMAND_REQUEST, [_action_types.IntegrationTypes.RECEIVED_COMMAND, _action_types.IntegrationTypes.ADD_COMMAND_SUCCESS], _action_types.IntegrationTypes.ADD_COMMAND_FAILURE, command);
}

function editCommand(command) {
    return (0, _helpers.bindClientFunc)(_client.Client4.editCommand, _action_types.IntegrationTypes.EDIT_COMMAND_REQUEST, [_action_types.IntegrationTypes.RECEIVED_COMMAND, _action_types.IntegrationTypes.EDIT_COMMAND_SUCCESS], _action_types.IntegrationTypes.EDIT_COMMAND_FAILURE, command);
}

function executeCommand(command, args) {
    return (0, _helpers.bindClientFunc)(_client.Client4.executeCommand, _action_types.IntegrationTypes.EXECUTE_COMMAND_REQUEST, _action_types.IntegrationTypes.EXECUTE_COMMAND_SUCCESS, _action_types.IntegrationTypes.EXECUTE_COMMAND_FAILURE, command, args);
}

function regenCommandToken(id) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_REQUEST, data: {} }, getState);

                            res = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.regenCommandToken(id);

                        case 5:
                            res = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_FAILURE, error: _context3.t0 }, (0, _errors.logError)(_context3.t0)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.IntegrationTypes.RECEIVED_COMMAND_TOKEN,
                                data: {
                                    id: id,
                                    token: res.token
                                }
                            }, {
                                type: _action_types.IntegrationTypes.REGEN_COMMAND_TOKEN_SUCCESS
                            }]), getState);

                            return _context3.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x14, _x15) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function deleteCommand(id) {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.IntegrationTypes.DELETE_COMMAND_REQUEST, data: {} }, getState);

                            _context4.prev = 1;
                            _context4.next = 4;
                            return _client.Client4.deleteCommand(id);

                        case 4:
                            _context4.next = 11;
                            break;

                        case 6:
                            _context4.prev = 6;
                            _context4.t0 = _context4['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.IntegrationTypes.DELETE_COMMAND_FAILURE, error: _context4.t0 }, (0, _errors.logError)(_context4.t0)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.IntegrationTypes.DELETED_COMMAND,
                                data: { id: id }
                            }, {
                                type: _action_types.IntegrationTypes.DELETE_COMMAND_SUCCESS
                            }]), getState);

                            return _context4.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[1, 6]]);
        }));

        return function (_x16, _x17) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function addOAuthApp(app) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createOAuthApp, _action_types.IntegrationTypes.ADD_OAUTH_APP_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OAUTH_APP, _action_types.IntegrationTypes.ADD_OAUTH_APP_SUCCESS], _action_types.IntegrationTypes.ADD_OAUTH_APP_FAILURE, app);
}

function editOAuthApp(app) {
    return (0, _helpers.bindClientFunc)(_client.Client4.editOAuthApp, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OAUTH_APP, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_SUCCESS], _action_types.IntegrationTypes.UPDATE_OAUTH_APP_FAILURE, app);
}

function getOAuthApps() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getOAuthApps, _action_types.IntegrationTypes.GET_OAUTH_APPS_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OAUTH_APPS, _action_types.IntegrationTypes.GET_OAUTH_APPS_SUCCESS], _action_types.IntegrationTypes.GET_OAUTH_APPS_FAILURE, page, perPage);
}

function getOAuthApp(appId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getOAuthApp, _action_types.IntegrationTypes.GET_OAUTH_APP_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OAUTH_APP, _action_types.IntegrationTypes.GET_OAUTH_APP_SUCCESS], _action_types.IntegrationTypes.GET_OAUTH_APP_FAILURE, appId);
}

function deleteOAuthApp(id) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({ type: _action_types.IntegrationTypes.DELETE_OAUTH_APP_REQUEST, data: {} }, getState);

                            _context5.prev = 1;
                            _context5.next = 4;
                            return _client.Client4.deleteOAuthApp(id);

                        case 4:
                            _context5.next = 11;
                            break;

                        case 6:
                            _context5.prev = 6;
                            _context5.t0 = _context5['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context5.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.IntegrationTypes.DELETE_OAUTH_APP_FAILURE, error: _context5.t0 }, (0, _errors.logError)(_context5.t0)]), getState);
                            return _context5.abrupt('return', { error: _context5.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.IntegrationTypes.DELETED_OAUTH_APP,
                                data: { id: id }
                            }, {
                                type: _action_types.IntegrationTypes.DELETE_OAUTH_APP_SUCCESS
                            }]), getState);

                            return _context5.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[1, 6]]);
        }));

        return function (_x20, _x21) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function regenOAuthAppSecret(appId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.regenOAuthAppSecret, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_REQUEST, [_action_types.IntegrationTypes.RECEIVED_OAUTH_APP, _action_types.IntegrationTypes.UPDATE_OAUTH_APP_SUCCESS], _action_types.IntegrationTypes.UPDATE_OAUTH_APP_FAILURE, appId);
}