'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


var _redux = require('redux');

var _constants = require('../../constants');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function checkMfa() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    switch (action.type) {
        case _action_types.UserTypes.CHECK_MFA_REQUEST:
            return _extends({}, state, { status: _constants.RequestStatus.STARTED });

        case _action_types.UserTypes.CHECK_MFA_SUCCESS:
            return _extends({}, state, { status: _constants.RequestStatus.SUCCESS, error: null });

        case _action_types.UserTypes.CHECK_MFA_FAILURE:
            return _extends({}, state, { status: _constants.RequestStatus.FAILURE, error: action.error });

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return _extends({}, state, { status: _constants.RequestStatus.NOT_STARTED, error: null });

        default:
            return state;
    }
}

function login() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    switch (action.type) {
        case _action_types.UserTypes.LOGIN_REQUEST:
            return _extends({}, state, { status: _constants.RequestStatus.STARTED });

        case _action_types.UserTypes.LOGIN_SUCCESS:
            return _extends({}, state, { status: _constants.RequestStatus.SUCCESS, error: null });

        case _action_types.UserTypes.LOGIN_FAILURE:
            return _extends({}, state, { status: _constants.RequestStatus.FAILURE, error: action.error });

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return _extends({}, state, { status: _constants.RequestStatus.NOT_STARTED, error: null });

        default:
            return state;
    }
}

function generateMfaSecret() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.MFA_SECRET_REQUEST, _action_types.UserTypes.MFA_SECRET_SUCCESS, _action_types.UserTypes.MFA_SECRET_FAILURE, state, action);
}

function logout() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    switch (action.type) {
        case _action_types.UserTypes.LOGOUT_REQUEST:
            return _extends({}, state, { status: _constants.RequestStatus.STARTED });

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return _extends({}, state, { status: _constants.RequestStatus.SUCCESS, error: null });

        case _action_types.UserTypes.LOGOUT_FAILURE:
            return _extends({}, state, { status: _constants.RequestStatus.FAILURE, error: action.error });

        case _action_types.UserTypes.RESET_LOGOUT_STATE:
            return (0, _helpers.initialRequestState)();

        default:
            return state;
    }
}

function getProfiles() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_REQUEST, _action_types.UserTypes.PROFILES_SUCCESS, _action_types.UserTypes.PROFILES_FAILURE, state, action);
}

function getProfilesInTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_IN_TEAM_REQUEST, _action_types.UserTypes.PROFILES_IN_TEAM_SUCCESS, _action_types.UserTypes.PROFILES_IN_TEAM_FAILURE, state, action);
}

function getProfilesNotInTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_NOT_IN_TEAM_REQUEST, _action_types.UserTypes.PROFILES_NOT_IN_TEAM_SUCCESS, _action_types.UserTypes.PROFILES_NOT_IN_TEAM_FAILURE, state, action);
}

function getProfilesWithoutTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_WITHOUT_TEAM_REQUEST, _action_types.UserTypes.PROFILES_WITHOUT_TEAM_SUCCESS, _action_types.UserTypes.PROFILES_WITHOUT_TEAM_FAILURE, state, action);
}

function getProfilesInChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_IN_CHANNEL_REQUEST, _action_types.UserTypes.PROFILES_IN_CHANNEL_SUCCESS, _action_types.UserTypes.PROFILES_IN_CHANNEL_FAILURE, state, action);
}

function getProfilesNotInChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_REQUEST, _action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_SUCCESS, _action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_FAILURE, state, action);
}

function getUser() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.USER_REQUEST, _action_types.UserTypes.USER_SUCCESS, _action_types.UserTypes.USER_FAILURE, state, action);
}

function getUserByUsername() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.USER_BY_USERNAME_REQUEST, _action_types.UserTypes.USER_BY_USERNAME_SUCCESS, _action_types.UserTypes.USER_BY_USERNAME_FAILURE, state, action);
}

function getStatusesByIds() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILES_STATUSES_REQUEST, _action_types.UserTypes.PROFILES_STATUSES_SUCCESS, _action_types.UserTypes.PROFILES_STATUSES_FAILURE, state, action);
}

function getStatus() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PROFILE_STATUS_REQUEST, _action_types.UserTypes.PROFILE_STATUS_SUCCESS, _action_types.UserTypes.PROFILE_STATUS_FAILURE, state, action);
}

function getTotalUsersStats() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.USER_STATS_REQUEST, _action_types.UserTypes.USER_STATS_SUCCESS, _action_types.UserTypes.USER_STATS_FAILURE, state, action);
}

function setStatus() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.SET_STATUS_REQUEST, _action_types.UserTypes.SET_STATUS_SUCCESS, _action_types.UserTypes.SET_STATUS_FAILURE, state, action);
}

function getSessions() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.SESSIONS_REQUEST, _action_types.UserTypes.SESSIONS_SUCCESS, _action_types.UserTypes.SESSIONS_FAILURE, state, action);
}

function revokeSession() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.REVOKE_SESSION_REQUEST, _action_types.UserTypes.REVOKE_SESSION_SUCCESS, _action_types.UserTypes.REVOKE_SESSION_FAILURE, state, action);
}

function revokeAllSessionsForUser() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_REQUEST, _action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_SUCCESS, _action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_FAILURE, state, action);
}

