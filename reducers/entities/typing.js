'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


exports.default = typing;

var _constants = require('../../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function typing() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var data = action.data,
        type = action.type;


    switch (type) {
        case _constants.WebsocketEvents.TYPING:
            {
                var id = data.id,
                    userId = data.userId,
                    now = data.now;


                if (id && userId) {
                    return _extends({}, state, _defineProperty({}, id, _extends({}, state[id] || {}, _defineProperty({}, userId, now))));
                }

                return state;
            }
        case _constants.WebsocketEvents.STOP_TYPING:
            {
                var _id = data.id,
                    _userId = data.userId,
                    _now = data.now;


                if (state[_id] && state[_id][_userId] <= _now) {
                    var nextState = _extends({}, state, _defineProperty({}, _id, _extends({}, state[_id])));

                    Reflect.deleteProperty(nextState[_id], _userId);

                    if (Object.keys(nextState[_id]).length === 0) {
                        Reflect.deleteProperty(nextState, _id);
                    }

                    return nextState;
                }

                return state;
            }

        default:
            return state;
    }
}