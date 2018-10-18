'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getProfilesAndStatusesForMembers = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userIds, dispatch, getState) {
        var _getState$entities$us, currentUserId, profiles, statuses, profilesToLoad, statusesToLoad, requests;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _getState$entities$us = getState().entities.users, currentUserId = _getState$entities$us.currentUserId, profiles = _getState$entities$us.profiles, statuses = _getState$entities$us.statuses;
                        profilesToLoad = [];
                        statusesToLoad = [];


                        userIds.forEach(function (userId) {
                            if (!profiles[userId] && !profilesToLoad.includes(userId) && userId !== currentUserId) {
                                profilesToLoad.push(userId);
                            }

                            if (!statuses[userId] && !statusesToLoad.includes(userId) && userId !== currentUserId) {
                                statusesToLoad.push(userId);
                            }
                        });

                        requests = [];


                        if (profilesToLoad.length) {
                            requests.push((0, _users.getProfilesByIds)(profilesToLoad)(dispatch, getState));
                        }

                        if (statusesToLoad.length) {
                            requests.push((0, _users.getStatusesByIds)(statusesToLoad)(dispatch, getState));
                        }

                        _context.next = 9;
                        return Promise.all(requests);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getProfilesAndStatusesForMembers(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

exports.selectTeam = selectTeam;
exports.getMyTeams = getMyTeams;
exports.getMyTeamUnreads = getMyTeamUnreads;
exports.getTeam = getTeam;
exports.getTeamByName = getTeamByName;
exports.getTeams = getTeams;
exports.searchTeams = searchTeams;
exports.createTeam = createTeam;
exports.deleteTeam = deleteTeam;
exports.updateTeam = updateTeam;
exports.patchTeam = patchTeam;
exports.getMyTeamMembers = getMyTeamMembers;
exports.getTeamMembers = getTeamMembers;
exports.getTeamMember = getTeamMember;
exports.getTeamMembersByIds = getTeamMembersByIds;
exports.getTeamsForUser = getTeamsForUser;
exports.getTeamMembersForUser = getTeamMembersForUser;
exports.getTeamStats = getTeamStats;
exports.addUserToTeam = addUserToTeam;
exports.addUsersToTeam = addUsersToTeam;
exports.removeUserFromTeam = removeUserFromTeam;
exports.updateTeamMemberRoles = updateTeamMemberRoles;
exports.sendEmailInvitesToTeam = sendEmailInvitesToTeam;
exports.checkIfTeamExists = checkIfTeamExists;
exports.joinTeam = joinTeam;
exports.setTeamIcon = setTeamIcon;
exports.removeTeamIcon = removeTeamIcon;
exports.updateTeamScheme = updateTeamScheme;
exports.updateTeamMemberSchemeRoles = updateTeamMemberSchemeRoles;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _constants = require('../constants');

var _action_types = require('../action_types');

var _event_emitter = require('../utils/event_emitter');

var _event_emitter2 = _interopRequireDefault(_event_emitter);

var _errors = require('./errors');

var _helpers = require('./helpers');

var _users = require('./users');

var _roles = require('./roles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function selectTeam(team) {
    var _this = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({
                                type: _action_types.TeamTypes.SELECT_TEAM,
                                data: team.id
                            }, getState);

                            return _context2.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function getMyTeams() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getMyTeams, _action_types.TeamTypes.MY_TEAMS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAMS_LIST, _action_types.TeamTypes.MY_TEAMS_SUCCESS], _action_types.TeamTypes.MY_TEAMS_FAILURE);
}

function getMyTeamUnreads() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getMyTeamUnreads, _action_types.TeamTypes.MY_TEAM_UNREADS_REQUEST, [_action_types.TeamTypes.RECEIVED_MY_TEAM_UNREADS, _action_types.TeamTypes.MY_TEAM_UNREADS_SUCCESS], _action_types.TeamTypes.MY_TEAM_UNREADS_FAILURE);
}

function getTeam(teamId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTeam, _action_types.TeamTypes.GET_TEAM_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAM, _action_types.TeamTypes.GET_TEAM_SUCCESS], _action_types.TeamTypes.GET_TEAM_FAILURE, teamId);
}

function getTeamByName(teamName) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTeamByName, _action_types.TeamTypes.GET_TEAM_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAM, _action_types.TeamTypes.GET_TEAM_SUCCESS], _action_types.TeamTypes.GET_TEAM_FAILURE, teamName);
}

