'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCustomEmojiIdsSortedByName = exports.getCustomEmojisByName = exports.getCustomEmojisAsMap = undefined;
exports.getCustomEmojis = getCustomEmojis;

var _reselect = require('reselect');

var _helpers = require('../../utils/helpers');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function getCustomEmojis(state) {
    return state.entities.emojis.customEmoji;
}

var getCustomEmojisAsMap = exports.getCustomEmojisAsMap = (0, _reselect.createSelector)(getCustomEmojis, function (emojis) {
    var map = new Map();
    Object.keys(emojis).forEach(function (key) {
        map.set(key, emojis[key]);
    });
    return map;
});

var getCustomEmojisByName = exports.getCustomEmojisByName = (0, _reselect.createSelector)(getCustomEmojis, function (emojis) {
    var map = new Map();

    Object.keys(emojis).forEach(function (key) {
        map.set(emojis[key].name, emojis[key]);
    });

    return map;
});

var getCustomEmojiIdsSortedByName = exports.getCustomEmojiIdsSortedByName = (0, _helpers.createIdsSelector)(function (state) {
    return state.entities.emojis.customEmoji;
}, function (emojis) {
    return Object.keys(emojis).sort(function (a, b) {
        return emojis[a].name.localeCompare(emojis[b].name);
    });
});