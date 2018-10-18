'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function alertStack() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var nextState = [].concat(_toConsumableArray(state));

    switch (action.type) {
        case _action_types.AlertTypes.PUSH_ALERT:
            {
                nextState.unshift(action.data);
                return nextState;
            }
        case _action_types.AlertTypes.CLEAR_ALERT:
            {
                nextState.shift();
                return nextState;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // array acting as a stack where every object is an alert
    alertStack: alertStack

});