function getTeams() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.TEAMS_CHUNK_SIZE;

    return (0, _helpers.bindClientFunc)(_client.Client4.getTeams, _action_types.TeamTypes.GET_TEAMS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAMS_LIST, _action_types.TeamTypes.GET_TEAMS_SUCCESS], _action_types.TeamTypes.GET_TEAMS_FAILURE, page, perPage);
}

function searchTeams(term) {
    return (0, _helpers.bindClientFunc)(_client.Client4.searchTeams, _action_types.TeamTypes.GET_TEAMS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAMS_LIST, _action_types.TeamTypes.GET_TEAMS_SUCCESS], _action_types.TeamTypes.GET_TEAMS_FAILURE, term);
}

function createTeam(team) {
    var _this2 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var created, member;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.CREATE_TEAM_REQUEST, data: null }, getState);

                            created = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.createTeam(team);

                        case 5:
                            created = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.CREATE_TEAM_FAILURE, error: _context3.t0 }, (0, _errors.logError)(_context3.t0)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:
                            member = {
                                team_id: created.id,
                                user_id: getState().entities.users.currentUserId,
                                roles: _constants.General.TEAM_ADMIN_ROLE + ' ' + _constants.General.TEAM_USER_ROLE,
                                delete_at: 0,
                                msg_count: 0,
                                mention_count: 0
                            };


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.TeamTypes.CREATED_TEAM,
                                data: created
                            }, {
                                type: _action_types.TeamTypes.RECEIVED_MY_TEAM_MEMBER,
                                data: member
                            }, {
                                type: _action_types.TeamTypes.SELECT_TEAM,
                                data: created.id
                            }, {
                                type: _action_types.TeamTypes.CREATE_TEAM_SUCCESS
                            }]), getState);
                            dispatch((0, _roles.loadRolesIfNeeded)(member.roles.split(' ')));

                            return _context3.abrupt('return', { data: created });

                        case 17:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[2, 8]]);
        }));

        return function (_x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function deleteTeam(teamId) {
    var _this3 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var entities, currentTeamId, actions;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.DELETE_TEAM_REQUEST, data: null }, getState);

                            _context4.prev = 1;
                            _context4.next = 4;
                            return _client.Client4.deleteTeam(teamId);

                        case 4:
                            _context4.next = 11;
                            break;

                        case 6:
                            _context4.prev = 6;
                            _context4.t0 = _context4['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.DELETE_TEAM_FAILURE, error: _context4.t0 }, (0, _errors.logError)(_context4.t0)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 11:
                            entities = getState().entities;
                            currentTeamId = entities.teams.currentTeamId;
                            actions = [];

                            if (teamId === currentTeamId) {
                                _event_emitter2.default.emit('leave_team');
                                actions.push({ type: _action_types.ChannelTypes.SELECT_CHANNEL, data: '' });
                            }

                            actions.push({
                                type: _action_types.TeamTypes.RECEIVED_TEAM_DELETED,
                                data: { id: teamId }
                            }, {
                                type: _action_types.TeamTypes.DELETE_TEAM_SUCCESS
                            });

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context4.abrupt('return', { data: true });

                        case 18:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[1, 6]]);
        }));

        return function (_x10, _x11) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function updateTeam(team) {
    return (0, _helpers.bindClientFunc)(_client.Client4.updateTeam, _action_types.TeamTypes.UPDATE_TEAM_REQUEST, [_action_types.TeamTypes.UPDATED_TEAM, _action_types.TeamTypes.UPDATE_TEAM_SUCCESS], _action_types.TeamTypes.UPDATE_TEAM_FAILURE, team);
}

function patchTeam(team) {
    return (0, _helpers.bindClientFunc)(_client.Client4.patchTeam, _action_types.TeamTypes.PATCH_TEAM_REQUEST, [_action_types.TeamTypes.PATCHED_TEAM, _action_types.TeamTypes.PATCH_TEAM_SUCCESS], _action_types.TeamTypes.PATCH_TEAM_FAILURE, team);
}

