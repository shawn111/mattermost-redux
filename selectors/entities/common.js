'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMyCurrentChannelMembership = undefined;
exports.getCurrentChannelId = getCurrentChannelId;
exports.getMyChannelMemberships = getMyChannelMemberships;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentUserId = getCurrentUserId;
exports.getUsers = getUsers;

var _reselect = require('reselect');

// Channels

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function getCurrentChannelId(state) {
    return state.entities.channels.currentChannelId;
}

function getMyChannelMemberships(state) {
    return state.entities.channels.myMembers;
}

var getMyCurrentChannelMembership = exports.getMyCurrentChannelMembership = (0, _reselect.createSelector)(getCurrentChannelId, getMyChannelMemberships, function (currentChannelId, channelMemberships) {
    return channelMemberships[currentChannelId] || {};
});

// Users

function getCurrentUser(state) {
    return state.entities.users.profiles[getCurrentUserId(state)];
}

function getCurrentUserId(state) {
    return state.entities.users.currentUserId;
}

function getUsers(state) {
    return state.entities.users.profiles;
}