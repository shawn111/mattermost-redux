'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function getChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CHANNEL_REQUEST, _action_types.ChannelTypes.CHANNEL_SUCCESS, _action_types.ChannelTypes.CHANNEL_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function myChannels() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CHANNELS_REQUEST, _action_types.ChannelTypes.CHANNELS_SUCCESS, _action_types.ChannelTypes.CHANNELS_FAILURE, state, action);
}

function myMembers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CHANNEL_MY_MEMBERS_REQUEST, _action_types.ChannelTypes.CHANNEL_MY_MEMBERS_SUCCESS, _action_types.ChannelTypes.CHANNEL_MY_MEMBERS_FAILURE, state, action);
}

function getChannelTimezones() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.GET_CHANNELS_TIMEZONE_REQUEST, _action_types.ChannelTypes.GET_CHANNELS_TIMEZONE_SUCCESS, _action_types.ChannelTypes.GET_CHANNELS_TIMEZONE_FAILURE, state, action);
}

function members() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST, _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS, _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, state, action);
}

function createChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CREATE_CHANNEL_REQUEST, _action_types.ChannelTypes.CREATE_CHANNEL_SUCCESS, _action_types.ChannelTypes.CREATE_CHANNEL_FAILURE, state, action);
}

function updateChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.UPDATE_CHANNEL_REQUEST, _action_types.ChannelTypes.UPDATE_CHANNEL_SUCCESS, _action_types.ChannelTypes.UPDATE_CHANNEL_FAILURE, state, action);
}

function updateChannelNotifyProps() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.NOTIFY_PROPS_REQUEST, _action_types.ChannelTypes.NOTIFY_PROPS_SUCCESS, _action_types.ChannelTypes.NOTIFY_PROPS_FAILURE, state, action);
}

function joinChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.JOIN_CHANNEL_REQUEST, _action_types.ChannelTypes.JOIN_CHANNEL_SUCCESS, _action_types.ChannelTypes.JOIN_CHANNEL_FAILURE, state, action);
}

function deleteChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.DELETE_CHANNEL_REQUEST, _action_types.ChannelTypes.DELETE_CHANNEL_SUCCESS, _action_types.ChannelTypes.DELETE_CHANNEL_FAILURE, state, action);
}

function updateLastViewedAt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.UPDATE_LAST_VIEWED_REQUEST, _action_types.ChannelTypes.UPDATE_LAST_VIEWED_SUCCESS, _action_types.ChannelTypes.UPDATE_LAST_VIEWED_FAILURE, state, action);
}

function getChannels() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.GET_CHANNELS_REQUEST, _action_types.ChannelTypes.GET_CHANNELS_SUCCESS, _action_types.ChannelTypes.GET_CHANNELS_FAILURE, state, action);
}

function getChannelStats() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.CHANNEL_STATS_REQUEST, _action_types.ChannelTypes.CHANNEL_STATS_SUCCESS, _action_types.ChannelTypes.CHANNEL_STATS_FAILURE, state, action);
}

function addChannelMember() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.ADD_CHANNEL_MEMBER_REQUEST, _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_SUCCESS, _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_FAILURE, state, action);
}

function removeChannelMember() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_REQUEST, _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_SUCCESS, _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_FAILURE, state, action);
}

function updateChannelMember() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_REQUEST, _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_SUCCESS, _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_FAILURE, state, action);
}

function updateChannelScheme() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.UPDATE_CHANNEL_SCHEME_REQUEST, _action_types.ChannelTypes.UPDATE_CHANNEL_SCHEME_SUCCESS, _action_types.ChannelTypes.UPDATE_CHANNEL_SCHEME_FAILURE, state, action);
}

function updateChannelMemberSchemeRoles() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_SCHEME_ROLES_REQUEST, _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_SCHEME_ROLES_SUCCESS, _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_SCHEME_ROLES_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    getChannel: getChannel,
    getChannels: getChannels,
    myMembers: myMembers,
    members: members,
    myChannels: myChannels,
    createChannel: createChannel,
    updateChannel: updateChannel,
    updateChannelNotifyProps: updateChannelNotifyProps,
    joinChannel: joinChannel,
    deleteChannel: deleteChannel,
    updateLastViewedAt: updateLastViewedAt,
    getChannelStats: getChannelStats,
    addChannelMember: addChannelMember,
    removeChannelMember: removeChannelMember,
    getChannelTimezones: getChannelTimezones,
    updateChannelMember: updateChannelMember,
    updateChannelScheme: updateChannelScheme,
    updateChannelMemberSchemeRoles: updateChannelMemberSchemeRoles

});