function getMyTeamMembers() {
    var _this4 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var getMyTeamMembersFunc, teamMembers, roles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, teamMember, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, role;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            getMyTeamMembersFunc = (0, _helpers.bindClientFunc)(_client.Client4.getMyTeamMembers, _action_types.TeamTypes.MY_TEAM_MEMBERS_REQUEST, [_action_types.TeamTypes.RECEIVED_MY_TEAM_MEMBERS, _action_types.TeamTypes.MY_TEAM_MEMBERS_SUCCESS], _action_types.TeamTypes.MY_TEAM_MEMBERS_FAILURE);
                            _context5.next = 3;
                            return getMyTeamMembersFunc(dispatch, getState);

                        case 3:
                            teamMembers = _context5.sent;

                            if (!teamMembers.data) {
                                _context5.next = 50;
                                break;
                            }

                            roles = new Set();
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context5.prev = 9;
                            _iterator = teamMembers.data[Symbol.iterator]();

                        case 11:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context5.next = 35;
                                break;
                            }

                            teamMember = _step.value;
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context5.prev = 16;

                            for (_iterator2 = teamMember.roles.split(' ')[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                role = _step2.value;

                                roles.add(role);
                            }
                            _context5.next = 24;
                            break;

                        case 20:
                            _context5.prev = 20;
                            _context5.t0 = _context5['catch'](16);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context5.t0;

                        case 24:
                            _context5.prev = 24;
                            _context5.prev = 25;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 27:
                            _context5.prev = 27;

                            if (!_didIteratorError2) {
                                _context5.next = 30;
                                break;
                            }

                            throw _iteratorError2;

                        case 30:
                            return _context5.finish(27);

                        case 31:
                            return _context5.finish(24);

                        case 32:
                            _iteratorNormalCompletion = true;
                            _context5.next = 11;
                            break;

                        case 35:
                            _context5.next = 41;
                            break;

                        case 37:
                            _context5.prev = 37;
                            _context5.t1 = _context5['catch'](9);
                            _didIteratorError = true;
                            _iteratorError = _context5.t1;

                        case 41:
                            _context5.prev = 41;
                            _context5.prev = 42;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 44:
                            _context5.prev = 44;

                            if (!_didIteratorError) {
                                _context5.next = 47;
                                break;
                            }

                            throw _iteratorError;

                        case 47:
                            return _context5.finish(44);

                        case 48:
                            return _context5.finish(41);

                        case 49:
                            if (roles.size > 0) {
                                dispatch((0, _roles.loadRolesIfNeeded)([].concat(_toConsumableArray(roles))));
                            }

                        case 50:
                            return _context5.abrupt('return', teamMembers);

                        case 51:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this4, [[9, 37, 41, 49], [16, 20, 24, 32], [25,, 27, 31], [42,, 44, 48]]);
        }));

        return function (_x12, _x13) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function getTeamMembers(teamId) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.TEAMS_CHUNK_SIZE;

    return (0, _helpers.bindClientFunc)(_client.Client4.getTeamMembers, _action_types.TeamTypes.GET_TEAM_MEMBERS_REQUEST, [_action_types.TeamTypes.RECEIVED_MEMBERS_IN_TEAM, _action_types.TeamTypes.GET_TEAM_MEMBERS_SUCCESS], _action_types.TeamTypes.GET_TEAM_MEMBERS_FAILURE, teamId, page, perPage);
}

function getTeamMember(teamId, userId) {
    var _this5 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            var member, memberRequest;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.TEAM_MEMBERS_REQUEST, data: null }, getState);

                            member = void 0;
                            _context6.prev = 2;
                            memberRequest = _client.Client4.getTeamMember(teamId, userId);


                            getProfilesAndStatusesForMembers([userId], dispatch, getState);

                            _context6.next = 7;
                            return memberRequest;

                        case 7:
                            member = _context6.sent;
                            _context6.next = 15;
                            break;

                        case 10:
                            _context6.prev = 10;
                            _context6.t0 = _context6['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context6.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.TEAM_MEMBERS_FAILURE, error: _context6.t0 }, (0, _errors.logError)(_context6.t0)]), getState);
                            return _context6.abrupt('return', { error: _context6.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.TeamTypes.RECEIVED_MEMBERS_IN_TEAM,
                                data: [member]
                            }, {
                                type: _action_types.TeamTypes.TEAM_MEMBERS_SUCCESS
                            }]), getState);

                            return _context6.abrupt('return', { data: member });

                        case 17:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this5, [[2, 10]]);
        }));

        return function (_x16, _x17) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function getTeamMembersByIds(teamId, userIds) {
    var _this6 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            var members, membersRequest;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.TEAM_MEMBERS_REQUEST, data: null }, getState);

                            members = void 0;
                            _context7.prev = 2;
                            membersRequest = _client.Client4.getTeamMembersByIds(teamId, userIds);


                            getProfilesAndStatusesForMembers(userIds, dispatch, getState);

                            _context7.next = 7;
                            return membersRequest;

                        case 7:
                            members = _context7.sent;
                            _context7.next = 15;
                            break;

                        case 10:
                            _context7.prev = 10;
                            _context7.t0 = _context7['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context7.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.TEAM_MEMBERS_FAILURE, error: _context7.t0 }, (0, _errors.logError)(_context7.t0)]), getState);
                            return _context7.abrupt('return', { error: _context7.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.TeamTypes.RECEIVED_MEMBERS_IN_TEAM,
                                data: members
                            }, {
                                type: _action_types.TeamTypes.TEAM_MEMBERS_SUCCESS
                            }]), getState);

                            return _context7.abrupt('return', { data: members });

                        case 17:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this6, [[2, 10]]);
        }));

        return function (_x18, _x19) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function getTeamsForUser(userId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTeamsForUser, _action_types.TeamTypes.GET_TEAMS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAMS_LIST, _action_types.TeamTypes.GET_TEAMS_SUCCESS], _action_types.TeamTypes.GET_TEAMS_FAILURE, userId);
}

