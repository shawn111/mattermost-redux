'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var handleReconnect = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
        var _this3 = this;

        var entities, currentTeamId, currentChannelId, currentUserId, myTeamMembers, newMsg, _getState$entities$ch, channels, myMembers, defaultChannel;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        entities = getState().entities;
                        currentTeamId = entities.teams.currentTeamId;
                        currentChannelId = entities.channels.currentChannelId;
                        currentUserId = entities.users.currentUserId;


                        (0, _general.getLicenseConfig)()(dispatch, getState);
                        (0, _general.getClientConfig)()(dispatch, getState);
                        (0, _preferences.getMyPreferences)()(dispatch, getState);

                        if (!currentTeamId) {
                            _context4.next = 24;
                            break;
                        }

                        (0, _teams.getMyTeams)()(dispatch, getState);
                        (0, _teams.getMyTeamMembers)()(dispatch, getState);
                        (0, _teams.getMyTeamUnreads)()(dispatch, getState).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.next = 2;
                                            return (0, _channels.fetchMyChannelsAndMembers)(currentTeamId)(dispatch, getState);

                                        case 2:
                                            if (currentChannelId) {
                                                (0, _channels.markChannelAsRead)(currentChannelId)(dispatch, getState);
                                            }

                                        case 3:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, _this3);
                        })));
                        (0, _users.loadProfilesForDirect)()(dispatch, getState);
                        (0, _teams.getTeams)()(dispatch, getState);

                        myTeamMembers = getState().entities.teams.myMembers;

                        if (myTeamMembers[currentTeamId]) {
                            _context4.next = 18;
                            break;
                        }

                        // If the user is no longer a member of this team when reconnecting
                        newMsg = {
                            data: {
                                user_id: currentUserId,
                                team_id: currentTeamId
                            }
                        };

                        handleLeaveTeamEvent(newMsg, dispatch, getState);
                        return _context4.abrupt('return', dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_SUCCESS }, getState));

                    case 18:
                        _getState$entities$ch = getState().entities.channels, channels = _getState$entities$ch.channels, myMembers = _getState$entities$ch.myMembers;

                        if (myMembers[currentChannelId]) {
                            _context4.next = 23;
                            break;
                        }

                        // in case the user is not a member of the channel when reconnecting
                        defaultChannel = Object.values(channels).find(function (c) {
                            return c.team_id === currentTeamId && c.name === _constants.General.DEFAULT_CHANNEL;
                        });

                        // emit the event so the client can change his own state

                        if (defaultChannel) {
                            _event_emitter2.default.emit(_constants.General.DEFAULT_CHANNEL, defaultChannel.display_name);
                            (0, _channels.selectChannel)(defaultChannel.id)(dispatch, getState);
                        }
                        return _context4.abrupt('return', dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_SUCCESS }, getState));

                    case 23:

                        if (currentChannelId) {
                            loadPostsHelper(currentChannelId, dispatch, getState);
                        }

                    case 24:
                        return _context4.abrupt('return', dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_SUCCESS }, getState));

                    case 25:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function handleReconnect(_x7, _x8) {
        return _ref3.apply(this, arguments);
    };
}();

