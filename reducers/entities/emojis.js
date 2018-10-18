'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


var _redux = require('redux');

var _action_types = require('../../action_types');

function customEmoji() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI:
            {
                var nextState = _extends({}, state);
                nextState[action.data.id] = action.data;
                return nextState;
            }
        case _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS:
            {
                var _nextState = _extends({}, state);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var emoji = _step.value;

                        _nextState[emoji.id] = emoji;
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

                return _nextState;
            }
        case _action_types.EmojiTypes.DELETED_CUSTOM_EMOJI:
            {
                var _nextState2 = _extends({}, state);
                Reflect.deleteProperty(_nextState2, action.data.id);
                return _nextState2;
            }
        case _action_types.EmojiTypes.CLEAR_CUSTOM_EMOJIS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function nonExistentEmoji() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
    var action = arguments[1];

    switch (action.type) {
        case _action_types.EmojiTypes.CUSTOM_EMOJI_DOES_NOT_EXIST:
            {
                if (!state.has(action.data)) {
                    var nextState = new Set(state);
                    nextState.add(action.data);
                    return nextState;
                }
                return state;
            }
        case _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI:
            {
                if (action.data && state.has(action.data.name)) {
                    var _nextState3 = new Set(state);
                    _nextState3.delete(action.data.name);
                    return _nextState3;
                }
                return state;
            }
        case _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS:
            {
                var data = action.data || [];
                var _nextState4 = new Set(state);

                var changed = false;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var emoji = _step2.value;

                        if (emoji && _nextState4.has(emoji.name)) {
                            _nextState4.delete(emoji.name);
                            changed = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return changed ? _nextState4 : state;
            }
        case _action_types.EmojiTypes.CLEAR_CUSTOM_EMOJIS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return new Set();

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // object where every key is the custom emoji id and has an object with the custom emoji details
    customEmoji: customEmoji,

    // set containing custom emoji names that do not exist
    nonExistentEmoji: nonExistentEmoji

});