function getAudits() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.AUDITS_REQUEST, _action_types.UserTypes.AUDITS_SUCCESS, _action_types.UserTypes.AUDITS_FAILURE, state, action);
}

function autocompleteUsers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.AUTOCOMPLETE_USERS_REQUEST, _action_types.UserTypes.AUTOCOMPLETE_USERS_SUCCESS, _action_types.UserTypes.AUTOCOMPLETE_USERS_FAILURE, state, action);
}

function searchProfiles() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.SEARCH_PROFILES_REQUEST, _action_types.UserTypes.SEARCH_PROFILES_SUCCESS, _action_types.UserTypes.SEARCH_PROFILES_FAILURE, state, action);
}

function updateMe() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.UPDATE_ME_REQUEST, _action_types.UserTypes.UPDATE_ME_SUCCESS, _action_types.UserTypes.UPDATE_ME_FAILURE, state, action);
}

function updateUser() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.UPDATE_USER_REQUEST, _action_types.UserTypes.UPDATE_USER_SUCCESS, _action_types.UserTypes.UPDATE_USER_FAILURE, state, action);
}

function create() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.CREATE_USER_REQUEST, _action_types.UserTypes.CREATE_USER_SUCCESS, _action_types.UserTypes.CREATE_USER_FAILURE, state, action);
}

function verifyEmail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.VERIFY_EMAIL_REQUEST, _action_types.UserTypes.VERIFY_EMAIL_SUCCESS, _action_types.UserTypes.VERIFY_EMAIL_FAILURE, state, action);
}

function passwordReset() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.PASSWORD_RESET_REQUEST, _action_types.UserTypes.PASSWORD_RESET_SUCCESS, _action_types.UserTypes.PASSWORD_RESET_FAILURE, state, action);
}

function switchLogin() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.SWITCH_LOGIN_REQUEST, _action_types.UserTypes.SWITCH_LOGIN_SUCCESS, _action_types.UserTypes.SWITCH_LOGIN_FAILURE, state, action);
}

function updateTermsOfServiceStatus() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.UPDATE_TERMS_OF_SERVICE_STATUS_REQUEST, _action_types.UserTypes.UPDATE_TERMS_OF_SERVICE_STATUS_SUCCESS, _action_types.UserTypes.UPDATE_TERMS_OF_SERVICE_STATUS_FAILURE, state, action);
}

function getTermsOfService() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.GET_TERMS_OF_SERVICE_REQUEST, _action_types.UserTypes.GET_TERMS_OF_SERVICE_SUCCESS, _action_types.UserTypes.GET_TERMS_OF_SERVICE_FAILURE, state, action);
}

function createTermsOfService() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.CREATE_TERMS_OF_SERVICE_REQUEST, _action_types.UserTypes.CREATE_TERMS_OF_SERVICE_SUCCESS, _action_types.UserTypes.CREATE_TERMS_OF_SERVICE_FAILURE, state, action);
}

function createUserAccessToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_REQUEST, _action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_SUCCESS, _action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_FAILURE, state, action);
}

function getUserAccessToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.GET_USER_ACCESS_TOKEN_REQUEST, _action_types.UserTypes.GET_USER_ACCESS_TOKEN_SUCCESS, _action_types.UserTypes.GET_USER_ACCESS_TOKEN_FAILURE, state, action);
}

function revokeUserAccessToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_REQUEST, _action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_SUCCESS, _action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_FAILURE, state, action);
}

function disableUserAccessToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_REQUEST, _action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_SUCCESS, _action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_FAILURE, state, action);
}

function enableUserAccessToken() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_REQUEST, _action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_SUCCESS, _action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    checkMfa: checkMfa,
    generateMfaSecret: generateMfaSecret,
    login: login,
    logout: logout,
    create: create,
    getProfiles: getProfiles,
    getProfilesInTeam: getProfilesInTeam,
    getProfilesNotInTeam: getProfilesNotInTeam,
    getProfilesWithoutTeam: getProfilesWithoutTeam,
    getProfilesInChannel: getProfilesInChannel,
    getProfilesNotInChannel: getProfilesNotInChannel,
    getUser: getUser,
    getUserByUsername: getUserByUsername,
    getStatusesByIds: getStatusesByIds,
    getStatus: getStatus,
    setStatus: setStatus,
    getSessions: getSessions,
    getTotalUsersStats: getTotalUsersStats,
    revokeSession: revokeSession,
    revokeAllSessionsForUser: revokeAllSessionsForUser,
    getAudits: getAudits,
    autocompleteUsers: autocompleteUsers,
    searchProfiles: searchProfiles,
    updateMe: updateMe,
    updateUser: updateUser,
    verifyEmail: verifyEmail,
    passwordReset: passwordReset,
    switchLogin: switchLogin,
    getTermsOfService: getTermsOfService,
    createTermsOfService: createTermsOfService,
    updateTermsOfServiceStatus: updateTermsOfServiceStatus,
    createUserAccessToken: createUserAccessToken,
    getUserAccessToken: getUserAccessToken,
    revokeUserAccessToken: revokeUserAccessToken,
    disableUserAccessToken: disableUserAccessToken,
    enableUserAccessToken: enableUserAccessToken
});