var handleNewPostEvent = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(msg, dispatch, getState) {
        var state, currentChannelId, users, posts, post, userId, currentUserId, status, data, rootUserId, rootStatus, actions, otherUserId, markAsRead, markAsReadOnServer;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        state = getState();
                        currentChannelId = state.entities.channels.currentChannelId;
                        users = state.entities.users;
                        posts = state.entities.posts.posts;
                        post = JSON.parse(msg.data.post);
                        userId = post.user_id;
                        currentUserId = users.currentUserId;
                        status = users.statuses[userId];


                        (0, _posts2.getProfilesAndStatusesForPosts)([post], dispatch, getState);

                        // getProfilesAndStatusesForPosts only gets the status if it doesn't exist, but we
                        // also want it if the user does not appear to be online
                        if (userId !== currentUserId && status && status !== _constants.General.ONLINE) {
                            (0, _users.getStatusesByIds)([userId])(dispatch, getState);
                        }

                        _context5.t0 = post.type;
                        _context5.next = _context5.t0 === _constants.Posts.POST_TYPES.HEADER_CHANGE ? 13 : _context5.t0 === _constants.Posts.POST_TYPES.PURPOSE_CHANGE ? 15 : 17;
                        break;

                    case 13:
                        (0, _channels.updateChannelHeader)(post.channel_id, post.props.new_header)(dispatch, getState);
                        return _context5.abrupt('break', 17);

                    case 15:
                        (0, _channels.updateChannelPurpose)(post.channel_id, post.props.new_purpose)(dispatch, getState);
                        return _context5.abrupt('break', 17);

                    case 17:
                        if (!(post.root_id && !posts[post.root_id])) {
                            _context5.next = 29;
                            break;
                        }

                        data = void 0;
                        _context5.prev = 19;
                        _context5.next = 22;
                        return _client.Client4.getPostThread(post.root_id);

                    case 22:
                        data = _context5.sent;
                        _context5.next = 28;
                        break;

                    case 25:
                        _context5.prev = 25;
                        _context5.t1 = _context5['catch'](19);

                        console.warn('failed to get thread for new post event', _context5.t1); // eslint-disable-line no-console

                    case 28:

                        if (data) {
                            rootUserId = data.posts[post.root_id].user_id;
                            rootStatus = users.statuses[rootUserId];

                            if (!users.profiles[rootUserId] && rootUserId !== currentUserId) {
                                (0, _users.getProfilesByIds)([rootUserId])(dispatch, getState);
                            }

                            if (rootStatus !== _constants.General.ONLINE) {
                                (0, _users.getStatusesByIds)([rootUserId])(dispatch, getState);
                            }

                            dispatch({
                                type: _action_types.PostTypes.RECEIVED_POSTS,
                                data: data,
                                channelId: post.channel_id
                            }, getState);
                        }

                    case 29:
                        actions = [{
                            type: _constants.WebsocketEvents.STOP_TYPING,
                            data: {
                                id: post.channel_id + post.root_id,
                                userId: post.user_id
                            }
                        }];


                        if (!posts[post.id]) {
                            if (msg.data.channel_type === _constants.General.DM_CHANNEL) {
                                otherUserId = (0, _channel_utils.getUserIdFromChannelName)(currentUserId, msg.data.channel_name);

                                (0, _preferences.makeDirectChannelVisibleIfNecessary)(otherUserId)(dispatch, getState);
                            } else if (msg.data.channel_type === _constants.General.GM_CHANNEL) {
                                (0, _preferences.makeGroupMessageVisibleIfNecessary)(post.channel_id)(dispatch, getState);
                            }

                            actions.push({
                                type: _action_types.PostTypes.RECEIVED_POSTS,
                                data: {
                                    order: [],
                                    posts: _defineProperty({}, post.id, post)
                                },
                                channelId: post.channel_id
                            });
                        }

                        dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                        if (!(0, _post_utils.shouldIgnorePost)(post)) {
                            _context5.next = 34;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 34:
                        markAsRead = false;
                        markAsReadOnServer = false;

                        if (userId === currentUserId && !(0, _post_utils.isSystemMessage)(post) && !(0, _post_utils.isFromWebhook)(post)) {
                            // In case the current user posted the message and that message wasn't triggered by a system message
                            markAsRead = true;
                            markAsReadOnServer = false;
                        } else if (post.channel_id === currentChannelId) {
                            // if the post is for the channel that the user is currently viewing we'll mark the channel as read
                            markAsRead = true;
                            markAsReadOnServer = true;
                        }

                        if (markAsRead) {
                            (0, _channels.markChannelAsRead)(post.channel_id, null, markAsReadOnServer)(dispatch, getState);
                            (0, _channels.markChannelAsViewed)(post.channel_id)(dispatch, getState);
                        } else {
                            (0, _channels.markChannelAsUnread)(msg.data.team_id, post.channel_id, msg.data.mentions)(dispatch, getState);
                        }

                    case 38:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[19, 25]]);
    }));

    return function handleNewPostEvent(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

var handleTeamAddedEvent = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(msg, dispatch, getState) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return Promise.all([(0, _teams.getTeam)(msg.data.team_id)(dispatch, getState), (0, _teams.getMyTeamUnreads)()(dispatch, getState)]);

                    case 2:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function handleTeamAddedEvent(_x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
    };
}();

exports.init = init;
exports.close = close;
exports.userTyping = userTyping;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _websocket_client = require('../client/websocket_client');

