'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function createCustomEmoji() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_REQUEST, _action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_SUCCESS, _action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getCustomEmoji() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.EmojiTypes.GET_CUSTOM_EMOJI_REQUEST, _action_types.EmojiTypes.GET_CUSTOM_EMOJI_SUCCESS, _action_types.EmojiTypes.GET_CUSTOM_EMOJI_FAILURE, state, action);
}

function getCustomEmojis() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.EmojiTypes.GET_CUSTOM_EMOJIS_REQUEST, _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_SUCCESS, _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_FAILURE, state, action);
}

function getAllCustomEmojis() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_REQUEST, _action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_SUCCESS, _action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_FAILURE, state, action);
}

function deleteCustomEmoji() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_REQUEST, _action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_SUCCESS, _action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    createCustomEmoji: createCustomEmoji,
    getCustomEmoji: getCustomEmoji,
    getCustomEmojis: getCustomEmojis,
    getAllCustomEmojis: getAllCustomEmojis,
    deleteCustomEmoji: deleteCustomEmoji
});