function getTeamMembersForUser(userId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTeamMembersForUser, _action_types.TeamTypes.TEAM_MEMBERS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAM_MEMBERS, _action_types.TeamTypes.TEAM_MEMBERS_SUCCESS], _action_types.TeamTypes.TEAM_MEMBERS_FAILURE, userId);
}

function getTeamStats(teamId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTeamStats, _action_types.TeamTypes.TEAM_STATS_REQUEST, [_action_types.TeamTypes.RECEIVED_TEAM_STATS, _action_types.TeamTypes.TEAM_STATS_SUCCESS], _action_types.TeamTypes.TEAM_STATS_FAILURE, teamId);
}

function addUserToTeam(teamId, userId) {
    var _this7 = this;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            var member;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.ADD_TEAM_MEMBER_REQUEST, data: null }, getState);

                            member = void 0;
                            _context8.prev = 2;
                            _context8.next = 5;
                            return _client.Client4.addToTeam(teamId, userId);

                        case 5:
                            member = _context8.sent;
                            _context8.next = 13;
                            break;

                        case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context8.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.ADD_TEAM_MEMBER_FAILURE, error: _context8.t0 }, (0, _errors.logError)(_context8.t0)]), getState);
                            return _context8.abrupt('return', { error: _context8.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILE_IN_TEAM,
                                data: { id: teamId, user_id: userId }
                            }, {
                                type: _action_types.TeamTypes.RECEIVED_MEMBER_IN_TEAM,
                                data: member
                            }, {
                                type: _action_types.TeamTypes.ADD_TEAM_MEMBER_SUCCESS
                            }]), getState);

                            return _context8.abrupt('return', { data: member });

                        case 15:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this7, [[2, 8]]);
        }));

        return function (_x20, _x21) {
            return _ref8.apply(this, arguments);
        };
    }();
}

function addUsersToTeam(teamId, userIds) {
    var _this8 = this;

    return function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(dispatch, getState) {
            var members, profiles;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.ADD_TEAM_MEMBER_REQUEST, data: null }, getState);

                            members = void 0;
                            _context9.prev = 2;
                            _context9.next = 5;
                            return _client.Client4.addUsersToTeam(teamId, userIds);

                        case 5:
                            members = _context9.sent;
                            _context9.next = 13;
                            break;

                        case 8:
                            _context9.prev = 8;
                            _context9.t0 = _context9['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context9.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.ADD_TEAM_MEMBER_FAILURE, error: _context9.t0 }, (0, _errors.logError)(_context9.t0)]), getState);
                            return _context9.abrupt('return', { error: _context9.t0 });

                        case 13:
                            profiles = [];

                            members.forEach(function (m) {
                                return profiles.push({ id: m.user_id });
                            });

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_TEAM,
                                data: profiles,
                                id: teamId
                            }, {
                                type: _action_types.TeamTypes.RECEIVED_MEMBERS_IN_TEAM,
                                data: members
                            }, {
                                type: _action_types.TeamTypes.ADD_TEAM_MEMBER_SUCCESS
                            }]), getState);

                            return _context9.abrupt('return', { data: members });

                        case 17:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this8, [[2, 8]]);
        }));

        return function (_x22, _x23) {
            return _ref9.apply(this, arguments);
        };
    }();
}

