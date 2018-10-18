'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAutocompleteCommandsList = exports.getAllCommands = exports.getOutgoingHooksInCurrentTeam = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.getIncomingHooks = getIncomingHooks;
exports.getOutgoingHooks = getOutgoingHooks;
exports.getCommands = getCommands;
exports.getOAuthApps = getOAuthApps;
exports.getSystemCommands = getSystemCommands;

var _reselect = require('reselect');

var _teams = require('./teams');

function getIncomingHooks(state) {
    return state.entities.integrations.incomingHooks;
}

function getOutgoingHooks(state) {
    return state.entities.integrations.outgoingHooks;
}

function getCommands(state) {
    return state.entities.integrations.commands;
}

function getOAuthApps(state) {
    return state.entities.integrations.oauthApps;
}

function getSystemCommands(state) {
    return state.entities.integrations.systemCommands;
}

/**
 * get outgoing hooks in current team
 */
var getOutgoingHooksInCurrentTeam = exports.getOutgoingHooksInCurrentTeam = (0, _reselect.createSelector)(_teams.getCurrentTeamId, getOutgoingHooks, function (teamId, hooks) {
    return Object.values(hooks).filter(function (o) {
        return o.teamId === teamId;
    });
});

var getAllCommands = exports.getAllCommands = (0, _reselect.createSelector)(getCommands, getSystemCommands, function (commands, systemCommands) {
    return _extends({}, commands, systemCommands);
});

var getAutocompleteCommandsList = exports.getAutocompleteCommandsList = (0, _reselect.createSelector)(getAllCommands, _teams.getCurrentTeamId, function (commands, currentTeamId) {
    return Object.values(commands).filter(function (command) {
        return command && (!command.team_id || command.team_id === currentTeamId) && command.auto_complete;
    }).sort(function (a, b) {
        return a.display_name.localeCompare(b.display_name);
    });
});