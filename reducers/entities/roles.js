'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

function pending() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
    var action = arguments[1];

    switch (action.type) {
        case _action_types.RoleTypes.SET_PENDING_ROLES:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return new Set();
        default:
            return state;
    }
}

function roles() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.RoleTypes.RECEIVED_ROLES:
            {
                if (action.data) {
                    var nextState = _extends({}, state);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var role = _step.value;

                            nextState[role.name] = role;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return nextState;
                }

                return state;
            }
        case _action_types.RoleTypes.ROLE_DELETED:
            {
                if (action.data) {
                    var _nextState = _extends({}, state);
                    Reflect.deleteProperty(_nextState, action.data.name);
                    return _nextState;
                }

                return state;
            }
        case _action_types.RoleTypes.RECEIVED_ROLE:
            {
                if (action.data) {
                    var _nextState2 = _extends({}, state);
                    _nextState2[action.data.name] = action.data;
                    return _nextState2;
                }

                return state;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // object where the key is the category-name and has the corresponding value
    roles: roles,
    pending: pending
});