function removeUserFromTeam(teamId, userId) {
    var _this9 = this;

    return function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(dispatch, getState) {
            var member, actions, state, currentUserId, _state$entities$chann, channels, myMembers, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, channelMember, channel;

            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.REMOVE_TEAM_MEMBER_REQUEST, data: null }, getState);

                            _context10.prev = 1;
                            _context10.next = 4;
                            return _client.Client4.removeFromTeam(teamId, userId);

                        case 4:
                            _context10.next = 11;
                            break;

                        case 6:
                            _context10.prev = 6;
                            _context10.t0 = _context10['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context10.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.REMOVE_TEAM_MEMBER_FAILURE, error: _context10.t0 }, (0, _errors.logError)(_context10.t0)]), getState);
                            return _context10.abrupt('return', { error: _context10.t0 });

                        case 11:
                            member = {
                                team_id: teamId,
                                user_id: userId
                            };
                            actions = [{
                                type: _action_types.UserTypes.RECEIVED_PROFILE_NOT_IN_TEAM,
                                data: { id: teamId, user_id: userId }
                            }, {
                                type: _action_types.TeamTypes.REMOVE_MEMBER_FROM_TEAM,
                                data: member
                            }, {
                                type: _action_types.TeamTypes.REMOVE_TEAM_MEMBER_SUCCESS
                            }];
                            state = getState();
                            currentUserId = state.entities.users.currentUserId;

                            if (!(currentUserId === userId)) {
                                _context10.next = 36;
                                break;
                            }

                            _state$entities$chann = state.entities.channels, channels = _state$entities$chann.channels, myMembers = _state$entities$chann.myMembers;
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context10.prev = 20;


                            for (_iterator3 = Object.values(myMembers)[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                channelMember = _step3.value;

                                // https://github.com/facebook/flow/issues/2221
                                // $FlowFixMe - Object.values currently does not have good flow support
                                channel = channels[channelMember.channel_id];

                                if (channel && channel.team_id === teamId) {
                                    actions.push({
                                        type: _action_types.ChannelTypes.LEAVE_CHANNEL,
                                        data: channel
                                    });
                                }
                            }
                            _context10.next = 28;
                            break;

                        case 24:
                            _context10.prev = 24;
                            _context10.t1 = _context10['catch'](20);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context10.t1;

                        case 28:
                            _context10.prev = 28;
                            _context10.prev = 29;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 31:
                            _context10.prev = 31;

                            if (!_didIteratorError3) {
                                _context10.next = 34;
                                break;
                            }

                            throw _iteratorError3;

                        case 34:
                            return _context10.finish(31);

                        case 35:
                            return _context10.finish(28);

                        case 36:

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context10.abrupt('return', { data: true });

                        case 38:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this9, [[1, 6], [20, 24, 28, 36], [29,, 31, 35]]);
        }));

        return function (_x24, _x25) {
            return _ref10.apply(this, arguments);
        };
    }();
}

function updateTeamMemberRoles(teamId, userId, roles) {
    var _this10 = this;

    return function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(dispatch, getState) {
            var actions, membersInTeam;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.UPDATE_TEAM_MEMBER_REQUEST, data: null }, getState);

                            _context11.prev = 1;
                            _context11.next = 4;
                            return _client.Client4.updateTeamMemberRoles(teamId, userId, roles);

                        case 4:
                            _context11.next = 11;
                            break;

                        case 6:
                            _context11.prev = 6;
                            _context11.t0 = _context11['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context11.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.UPDATE_TEAM_MEMBER_FAILURE, error: _context11.t0 }, (0, _errors.logError)(_context11.t0)]), getState);
                            return _context11.abrupt('return', { error: _context11.t0 });

                        case 11:
                            actions = [{
                                type: _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SUCCESS
                            }];
                            membersInTeam = getState().entities.teams.membersInTeam[teamId];

                            if (membersInTeam && membersInTeam[userId]) {
                                actions.push({
                                    type: _action_types.TeamTypes.RECEIVED_MEMBER_IN_TEAM,
                                    data: _extends({}, membersInTeam[userId], { roles: roles })
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context11.abrupt('return', { data: true });

                        case 16:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this10, [[1, 6]]);
        }));

        return function (_x26, _x27) {
            return _ref11.apply(this, arguments);
        };
    }();
}

function sendEmailInvitesToTeam(teamId, emails) {
    return (0, _helpers.bindClientFunc)(_client.Client4.sendEmailInvitesToTeam, _action_types.TeamTypes.TEAM_EMAIL_INVITE_REQUEST, [_action_types.TeamTypes.TEAM_EMAIL_INVITE_SUCCESS], _action_types.TeamTypes.TEAM_EMAIL_INVITE_FAILURE, teamId, emails);
}