var _websocket_client2 = _interopRequireDefault(_websocket_client);

var _users = require('./users');

var _channels = require('./channels');

var _posts2 = require('./posts');

var _preferences = require('./preferences');

var _general = require('./general');

var _teams = require('./teams');

var _action_types = require('../action_types');

var _constants = require('../constants');

var _channels2 = require('../selectors/entities/channels');

var _users2 = require('../selectors/entities/users');

var _channel_utils = require('../utils/channel_utils');

var _post_utils = require('../utils/post_utils');

var _event_emitter = require('../utils/event_emitter');

var _event_emitter2 = _interopRequireDefault(_event_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function init(platform, siteUrl, token, optionalWebSocket) {
    var _this = this;

    var additionalOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var config, connUrl, authToken, websocketOpts;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            config = getState().entities.general.config;
                            connUrl = siteUrl || config.WebsocketURL || _client.Client4.getUrl();
                            authToken = token || _client.Client4.getToken();

                            // replace the protocol with a websocket one

                            if (platform !== 'ios' && platform !== 'android') {
                                if (connUrl.startsWith('https:')) {
                                    connUrl = connUrl.replace(/^https:/, 'wss:');
                                } else {
                                    connUrl = connUrl.replace(/^http:/, 'ws:');
                                }

                                // append a port number if one isn't already specified
                                if (!/:\d+$/.test(connUrl)) {
                                    if (connUrl.startsWith('wss:')) {
                                        connUrl += ':' + (config.WebsocketSecurePort || 443);
                                    } else {
                                        connUrl += ':' + (config.WebsocketPort || 80);
                                    }
                                }
                            }

                            connUrl += _client.Client4.getUrlVersion() + '/websocket';
                            _websocket_client2.default.setFirstConnectCallback(handleFirstConnect);
                            _websocket_client2.default.setEventCallback(handleEvent);
                            _websocket_client2.default.setReconnectCallback(handleReconnect);
                            _websocket_client2.default.setCloseCallback(handleClose);
                            _websocket_client2.default.setConnectingCallback(handleConnecting);

                            websocketOpts = _extends({
                                connectionUrl: connUrl,
                                platform: platform
                            }, additionalOptions);


                            if (optionalWebSocket) {
                                websocketOpts.webSocketConnector = optionalWebSocket;
                            }

                            return _context.abrupt('return', _websocket_client2.default.initialize(authToken, dispatch, getState, websocketOpts));

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
}

var reconnect = false;
function close() {
    var _this2 = this;

    var shouldReconnect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            reconnect = shouldReconnect;
                            _websocket_client2.default.close(true);
                            if (dispatch) {
                                dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_CLOSED }, getState);
                            }

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function handleConnecting(dispatch, getState) {
    dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_REQUEST }, getState);
}

function handleFirstConnect(dispatch, getState) {
    dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_SUCCESS }, getState);
    if (reconnect) {
        reconnect = false;

        handleReconnect(dispatch, getState).catch(function () {}); //eslint-disable-line no-empty-function
    }
}

function handleClose(connectFailCount, dispatch, getState) {
    dispatch({ type: _action_types.GeneralTypes.WEBSOCKET_FAILURE, error: connectFailCount }, getState);
}

