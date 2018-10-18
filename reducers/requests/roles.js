'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function getRolesByNames() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.RoleTypes.ROLES_BY_NAMES_REQUEST, _action_types.RoleTypes.ROLES_BY_NAMES_SUCCESS, _action_types.RoleTypes.ROLES_BY_NAMES_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getRoleByName() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.RoleTypes.ROLE_BY_NAME_REQUEST, _action_types.RoleTypes.ROLE_BY_NAME_SUCCESS, _action_types.RoleTypes.ROLE_BY_NAME_FAILURE, state, action);
}

function getRole() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.RoleTypes.ROLE_BY_ID_REQUEST, _action_types.RoleTypes.ROLE_BY_ID_SUCCESS, _action_types.RoleTypes.ROLE_BY_ID_FAILURE, state, action);
}

function editRole() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.RoleTypes.EDIT_ROLE_REQUEST, _action_types.RoleTypes.EDIT_ROLE_SUCCESS, _action_types.RoleTypes.EDIT_ROLE_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    getRolesByNames: getRolesByNames,
    getRoleByName: getRoleByName,
    getRole: getRole,
    editRole: editRole
});