'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function getMyTeams() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.MY_TEAMS_REQUEST, _action_types.TeamTypes.MY_TEAMS_SUCCESS, _action_types.TeamTypes.MY_TEAMS_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getTeams() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.GET_TEAMS_REQUEST, _action_types.TeamTypes.GET_TEAMS_SUCCESS, _action_types.TeamTypes.GET_TEAMS_FAILURE, state, action);
}

function getTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.GET_TEAM_REQUEST, _action_types.TeamTypes.GET_TEAM_SUCCESS, _action_types.TeamTypes.GET_TEAM_FAILURE, state, action);
}

function createTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.CREATE_TEAM_REQUEST, _action_types.TeamTypes.CREATE_TEAM_SUCCESS, _action_types.TeamTypes.CREATE_TEAM_FAILURE, state, action);
}

function deleteTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.DELETE_TEAM_REQUEST, _action_types.TeamTypes.DELETE_TEAM_SUCCESS, _action_types.TeamTypes.DELETE_TEAM_FAILURE, state, action);
}

function updateTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.UPDATE_TEAM_REQUEST, _action_types.TeamTypes.UPDATE_TEAM_SUCCESS, _action_types.TeamTypes.UPDATE_TEAM_FAILURE, state, action);
}

function patchTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.PATCH_TEAM_REQUEST, _action_types.TeamTypes.PATCH_TEAM_SUCCESS, _action_types.TeamTypes.PATCH_TEAM_FAILURE, state, action);
}

function updateTeamScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.UPDATE_TEAM_SCHEME_REQUEST, _action_types.TeamTypes.UPDATE_TEAM_SCHEME_SUCCESS, _action_types.TeamTypes.UPDATE_TEAM_SCHEME_FAILURE, state, action);
}

function getMyTeamMembers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.MY_TEAM_MEMBERS_REQUEST, _action_types.TeamTypes.MY_TEAM_MEMBERS_SUCCESS, _action_types.TeamTypes.MY_TEAM_MEMBERS_FAILURE, state, action);
}

function getMyTeamUnreads() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.MY_TEAM_UNREADS_REQUEST, _action_types.TeamTypes.MY_TEAM_UNREADS_SUCCESS, _action_types.TeamTypes.MY_TEAM_UNREADS_FAILURE, state, action);
}

function getTeamMembers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.TEAM_MEMBERS_REQUEST, _action_types.TeamTypes.TEAM_MEMBERS_SUCCESS, _action_types.TeamTypes.TEAM_MEMBERS_FAILURE, state, action);
}

function getTeamStats() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.TEAM_STATS_REQUEST, _action_types.TeamTypes.TEAM_STATS_SUCCESS, _action_types.TeamTypes.TEAM_STATS_FAILURE, state, action);
}

function addUserToTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.ADD_TEAM_MEMBER_REQUEST, _action_types.TeamTypes.ADD_TEAM_MEMBER_SUCCESS, _action_types.TeamTypes.ADD_TEAM_MEMBER_FAILURE, state, action);
}

function removeUserFromTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.REMOVE_TEAM_MEMBER_REQUEST, _action_types.TeamTypes.REMOVE_TEAM_MEMBER_SUCCESS, _action_types.TeamTypes.REMOVE_TEAM_MEMBER_FAILURE, state, action);
}

function updateTeamMember() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.UPDATE_TEAM_MEMBER_REQUEST, _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SUCCESS, _action_types.TeamTypes.UPDATE_TEAM_MEMBER_FAILURE, state, action);
}

function emailInvite() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.TEAM_EMAIL_INVITE_REQUEST, _action_types.TeamTypes.TEAM_EMAIL_INVITE_SUCCESS, _action_types.TeamTypes.TEAM_EMAIL_INVITE_FAILURE, state, action);
}

function joinTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.JOIN_TEAM_REQUEST, _action_types.TeamTypes.JOIN_TEAM_SUCCESS, _action_types.TeamTypes.JOIN_TEAM_FAILURE, state, action);
}

function setTeamIcon() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.SET_TEAM_ICON_REQUEST, _action_types.TeamTypes.SET_TEAM_ICON_SUCCESS, _action_types.TeamTypes.SET_TEAM_ICON_FAILURE, state, action);
}

function removeTeamIcon() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.REMOVE_TEAM_ICON_REQUEST, _action_types.TeamTypes.REMOVE_TEAM_ICON_SUCCESS, _action_types.TeamTypes.REMOVE_TEAM_ICON_FAILURE, state, action);
}

function updateTeamMemberSchemeRoles() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_REQUEST, _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_SUCCESS, _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    getMyTeams: getMyTeams,
    getTeams: getTeams,
    getTeam: getTeam,
    createTeam: createTeam,
    deleteTeam: deleteTeam,
    updateTeam: updateTeam,
    patchTeam: patchTeam,
    updateTeamScheme: updateTeamScheme,
    getMyTeamMembers: getMyTeamMembers,
    getMyTeamUnreads: getMyTeamUnreads,
    getTeamMembers: getTeamMembers,
    getTeamStats: getTeamStats,
    addUserToTeam: addUserToTeam,
    removeUserFromTeam: removeUserFromTeam,
    updateTeamMember: updateTeamMember,
    emailInvite: emailInvite,
    joinTeam: joinTeam,
    setTeamIcon: setTeamIcon,
    removeTeamIcon: removeTeamIcon,
    updateTeamMemberSchemeRoles: updateTeamMemberSchemeRoles
});