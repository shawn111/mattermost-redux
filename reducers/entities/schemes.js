'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


var _redux = require('redux');

var _action_types = require('../../action_types');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function schemes() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SchemeTypes.CREATED_SCHEME:
        case _action_types.SchemeTypes.PATCHED_SCHEME:
        case _action_types.SchemeTypes.RECEIVED_SCHEME:
            {
                return _extends({}, state, _defineProperty({}, action.data.id, action.data));
            }

        case _action_types.SchemeTypes.RECEIVED_SCHEMES:
            {
                var nextState = _extends({}, state);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var scheme = _step.value;

                        nextState[scheme.id] = scheme;
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

        case _action_types.SchemeTypes.DELETED_SCHEME:
            {
                var _nextState = _extends({}, state);
                Reflect.deleteProperty(_nextState, action.data.schemeId);
                return _nextState;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({ schemes: schemes });