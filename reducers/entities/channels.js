'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

var _constants = require('../../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function channelListToSet(state, action) {
    var nextState = _extends({}, state);
    action.data.forEach(function (channel) {
        var nextSet = new Set(nextState[channel.team_id]);
        nextSet.add(channel.id);
        nextState[channel.team_id] = nextSet;
    });

    return nextState;
}

function removeChannelFromSet(state, action) {
    var id = action.data.team_id;
    var nextSet = new Set(state[id]);
    nextSet.delete(action.data.id);
    return _extends({}, state, _defineProperty({}, id, nextSet));
}

function currentChannelId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.SELECT_CHANNEL:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}

function channels() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.RECEIVED_CHANNEL:
            return _extends({}, state, _defineProperty({}, action.data.id, action.data));

        case _action_types.ChannelTypes.RECEIVED_CHANNELS:
        case _action_types.SchemeTypes.RECEIVED_SCHEME_CHANNELS:
            {
                var nextState = _extends({}, state);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var channel = _step.value;

                        nextState[channel.id] = channel;
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
        case _action_types.ChannelTypes.RECEIVED_CHANNEL_DELETED:
            {
                var _action$data = action.data,
                    id = _action$data.id,
                    deleteAt = _action$data.deleteAt;

                var newState = _extends({}, state, _defineProperty({}, id, _extends({}, state[id], {
                    delete_at: deleteAt
                })));
                return newState;
            }
        case _action_types.ChannelTypes.UPDATE_CHANNEL_HEADER:
            {
                var _action$data2 = action.data,
                    channelId = _action$data2.channelId,
                    header = _action$data2.header;

                return _extends({}, state, _defineProperty({}, channelId, _extends({}, state[channelId], {
                    header: header
                })));
            }
        case _action_types.ChannelTypes.UPDATE_CHANNEL_PURPOSE:
            {
                var _action$data3 = action.data,
                    _channelId = _action$data3.channelId,
                    purpose = _action$data3.purpose;

                return _extends({}, state, _defineProperty({}, _channelId, _extends({}, state[_channelId], {
                    purpose: purpose
                })));
            }
        case _action_types.ChannelTypes.LEAVE_CHANNEL:
            {
                if (action.data && action.data.type === _constants.General.PRIVATE_CHANNEL) {
                    var _nextState = _extends({}, state);
                    Reflect.deleteProperty(_nextState, action.data.id);
                    return _nextState;
                }
                return state;
            }
        case _action_types.ChannelTypes.INCREMENT_TOTAL_MSG_COUNT:
            {
                var _action$data4 = action.data,
                    _channelId2 = _action$data4.channelId,
                    amount = _action$data4.amount;

                var _channel = state[_channelId2];

                if (!_channel) {
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _channelId2, _extends({}, _channel, {
                    total_msg_count: _channel.total_msg_count + amount
                })));
            }
        case _action_types.ChannelTypes.UPDATED_CHANNEL_SCHEME:
            {
                var _action$data5 = action.data,
                    _channelId3 = _action$data5.channelId,
                    schemeId = _action$data5.schemeId;

                var _channel2 = state[_channelId3];

                if (!_channel2) {
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _channelId3, _extends({}, _channel2, { scheme_id: schemeId })));
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function channelsInTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.RECEIVED_CHANNEL:
            {
                var nextSet = new Set(state[action.data.team_id]);
                nextSet.add(action.data.id);
                return _extends({}, state, _defineProperty({}, action.data.team_id, nextSet));
            }
        case _action_types.ChannelTypes.RECEIVED_CHANNELS:
            {
                return channelListToSet(state, action);
            }
        case _action_types.ChannelTypes.LEAVE_CHANNEL:
            {
                if (action.data && action.data.type === _constants.General.PRIVATE_CHANNEL) {
                    return removeChannelFromSet(state, action);
                }
                return state;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function myMembers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER:
            {
                var channelMember = action.data;
                return _extends({}, state, _defineProperty({}, channelMember.channel_id, channelMember));
            }
        case _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBERS:
            {
                var nextState = _extends({}, state);
                var remove = action.remove;
                if (remove) {
                    remove.forEach(function (id) {
                        Reflect.deleteProperty(nextState, id);
                    });
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = action.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var cm = _step2.value;

                        nextState[cm.channel_id] = cm;
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

                return nextState;
            }
        case _action_types.ChannelTypes.RECEIVED_CHANNEL_PROPS:
            {
                var member = _extends({}, state[action.data.channel_id]);
                member.notify_props = action.data.notifyProps;

                return _extends({}, state, _defineProperty({}, action.data.channel_id, member));
            }
        case _action_types.ChannelTypes.INCREMENT_UNREAD_MSG_COUNT:
            {
                var _action$data6 = action.data,
                    channelId = _action$data6.channelId,
                    amount = _action$data6.amount,
                    onlyMentions = _action$data6.onlyMentions;

                var _member = state[channelId];

                if (!_member) {
                    // Don't keep track of unread posts until we've loaded the actual channel member
                    return state;
                }

                if (!onlyMentions) {
                    // Incrementing the msg_count marks the channel as read, so don't do that if these posts should be unread
                    return state;
                }

                return _extends({}, state, _defineProperty({}, channelId, _extends({}, _member, {
                    msg_count: _member.msg_count + amount
                })));
            }
        case _action_types.ChannelTypes.DECREMENT_UNREAD_MSG_COUNT:
            {
                var _action$data7 = action.data,
                    _channelId4 = _action$data7.channelId,
                    _amount = _action$data7.amount;


                var _member2 = state[_channelId4];

                if (!_member2) {
                    // Don't keep track of unread posts until we've loaded the actual channel member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _channelId4, _extends({}, _member2, {
                    msg_count: _member2.msg_count + _amount
                })));
            }
        case _action_types.ChannelTypes.INCREMENT_UNREAD_MENTION_COUNT:
            {
                var _action$data8 = action.data,
                    _channelId5 = _action$data8.channelId,
                    _amount2 = _action$data8.amount;

                var _member3 = state[_channelId5];

                if (!_member3) {
                    // Don't keep track of unread posts until we've loaded the actual channel member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _channelId5, _extends({}, _member3, {
                    mention_count: _member3.mention_count + _amount2
                })));
            }
        case _action_types.ChannelTypes.DECREMENT_UNREAD_MENTION_COUNT:
            {
                var _action$data9 = action.data,
                    _channelId6 = _action$data9.channelId,
                    _amount3 = _action$data9.amount;

                var _member4 = state[_channelId6];

                if (!_member4) {
                    // Don't keep track of unread posts until we've loaded the actual channel member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _channelId6, _extends({}, _member4, {
                    mention_count: Math.max(_member4.mention_count - _amount3, 0)
                })));
            }
        case _action_types.ChannelTypes.RECEIVED_LAST_VIEWED_AT:
            {
                var data = action.data;

                var _member5 = state[data.channel_id];

                _member5 = _extends({}, _member5, {
                    last_viewed_at: data.last_viewed_at
                });

                return _extends({}, state, _defineProperty({}, action.data.channel_id, _member5));
            }
        case _action_types.ChannelTypes.LEAVE_CHANNEL:
            {
                var _nextState2 = _extends({}, state);
                if (action.data) {
                    Reflect.deleteProperty(_nextState2, action.data.id);
                    return _nextState2;
                }

                return state;
            }
        case _action_types.ChannelTypes.UPDATED_CHANNEL_MEMBER_SCHEME_ROLES:
            {
                return updateChannelMemberSchemeRoles(state, action);
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function membersInChannel() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER:
        case _action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBER:
            {
                var member = action.data;
                var members = _extends({}, state[member.channel_id] || {});
                members[member.user_id] = member;
                return _extends({}, state, _defineProperty({}, member.channel_id, members));
            }
        case _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBERS:
        case _action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBERS:
            {
                var nextState = _extends({}, state);
                var remove = action.remove;
                var currentUserId = action.currentUserId;
                if (remove && currentUserId) {
                    remove.forEach(function (id) {
                        if (nextState[id]) {
                            Reflect.deleteProperty(nextState[id], currentUserId);
                        }
                    });
                }

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = action.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var cm = _step3.value;

                        if (nextState[cm.channel_id]) {
                            nextState[cm.channel_id] = _extends({}, nextState[cm.channel_id]);
                        } else {
                            nextState[cm.channel_id] = {};
                        }
                        nextState[cm.channel_id][cm.user_id] = cm;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return nextState;
            }
        case _action_types.ChannelTypes.LEAVE_CHANNEL:
        case _action_types.UserTypes.RECEIVED_PROFILE_NOT_IN_CHANNEL:
            {
                if (action.data) {
                    var data = action.data;
                    var _members = _extends({}, state[data.id] || {});
                    if (_members) {
                        Reflect.deleteProperty(_members, data.user_id);
                        return _extends({}, state, _defineProperty({}, data.id, _members));
                    }
                }

                return state;
            }
        case _action_types.ChannelTypes.UPDATED_CHANNEL_MEMBER_SCHEME_ROLES:
            {
                return updateChannelMemberSchemeRoles(state, action);
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function stats() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.ChannelTypes.RECEIVED_CHANNEL_STATS:
            {
                var nextState = _extends({}, state);
                var stat = action.data;
                nextState[stat.channel_id] = stat;

                return nextState;
            }
        case _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_SUCCESS:
            {
                var _nextState3 = _extends({}, state);
                var id = action.id;
                var nextStat = _nextState3[id];
                if (nextStat) {
                    var count = nextStat.member_count + 1;
                    return _extends({}, _nextState3, _defineProperty({}, id, _extends({}, nextStat, {
                        member_count: count
                    })));
                }

                return state;
            }
        case _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_SUCCESS:
            {
                var _nextState4 = _extends({}, state);
                var _id = action.id;
                var _nextStat = _nextState4[_id];
                if (_nextStat) {
                    var _count = _nextStat.member_count - 1;
                    return _extends({}, _nextState4, _defineProperty({}, _id, _extends({}, _nextStat, {
                        member_count: _count || 1
                    })));
                }

                return state;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function updateChannelMemberSchemeRoles(state, action) {
    var _action$data10 = action.data,
        channelId = _action$data10.channelId,
        userId = _action$data10.userId,
        isSchemeUser = _action$data10.isSchemeUser,
        isSchemeAdmin = _action$data10.isSchemeAdmin;

    var channel = state[channelId];
    if (channel) {
        var member = channel[userId];
        if (member) {
            return _extends({}, state, _defineProperty({}, channelId, _extends({}, state[channelId], _defineProperty({}, userId, _extends({}, state[channelId][userId], {
                scheme_user: isSchemeUser,
                scheme_admin: isSchemeAdmin
            })))));
        }
    }
    return state;
}

exports.default = (0, _redux.combineReducers)({

    // the current selected channel
    currentChannelId: currentChannelId,

    // object where every key is the channel id and has and object with the channel detail
    channels: channels,

    // object where every key is a team id and has set of channel ids that are on the team
    channelsInTeam: channelsInTeam,

    // object where every key is the channel id and has an object with the channel members detail
    myMembers: myMembers,

    // object where every key is the channel id with an object where key is a user id and has an object with the channel members detail
    membersInChannel: membersInChannel,

    // object where every key is the channel id and has an object with the channel stats
    stats: stats
});