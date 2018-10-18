'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUsersTyping = exports.makeGetUsersTypingByChannelAndPost = undefined;

var _reselect = require('reselect');

var _common = require('./common');

var _preferences = require('./preferences');

var _user_utils = require('../../utils/user_utils');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var getUsersTypingImpl = function getUsersTypingImpl(profiles, teammateNameDisplay, channelId, parentPostId, typing) {
    var id = channelId + parentPostId;

    if (typing[id]) {
        var users = Object.keys(typing[id]);

        if (users.length) {
            return users.map(function (userId) {
                return (0, _user_utils.displayUsername)(profiles[userId], teammateNameDisplay);
            });
        }
    }

    return [];
};

var makeGetUsersTypingByChannelAndPost = exports.makeGetUsersTypingByChannelAndPost = function makeGetUsersTypingByChannelAndPost() {
    return (0, _reselect.createSelector)(_common.getUsers, _preferences.getTeammateNameDisplaySetting, function (state, options) {
        return options.channelId;
    }, function (state, options) {
        return options.postId;
    }, function (state) {
        return state.entities.typing;
    }, getUsersTypingImpl);
};

var getUsersTyping = exports.getUsersTyping = (0, _reselect.createSelector)(_common.getUsers, _preferences.getTeammateNameDisplaySetting, _common.getCurrentChannelId, function (state) {
    return state.entities.posts.selectedPostId;
}, function (state) {
    return state.entities.typing;
}, getUsersTypingImpl);