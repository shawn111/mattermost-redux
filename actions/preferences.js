'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deletePreferences = deletePreferences;
exports.getMyPreferences = getMyPreferences;
exports.makeDirectChannelVisibleIfNecessary = makeDirectChannelVisibleIfNecessary;
exports.makeGroupMessageVisibleIfNecessary = makeGroupMessageVisibleIfNecessary;
exports.savePreferences = savePreferences;

var _client = require('../client');

var _constants = require('../constants');

var _action_types = require('../action_types');

var _preferences = require('../selectors/entities/preferences');

var _users = require('../selectors/entities/users');

var _preference_utils = require('../utils/preference_utils');

var _helpers = require('./helpers');

var _users2 = require('./users');

var _channels = require('./channels');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function deletePreferences(userId, preferences) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var state, myPreferences, currentPreferences;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            state = getState();
                            myPreferences = (0, _preferences.getMyPreferences)(state);
                            currentPreferences = preferences.map(function (pref) {
                                return myPreferences[(0, _preference_utils.getPreferenceKey)(pref.category, pref.name)];
                            });


                            dispatch({
                                type: _action_types.PreferenceTypes.DELETED_PREFERENCES,
                                data: preferences,
                                meta: {
                                    offline: {
                                        effect: function effect() {
                                            return _client.Client4.deletePreferences(userId, preferences);
                                        },
                                        commit: {
                                            type: _action_types.PreferenceTypes.DELETED_PREFERENCES
                                        },
                                        rollback: {
                                            type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES,
                                            data: currentPreferences
                                        }
                                    }
                                }
                            });

                            return _context.abrupt('return', { data: true });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function getMyPreferences() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getMyPreferences, _action_types.PreferenceTypes.MY_PREFERENCES_REQUEST, [_action_types.PreferenceTypes.RECEIVED_ALL_PREFERENCES, _action_types.PreferenceTypes.MY_PREFERENCES_SUCCESS], _action_types.PreferenceTypes.MY_PREFERENCES_FAILURE);
}

function makeDirectChannelVisibleIfNecessary(otherUserId) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var state, myPreferences, currentUserId, preference;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            state = getState();
                            myPreferences = (0, _preferences.getMyPreferences)(state);
                            currentUserId = (0, _users.getCurrentUserId)(state);
                            preference = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW, otherUserId)];


                            if (!preference || preference.value === 'false') {
                                preference = {
                                    user_id: currentUserId,
                                    category: _constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW,
                                    name: otherUserId,
                                    value: 'true'
                                };
                                (0, _users2.getProfilesByIds)([otherUserId])(dispatch, getState);
                                savePreferences(currentUserId, [preference])(dispatch);
                            }

                            return _context2.abrupt('return', { data: true });

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function makeGroupMessageVisibleIfNecessary(channelId) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var state, myPreferences, currentUserId, channels, preference;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            state = getState();
                            myPreferences = (0, _preferences.getMyPreferences)(state);
                            currentUserId = (0, _users.getCurrentUserId)(state);
                            channels = state.entities.channels.channels;
                            preference = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_GROUP_CHANNEL_SHOW, channelId)];


                            if (!preference || preference.value === 'false') {
                                preference = {
                                    user_id: currentUserId,
                                    category: _constants.Preferences.CATEGORY_GROUP_CHANNEL_SHOW,
                                    name: channelId,
                                    value: 'true'
                                };

                                if (channels[channelId]) {
                                    (0, _channels.getMyChannelMember)(channelId)(dispatch, getState);
                                } else {
                                    (0, _channels.getChannelAndMyMember)(channelId)(dispatch, getState);
                                }

                                (0, _users2.getProfilesInChannel)(channelId, 0)(dispatch, getState);
                                savePreferences(currentUserId, [preference])(dispatch);
                            }

                            return _context3.abrupt('return', { data: true });

                        case 7:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function savePreferences(userId, preferences) {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({
                                type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES,
                                data: preferences,
                                meta: {
                                    offline: {
                                        effect: function effect() {
                                            return _client.Client4.savePreferences(userId, preferences);
                                        },
                                        commit: {
                                            type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES
                                        },
                                        rollback: {
                                            type: _action_types.PreferenceTypes.DELETED_PREFERENCES,
                                            data: preferences
                                        }
                                    }
                                }
                            });

                            return _context4.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }));

        return function (_x7) {
            return _ref4.apply(this, arguments);
        };
    }();
}