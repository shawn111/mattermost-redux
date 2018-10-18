'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

var _team_utils = require('../../utils/team_utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function currentTeamId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.TeamTypes.SELECT_TEAM:
            return action.data;

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}

function teams() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.TeamTypes.RECEIVED_TEAMS_LIST:
        case _action_types.SchemeTypes.RECEIVED_SCHEME_TEAMS:
            return Object.assign({}, state, (0, _team_utils.teamListToMap)(action.data));
        case _action_types.TeamTypes.RECEIVED_TEAMS:
            return Object.assign({}, state, action.data);

        case _action_types.TeamTypes.CREATED_TEAM:
        case _action_types.TeamTypes.UPDATED_TEAM:
        case _action_types.TeamTypes.PATCHED_TEAM:
        case _action_types.TeamTypes.RECEIVED_TEAM:
            return _extends({}, state, _defineProperty({}, action.data.id, action.data));

        case _action_types.TeamTypes.RECEIVED_TEAM_DELETED:
            {
                var nextState = _extends({}, state);
                var teamId = action.data.id;
                if (nextState.hasOwnProperty(teamId)) {
                    Reflect.deleteProperty(nextState, teamId);
                    return nextState;
                }

                return state;
            }

        case _action_types.TeamTypes.UPDATED_TEAM_SCHEME:
            {
                var _action$data = action.data,
                    _teamId = _action$data.teamId,
                    schemeId = _action$data.schemeId;

                var team = state[_teamId];

                if (!team) {
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _teamId, _extends({}, team, { scheme_id: schemeId })));
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

    function updateState() {
        var receivedTeams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var currentState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return Object.keys(receivedTeams).forEach(function (teamId) {
            if (receivedTeams[teamId].delete_at > 0 && currentState[teamId]) {
                Reflect.deleteProperty(currentState, teamId);
            }
        });
    }

    switch (action.type) {
        case _action_types.TeamTypes.RECEIVED_MY_TEAM_MEMBER:
            {
                var nextState = _extends({}, state);
                var member = action.data;
                if (member.delete_at === 0) {
                    nextState[member.team_id] = member;
                }
                return nextState;
            }
        case _action_types.TeamTypes.RECEIVED_MY_TEAM_MEMBERS:
            {
                var _nextState = {};
                var members = action.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = members[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var m = _step.value;

                        if (m.delete_at == null || m.delete_at === 0) {
                            var prevMember = state[m.team_id] || { mention_count: 0, msg_count: 0 };
                            _nextState[m.team_id] = _extends({}, prevMember, m);
                        }
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
        case _action_types.TeamTypes.RECEIVED_TEAMS_LIST:
            {
                var _nextState2 = _extends({}, state);
                var receivedTeams = (0, _team_utils.teamListToMap)(action.data);

                return updateState(receivedTeams, _nextState2) || _nextState2;
            }
        case _action_types.TeamTypes.RECEIVED_TEAMS:
            {
                var _nextState3 = _extends({}, state);
                var _receivedTeams = action.data;

                return updateState(_receivedTeams, _nextState3) || _nextState3;
            }
        case _action_types.TeamTypes.RECEIVED_MY_TEAM_UNREADS:
            {
                var _nextState4 = _extends({}, state);
                var unreads = action.data;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = unreads[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var u = _step2.value;

                        var msgCount = u.msg_count < 0 ? 0 : u.msg_count;
                        var mentionCount = u.mention_count < 0 ? 0 : u.mention_count;
                        var _m = _extends({}, state[u.team_id], {
                            mention_count: mentionCount,
                            msg_count: msgCount
                        });
                        _nextState4[u.team_id] = _m;
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

                return _nextState4;
            }
        case _action_types.ChannelTypes.INCREMENT_UNREAD_MSG_COUNT:
            {
                var _action$data2 = action.data,
                    teamId = _action$data2.teamId,
                    amount = _action$data2.amount,
                    onlyMentions = _action$data2.onlyMentions;

                var _member = state[teamId];

                if (!_member) {
                    // Don't keep track of unread posts until we've loaded the actual team member
                    return state;
                }

                if (onlyMentions) {
                    // Incrementing the msg_count marks the team as unread, so don't do that if these posts shouldn't be unread
                    return state;
                }

                return _extends({}, state, _defineProperty({}, teamId, _extends({}, _member, {
                    msg_count: _member.msg_count + amount
                })));
            }
        case _action_types.ChannelTypes.DECREMENT_UNREAD_MSG_COUNT:
            {
                var _action$data3 = action.data,
                    _teamId2 = _action$data3.teamId,
                    _amount = _action$data3.amount;

                var _member2 = state[_teamId2];

                if (!_member2) {
                    // Don't keep track of unread posts until we've loaded the actual team member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _teamId2, _extends({}, _member2, {
                    msg_count: Math.max(_member2.msg_count - _amount, 0)
                })));
            }
        case _action_types.ChannelTypes.INCREMENT_UNREAD_MENTION_COUNT:
            {
                var _action$data4 = action.data,
                    _teamId3 = _action$data4.teamId,
                    _amount2 = _action$data4.amount;

                var _member3 = state[_teamId3];

                if (!_member3) {
                    // Don't keep track of unread posts until we've loaded the actual team member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _teamId3, _extends({}, _member3, {
                    mention_count: _member3.mention_count + _amount2
                })));
            }
        case _action_types.ChannelTypes.DECREMENT_UNREAD_MENTION_COUNT:
            {
                var _action$data5 = action.data,
                    _teamId4 = _action$data5.teamId,
                    _amount3 = _action$data5.amount;

                var _member4 = state[_teamId4];

                if (!_member4) {
                    // Don't keep track of unread posts until we've loaded the actual team member
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _teamId4, _extends({}, _member4, {
                    mention_count: Math.max(_member4.mention_count - _amount3, 0)
                })));
            }
        case _action_types.TeamTypes.LEAVE_TEAM:
        case _action_types.TeamTypes.RECEIVED_TEAM_DELETED:
            {
                var _nextState5 = _extends({}, state);
                var data = action.data;
                Reflect.deleteProperty(_nextState5, data.id);
                return _nextState5;
            }
        case _action_types.TeamTypes.UPDATED_TEAM_MEMBER_SCHEME_ROLES:
            {
                return updateTeamMemberSchemeRoles(state, action);
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function membersInTeam() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.TeamTypes.RECEIVED_MEMBER_IN_TEAM:
            {
                var data = action.data;
                var members = _extends({}, state[data.team_id] || {});
                members[data.user_id] = data;
                return _extends({}, state, _defineProperty({}, data.team_id, members));
            }
        case _action_types.TeamTypes.RECEIVED_TEAM_MEMBERS:
            {
                var _data = action.data;
                if (_data && _data.length) {
                    var nextState = _extends({}, state);
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = _data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var member = _step3.value;

                            if (nextState[member.team_id]) {
                                nextState[member.team_id] = _extends({}, nextState[member.team_id]);
                            } else {
                                nextState[member.team_id] = {};
                            }
                            nextState[member.team_id][member.user_id] = member;
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

                return state;
            }
        case _action_types.TeamTypes.RECEIVED_MEMBERS_IN_TEAM:
            {
                var _data2 = action.data;
                if (_data2 && _data2.length) {
                    var teamId = _data2[0].team_id;
                    var _members = _extends({}, state[teamId] || {});
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = _data2[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _member5 = _step4.value;

                            _members[_member5.user_id] = _member5;
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    return _extends({}, state, _defineProperty({}, teamId, _members));
                }

                return state;
            }
        case _action_types.TeamTypes.REMOVE_MEMBER_FROM_TEAM:
            {
                var _data3 = action.data;
                var _members2 = state[_data3.team_id];
                if (_members2) {
                    var _nextState6 = _extends({}, _members2);
                    Reflect.deleteProperty(_nextState6, _data3.user_id);
                    return _extends({}, state, _defineProperty({}, _data3.team_id, _nextState6));
                }

                return state;
            }
        case _action_types.TeamTypes.RECEIVED_TEAM_DELETED:
            {
                var _nextState7 = _extends({}, state);
                var _teamId5 = action.data.id;
                if (_nextState7.hasOwnProperty(_teamId5)) {
                    Reflect.deleteProperty(_nextState7, _teamId5);
                    return _nextState7;
                }

                return state;
            }
        case _action_types.TeamTypes.UPDATED_TEAM_MEMBER_SCHEME_ROLES:
            {
                return updateTeamMemberSchemeRoles(state, action);
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
        case _action_types.TeamTypes.RECEIVED_TEAM_STATS:
            {
                var stat = action.data;
                return _extends({}, state, _defineProperty({}, stat.team_id, stat));
            }
        case _action_types.TeamTypes.RECEIVED_TEAM_DELETED:
            {
                var nextState = _extends({}, state);
                var teamId = action.data.id;
                if (nextState.hasOwnProperty(teamId)) {
                    Reflect.deleteProperty(nextState, teamId);
                    return nextState;
                }

                return state;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function updateTeamMemberSchemeRoles(state, action) {
    var _action$data6 = action.data,
        teamId = _action$data6.teamId,
        userId = _action$data6.userId,
        isSchemeUser = _action$data6.isSchemeUser,
        isSchemeAdmin = _action$data6.isSchemeAdmin;

    var team = state[teamId];
    if (team) {
        var member = team[userId];
        if (member) {
            return _extends({}, state, _defineProperty({}, teamId, _extends({}, state[teamId], _defineProperty({}, userId, _extends({}, state[teamId][userId], {
                scheme_user: isSchemeUser,
                scheme_admin: isSchemeAdmin
            })))));
        }
    }
    return state;
}

exports.default = (0, _redux.combineReducers)({

    // the current selected team
    currentTeamId: currentTeamId,

    // object where every key is the team id and has and object with the team detail
    teams: teams,

    // object where every key is the team id and has and object with the team members detail
    myMembers: myMembers,

    // object where every key is the team id and has an object of members in the team where the key is user id
    membersInTeam: membersInTeam,

    // object where every key is the team id and has an object with the team stats
    stats: stats
});