function handleEvent(msg, dispatch, getState) {
    switch (msg.event) {
        case _constants.WebsocketEvents.POSTED:
        case _constants.WebsocketEvents.EPHEMERAL_MESSAGE:
            handleNewPostEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.POST_EDITED:
            handlePostEdited(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.POST_DELETED:
            handlePostDeleted(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.LEAVE_TEAM:
            handleLeaveTeamEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.UPDATE_TEAM:
            handleUpdateTeamEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.PATCH_TEAM:
            handlePatchTeamEvent(msg, dispatch, getState);
            break;

        case _constants.WebsocketEvents.ADDED_TO_TEAM:
            handleTeamAddedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.USER_ADDED:
            handleUserAddedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.USER_REMOVED:
            handleUserRemovedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.USER_UPDATED:
            handleUserUpdatedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.ROLE_ADDED:
            handleRoleAddedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.ROLE_REMOVED:
            handleRoleRemovedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.ROLE_UPDATED:
            handleRoleUpdatedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_CREATED:
            handleChannelCreatedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_DELETED:
            handleChannelDeletedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_UPDATED:
            handleChannelUpdatedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_CONVERTED:
            handleChannelConvertedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_VIEWED:
            handleChannelViewedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CHANNEL_MEMBER_UPDATED:
            handleChannelMemberUpdatedEvent(msg, dispatch);
            break;
        case _constants.WebsocketEvents.DIRECT_ADDED:
            handleDirectAddedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.PREFERENCE_CHANGED:
            handlePreferenceChangedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.PREFERENCES_CHANGED:
            handlePreferencesChangedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.PREFERENCES_DELETED:
            handlePreferencesDeletedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.STATUS_CHANGED:
            handleStatusChangedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.TYPING:
            handleUserTypingEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.HELLO:
            handleHelloEvent(msg);
            break;
        case _constants.WebsocketEvents.REACTION_ADDED:
            handleReactionAddedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.REACTION_REMOVED:
            handleReactionRemovedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.EMOJI_ADDED:
            handleAddEmoji(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.LICENSE_CHANGED:
            handleLicenseChangedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.CONFIG_CHANGED:
            handleConfigChangedEvent(msg, dispatch, getState);
            break;
        case _constants.WebsocketEvents.PLUGIN_STATUSES_CHANGED:
            handlePluginStatusesChangedEvent(msg, dispatch, getState);
            break;
    }
}

function handlePostEdited(msg, dispatch, getState) {
    var data = JSON.parse(msg.data.post);

    (0, _posts2.getProfilesAndStatusesForPosts)([data], dispatch, getState);

    dispatch({ type: _action_types.PostTypes.RECEIVED_POST, data: data }, getState);
}

function handlePostDeleted(msg, dispatch, getState) {
    var data = JSON.parse(msg.data.post);
    dispatch({ type: _action_types.PostTypes.POST_DELETED, data: data }, getState);
}

function handleLeaveTeamEvent(msg, dispatch, getState) {
    var entities = getState().entities;
    var _entities$teams = entities.teams,
        currentTeamId = _entities$teams.currentTeamId,
        teams = _entities$teams.teams;
    var currentUserId = entities.users.currentUserId;


    if (currentUserId === msg.data.user_id) {
        dispatch({ type: _action_types.TeamTypes.LEAVE_TEAM, data: teams[msg.data.team_id] }, getState);

        // if they are on the team being removed deselect the current team and channel
        if (currentTeamId === msg.data.team_id) {
            _event_emitter2.default.emit('leave_team');
        }
    }
}

function handleUpdateTeamEvent(msg, dispatch, getState) {
    dispatch({ type: _action_types.TeamTypes.UPDATED_TEAM, data: JSON.parse(msg.data.team) }, getState);
}

function handlePatchTeamEvent(msg, dispatch, getState) {
    dispatch({ type: _action_types.TeamTypes.PATCHED_TEAM, data: JSON.parse(msg.data.team) }, getState);
}

function handleUserAddedEvent(msg, dispatch, getState) {
    var state = getState();
    var currentChannelId = state.entities.channels.currentChannelId;
    var currentTeamId = state.entities.teams.currentTeamId;
    var currentUserId = state.entities.users.currentUserId;

    var teamId = msg.data.team_id;

    if (msg.broadcast.channel_id === currentChannelId) {
        (0, _channels.getChannelStats)(teamId, currentChannelId)(dispatch, getState);
    }

    if (teamId === currentTeamId && msg.data.user_id === currentUserId) {
        (0, _channels.getChannelAndMyMember)(msg.broadcast.channel_id)(dispatch, getState);
    }
}

function handleUserRemovedEvent(msg, dispatch, getState) {
    var state = getState();
    var _state$entities$chann = state.entities.channels,
        channels = _state$entities$chann.channels,
        currentChannelId = _state$entities$chann.currentChannelId;
    var currentTeamId = state.entities.teams.currentTeamId;
    var currentUserId = state.entities.users.currentUserId;


    if (msg.broadcast.user_id === currentUserId && currentTeamId) {
        (0, _channels.fetchMyChannelsAndMembers)(currentTeamId)(dispatch, getState);
        var channel = channels[currentChannelId] || {};
        dispatch({
            type: _action_types.ChannelTypes.LEAVE_CHANNEL,
            data: {
                id: msg.data.channel_id,
                user_id: currentUserId,
                team_id: channel.team_id,
                type: channel.type
            }
        }, getState);

        if (msg.data.channel_id === currentChannelId) {
            var defaultChannel = Object.values(channels).find(function (c) {
                return c.team_id === currentTeamId && c.name === _constants.General.DEFAULT_CHANNEL;
            });

            // emit the event so the client can change his own state
            _event_emitter2.default.emit(_constants.General.DEFAULT_CHANNEL, defaultChannel.display_name);
            (0, _channels.selectChannel)(defaultChannel.id)(dispatch, getState);
        }
    } else if (msg.data.channel_id === currentChannelId) {
        (0, _channels.getChannelStats)(currentTeamId, currentChannelId)(dispatch, getState);
    }
}

function handleUserUpdatedEvent(msg, dispatch, getState) {
    var currentUser = (0, _users2.getCurrentUser)(getState());
    var user = msg.data.user;

    if (user.id === currentUser.id) {
        if (user.update_at > currentUser.update_at) {
            // Need to request me to make sure we don't override with sanitized fields from the
            // websocket event
            dispatch((0, _users.getMe)());
        }
    } else {
        dispatch({
            type: _action_types.UserTypes.RECEIVED_PROFILES,
            data: _defineProperty({}, user.id, user)
        }, getState);
    }
}

function handleRoleAddedEvent(msg, dispatch) {
    var role = JSON.parse(msg.data.role);

    dispatch({
        type: _action_types.RoleTypes.RECEIVED_ROLE,
        data: role
    });
}

function handleRoleRemovedEvent(msg, dispatch) {
    var role = JSON.parse(msg.data.role);

    dispatch({
        type: _action_types.RoleTypes.ROLE_DELETED,
        data: role
    });
}

function handleRoleUpdatedEvent(msg, dispatch) {
    var role = JSON.parse(msg.data.role);

    dispatch({
        type: _action_types.RoleTypes.RECEIVED_ROLE,
        data: role
    });
}

function handleChannelCreatedEvent(msg, dispatch, getState) {
    var _msg$data = msg.data,
        channelId = _msg$data.channel_id,
        teamId = _msg$data.team_id;

    var state = getState();
    var channels = state.entities.channels.channels;
    var currentTeamId = state.entities.teams.currentTeamId;


    if (teamId === currentTeamId && !channels[channelId]) {
        (0, _channels.getChannelAndMyMember)(channelId)(dispatch, getState);
    }
}

function handleChannelDeletedEvent(msg, dispatch, getState) {
    var entities = getState().entities;
    var _entities$channels = entities.channels,
        channels = _entities$channels.channels,
        currentChannelId = _entities$channels.currentChannelId,
        channelsInTeam = _entities$channels.channelsInTeam;
    var currentTeamId = entities.teams.currentTeamId;

    var viewArchivedChannels = entities.general.config.ExperimentalViewArchivedChannels === 'true';

    if (msg.broadcast.team_id === currentTeamId) {
        if (msg.data.channel_id === currentChannelId && !viewArchivedChannels) {
            var channelId = '';
            var teamChannels = Array.from(channelsInTeam[currentTeamId]);
            var channel = teamChannels.filter(function (key) {
                return channels[key].name === _constants.General.DEFAULT_CHANNEL;
            });

            if (channel.length) {
                channelId = channel[0];
            }

            dispatch({ type: _action_types.ChannelTypes.SELECT_CHANNEL, data: channelId }, getState);
            _event_emitter2.default.emit(_constants.General.DEFAULT_CHANNEL, '');
        }

        dispatch({ type: _action_types.ChannelTypes.RECEIVED_CHANNEL_DELETED, data: { id: msg.data.channel_id, team_id: msg.data.team_id, deleteAt: msg.data.delete_at } }, getState);

        (0, _channels.fetchMyChannelsAndMembers)(currentTeamId)(dispatch, getState);
    }
}

function handleChannelUpdatedEvent(msg, dispatch, getState) {
    var channel = void 0;
    try {
        channel = msg.data ? JSON.parse(msg.data.channel) : null;
    } catch (err) {
        return;
    }

    var entities = getState().entities;
    var currentChannelId = entities.channels.currentChannelId;

    if (channel) {
        dispatch({
            type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
            data: channel
        });

        if (currentChannelId === channel.id) {
            // Emit an event with the channel received as we need to handle
            // the changes without listening to the store
            _event_emitter2.default.emit(_constants.WebsocketEvents.CHANNEL_UPDATED, channel);
        }
    }
}

// handleChannelConvertedEvent handles updating of channel which is converted from public to private
function handleChannelConvertedEvent(msg, dispatch, getState) {
    var channelId = msg.data.channel_id;
    if (channelId) {
        var channel = (0, _channels2.getChannel)(getState(), channelId);
        if (channel) {
            dispatch({
                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                data: _extends({}, channel, { type: _constants.General.PRIVATE_CHANNEL })
            });
        }
    }
}

function handleChannelViewedEvent(msg, dispatch, getState) {
    var currentChannelId = getState().entities.channels.currentChannelId;
    var channelId = msg.data.channel_id;


    if (channelId !== currentChannelId) {
        (0, _channels.markChannelAsRead)(channelId, null, false)(dispatch, getState);
        (0, _channels.markChannelAsViewed)(channelId)(dispatch, getState);
    }
}

function handleChannelMemberUpdatedEvent(msg, dispatch) {
    var channelMember = JSON.parse(msg.data.channelMember);
    dispatch({ type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER, data: channelMember });
}

function handleDirectAddedEvent(msg, dispatch, getState) {
    (0, _channels.getChannelAndMyMember)(msg.broadcast.channel_id)(dispatch, getState);
}

function handlePreferenceChangedEvent(msg, dispatch, getState) {
    var preference = JSON.parse(msg.data.preference);
    dispatch({ type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES, data: [preference] }, getState);

    getAddedDmUsersIfNecessary([preference], dispatch, getState);
}

function handlePreferencesChangedEvent(msg, dispatch, getState) {
    var preferences = JSON.parse(msg.data.preferences);

    getAddedPostsIfNecessary(preferences, dispatch, getState);
    getAddedDmUsersIfNecessary(preferences, dispatch, getState);
    dispatch({ type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES, data: preferences });
}

function getAddedPostsIfNecessary(preferences, dispatch, getState) {
    var state = getState();
    var posts = state.entities.posts.posts;

    preferences.forEach(function (pref) {
        if (pref.category === _constants.Preferences.CATEGORY_FLAGGED_POST && !posts[pref.name]) {
            dispatch((0, _posts2.getPost)(pref.name));
        }
    });
}

function getAddedDmUsersIfNecessary(preferences, dispatch, getState) {
    var userIds = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = preferences[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var preference = _step.value;

            if (preference.category === _constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW && preference.value === 'true') {
                userIds.push(preference.name);
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

    if (userIds.length === 0) {
        return;
    }

    var state = getState();
    var _state$entities$users = state.entities.users,
        currentUserId = _state$entities$users.currentUserId,
        profiles = _state$entities$users.profiles,
        statuses = _state$entities$users.statuses;


    var needProfiles = [];
    var needStatuses = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = userIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var userId = _step2.value;

            if (!profiles[userId] && userId !== currentUserId) {
                needProfiles.push(userId);
            }

            if (statuses[userId] !== _constants.General.ONLINE) {
                needStatuses.push(userId);
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

    if (needProfiles.length > 0) {
        (0, _users.getProfilesByIds)(needProfiles)(dispatch, getState);
    }

    if (needStatuses.length > 0) {
        (0, _users.getStatusesByIds)(needStatuses)(dispatch, getState);
    }
}

function handlePreferencesDeletedEvent(msg, dispatch, getState) {
    var preferences = JSON.parse(msg.data.preferences);
    dispatch({ type: _action_types.PreferenceTypes.DELETED_PREFERENCES, data: preferences }, getState);
}

function handleStatusChangedEvent(msg, dispatch, getState) {
    dispatch({
        type: _action_types.UserTypes.RECEIVED_STATUSES,
        data: [{ user_id: msg.data.user_id, status: msg.data.status }]
    }, getState);
}

function handleHelloEvent(msg) {
    var serverVersion = msg.data.server_version;
    if (serverVersion && _client.Client4.serverVersion !== serverVersion) {
        _client.Client4.serverVersion = serverVersion;
        _event_emitter2.default.emit(_constants.General.SERVER_VERSION_CHANGED, serverVersion);
    }
}

function handleUserTypingEvent(msg, dispatch, getState) {
    var state = getState();
    var _state$entities$users2 = state.entities.users,
        currentUserId = _state$entities$users2.currentUserId,
        profiles = _state$entities$users2.profiles,
        statuses = _state$entities$users2.statuses;
    var config = state.entities.general.config;

    var userId = msg.data.user_id;

    var data = {
        id: msg.broadcast.channel_id + msg.data.parent_id,
        userId: userId,
        now: Date.now()
    };

    dispatch({
        type: _constants.WebsocketEvents.TYPING,
        data: data
    }, getState);

    setTimeout(function () {
        dispatch({
            type: _constants.WebsocketEvents.STOP_TYPING,
            data: data
        }, getState);
    }, parseInt(config.TimeBetweenUserTypingUpdatesMilliseconds, 10));

    if (!profiles[userId] && userId !== currentUserId) {
        (0, _users.getProfilesByIds)([userId])(dispatch, getState);
    }

    var status = statuses[userId];
    if (status !== _constants.General.ONLINE) {
        (0, _users.getStatusesByIds)([userId])(dispatch, getState);
    }
}

function handleReactionAddedEvent(msg, dispatch, getState) {
    var data = msg.data;

    var reaction = JSON.parse(data.reaction);

    dispatch((0, _posts2.getCustomEmojiForReaction)(reaction.emoji_name));

    dispatch({
        type: _action_types.PostTypes.RECEIVED_REACTION,
        data: reaction
    }, getState);
}

function handleReactionRemovedEvent(msg, dispatch, getState) {
    var data = msg.data;

    var reaction = JSON.parse(data.reaction);

    dispatch({
        type: _action_types.PostTypes.REACTION_DELETED,
        data: reaction
    }, getState);
}

function handleAddEmoji(msg, dispatch) {
    var data = JSON.parse(msg.data.emoji);

    dispatch({
        type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI,
        data: data
    });
}

function handleLicenseChangedEvent(msg, dispatch) {
    var data = msg.data.license;

    dispatch({
        type: _action_types.GeneralTypes.CLIENT_LICENSE_RECEIVED,
        data: data
    });
}

function handleConfigChangedEvent(msg, dispatch) {
    var data = msg.data.config;

    dispatch({
        type: _action_types.GeneralTypes.CLIENT_CONFIG_RECEIVED,
        data: data
    });
    _event_emitter2.default.emit(_constants.General.CONFIG_CHANGED, data);
}

function handlePluginStatusesChangedEvent(msg, dispatch) {
    var data = msg.data;

    dispatch({
        type: _action_types.AdminTypes.RECEIVED_PLUGIN_STATUSES,
        data: data.plugin_statuses
    });
}

// Helpers

function loadPostsHelper(channelId, dispatch, getState) {
    var _getState$entities$po = getState().entities.posts,
        posts = _getState$entities$po.posts,
        postsInChannel = _getState$entities$po.postsInChannel;

    var postsIds = postsInChannel[channelId];

    var latestPostTime = 0;
    if (postsIds && postsIds.length) {
        var postsForChannel = postsIds.map(function (id) {
            return posts[id];
        });
        latestPostTime = (0, _post_utils.getLastCreateAt)(postsForChannel);
    }

    if (latestPostTime === 0) {
        (0, _posts2.getPosts)(channelId)(dispatch, getState);
    } else {
        (0, _posts2.getPostsSince)(channelId, latestPostTime)(dispatch, getState);
    }
}

var lastTimeTypingSent = 0;
function userTyping(channelId, parentPostId) {
    var _this4 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            var state, config, t, stats, membersInChannel;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            state = getState();
                            config = state.entities.general.config;
                            t = Date.now();
                            stats = (0, _channels2.getCurrentChannelStats)(state);
                            membersInChannel = stats ? stats.member_count : 0;


                            if (t - lastTimeTypingSent > config.TimeBetweenUserTypingUpdatesMilliseconds && membersInChannel < config.MaxNotificationsPerChannel && config.EnableUserTypingMessages === 'true') {
                                _websocket_client2.default.userTyping(channelId, parentPostId);
                                lastTimeTypingSent = t;
                            }

                            return _context7.abrupt('return', { data: true });

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this4);
        }));

        return function (_x15, _x16) {
            return _ref7.apply(this, arguments);
        };
    }();
}