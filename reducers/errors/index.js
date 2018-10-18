'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _action_types = require('../../action_types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ErrorTypes.DISMISS_ERROR:
            {
                var nextState = [].concat(_toConsumableArray(state));
                nextState.splice(action.index, 1);

                return nextState;
            }
        case _action_types.ErrorTypes.LOG_ERROR:
            {
                var _nextState = [].concat(_toConsumableArray(state));
                var displayable = action.displayable,
                    error = action.error;

                _nextState.push({
                    displayable: displayable,
                    error: error,
                    date: new Date(Date.now()).toUTCString()
                });

                return _nextState;
            }
        case _action_types.ErrorTypes.RESTORE_ERRORS:
            return action.data;
        case _action_types.ErrorTypes.CLEAR_ERRORS:
            {
                return [];
            }
        default:
            return state;
    }
};