function checkIfTeamExists(teamName) {
    var _this11 = this;

    return function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.GET_TEAM_REQUEST, data: null }, getState);

                            data = void 0;
                            _context12.prev = 2;
                            _context12.next = 5;
                            return _client.Client4.checkIfTeamExists(teamName);

                        case 5:
                            data = _context12.sent;
                            _context12.next = 13;
                            break;

                        case 8:
                            _context12.prev = 8;
                            _context12.t0 = _context12['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context12.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.GET_TEAM_FAILURE, error: _context12.t0 }, (0, _errors.logError)(_context12.t0)]));
                            return _context12.abrupt('return', { error: _context12.t0 });

                        case 13:

                            dispatch({ type: _action_types.TeamTypes.GET_TEAM_SUCCESS, data: null });

                            return _context12.abrupt('return', { data: data.exists });

                        case 15:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this11, [[2, 8]]);
        }));

        return function (_x28, _x29) {
            return _ref12.apply(this, arguments);
        };
    }();
}

function joinTeam(inviteId, teamId) {
    var _this12 = this;

    return function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            dispatch({ type: _action_types.TeamTypes.JOIN_TEAM_REQUEST, data: null }, getState);

                            _context13.prev = 1;
                            _context13.next = 4;
                            return _client.Client4.joinTeam(inviteId);

                        case 4:
                            _context13.next = 11;
                            break;

                        case 6:
                            _context13.prev = 6;
                            _context13.t0 = _context13['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context13.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.TeamTypes.JOIN_TEAM_FAILURE, error: _context13.t0 }, (0, _errors.logError)(_context13.t0)]), getState);
                            return _context13.abrupt('return', { error: _context13.t0 });

                        case 11:

                            getMyTeamUnreads()(dispatch, getState);

                            _context13.next = 14;
                            return Promise.all([getTeam(teamId)(dispatch, getState), getMyTeamMembers()(dispatch, getState)]);

                        case 14:

                            dispatch({ type: _action_types.TeamTypes.JOIN_TEAM_SUCCESS, data: null }, getState);
                            return _context13.abrupt('return', { data: true });

                        case 16:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this12, [[1, 6]]);
        }));

        return function (_x30, _x31) {
            return _ref13.apply(this, arguments);
        };
    }();
}

function setTeamIcon(teamId, imageData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.setTeamIcon, _action_types.TeamTypes.SET_TEAM_ICON_REQUEST, _action_types.TeamTypes.SET_TEAM_ICON_SUCCESS, _action_types.TeamTypes.SET_TEAM_ICON_FAILURE, teamId, imageData);
}

function removeTeamIcon(teamId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.removeTeamIcon, _action_types.TeamTypes.REMOVE_TEAM_ICON_REQUEST, _action_types.TeamTypes.REMOVE_TEAM_ICON_SUCCESS, _action_types.TeamTypes.REMOVE_TEAM_ICON_FAILURE, teamId);
}

function updateTeamScheme(teamId, schemeId) {
    var _this13 = this;

    return (0, _helpers.bindClientFunc)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        _context14.next = 2;
                        return _client.Client4.updateTeamScheme(teamId, schemeId);

                    case 2:
                        return _context14.abrupt('return', { teamId: teamId, schemeId: schemeId });

                    case 3:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, _this13);
    })), _action_types.TeamTypes.UPDATE_TEAM_SCHEME_REQUEST, [_action_types.TeamTypes.UPDATE_TEAM_SCHEME_SUCCESS, _action_types.TeamTypes.UPDATED_TEAM_SCHEME], _action_types.TeamTypes.UPDATE_TEAM_SCHEME_FAILURE);
}

function updateTeamMemberSchemeRoles(teamId, userId, isSchemeUser, isSchemeAdmin) {
    var _this14 = this;

    return (0, _helpers.bindClientFunc)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.next = 2;
                        return _client.Client4.updateTeamMemberSchemeRoles(teamId, userId, isSchemeUser, isSchemeAdmin);

                    case 2:
                        return _context15.abrupt('return', { teamId: teamId, userId: userId, isSchemeUser: isSchemeUser, isSchemeAdmin: isSchemeAdmin });

                    case 3:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, _this14);
    })), _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_REQUEST, [_action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_SUCCESS, _action_types.TeamTypes.UPDATED_TEAM_MEMBER_SCHEME_ROLES], _action_types.TeamTypes.UPDATE_TEAM_MEMBER_SCHEME_ROLES_FAILURE);
}