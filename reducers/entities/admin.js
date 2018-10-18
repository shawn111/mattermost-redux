'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

var _constants = require('../../constants');

var _plugins = require('../../constants/plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function logs() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_LOGS:
            {
                return action.data;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function audits() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_AUDITS:
            {
                var nextState = _extends({}, state);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var audit = _step.value;

                        nextState[audit.id] = audit;
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
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function config() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_CONFIG:
            {
                return action.data;
            }
        case _action_types.AdminTypes.ENABLED_PLUGIN:
            {
                var nextPluginSettings = _extends({}, state.PluginSettings);
                var nextPluginStates = _extends({}, nextPluginSettings.PluginStates);
                nextPluginStates[action.data] = { Enable: true };
                nextPluginSettings.PluginStates = nextPluginStates;
                return _extends({}, state, { PluginSettings: nextPluginSettings });
            }
        case _action_types.AdminTypes.DISABLED_PLUGIN:
            {
                var _nextPluginSettings = _extends({}, state.PluginSettings);
                var _nextPluginStates = _extends({}, _nextPluginSettings.PluginStates);
                _nextPluginStates[action.data] = { Enable: false };
                _nextPluginSettings.PluginStates = _nextPluginStates;
                return _extends({}, state, { PluginSettings: _nextPluginSettings });
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function environmentConfig() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_ENVIRONMENT_CONFIG:
            {
                return action.data;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function complianceReports() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_COMPLIANCE_REPORT:
            {
                var nextState = _extends({}, state);
                nextState[action.data.id] = action.data;
                return nextState;
            }
        case _action_types.AdminTypes.RECEIVED_COMPLIANCE_REPORTS:
            {
                var _nextState = _extends({}, state);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = action.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var report = _step2.value;

                        _nextState[report.id] = report;
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

                return _nextState;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function clusterInfo() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_CLUSTER_STATUS:
            {
                return action.data;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function samlCertStatus() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_SAML_CERT_STATUS:
            {
                return action.data;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function convertAnalyticsRowsToStats(data, name) {
    var stats = {};

    if (name === 'post_counts_day') {
        data.reverse();
        stats[_constants.Stats.POST_PER_DAY] = data;
        return stats;
    }

    if (name === 'user_counts_with_posts_day') {
        data.reverse();
        stats[_constants.Stats.USERS_WITH_POSTS_PER_DAY] = data;
        return stats;
    }

    data.forEach(function (row) {
        var key = void 0;
        switch (row.name) {
            case 'channel_open_count':
                key = _constants.Stats.TOTAL_PUBLIC_CHANNELS;
                break;
            case 'channel_private_count':
                key = _constants.Stats.TOTAL_PRIVATE_GROUPS;
                break;
            case 'post_count':
                key = _constants.Stats.TOTAL_POSTS;
                break;
            case 'unique_user_count':
                key = _constants.Stats.TOTAL_USERS;
                break;
            case 'inactive_user_count':
                key = _constants.Stats.TOTAL_INACTIVE_USERS;
                break;
            case 'team_count':
                key = _constants.Stats.TOTAL_TEAMS;
                break;
            case 'total_websocket_connections':
                key = _constants.Stats.TOTAL_WEBSOCKET_CONNECTIONS;
                break;
            case 'total_master_db_connections':
                key = _constants.Stats.TOTAL_MASTER_DB_CONNECTIONS;
                break;
            case 'total_read_db_connections':
                key = _constants.Stats.TOTAL_READ_DB_CONNECTIONS;
                break;
            case 'daily_active_users':
                key = _constants.Stats.DAILY_ACTIVE_USERS;
                break;
            case 'monthly_active_users':
                key = _constants.Stats.MONTHLY_ACTIVE_USERS;
                break;
            case 'file_post_count':
                key = _constants.Stats.TOTAL_FILE_POSTS;
                break;
            case 'hashtag_post_count':
                key = _constants.Stats.TOTAL_HASHTAG_POSTS;
                break;
            case 'incoming_webhook_count':
                key = _constants.Stats.TOTAL_IHOOKS;
                break;
            case 'outgoing_webhook_count':
                key = _constants.Stats.TOTAL_OHOOKS;
                break;
            case 'command_count':
                key = _constants.Stats.TOTAL_COMMANDS;
                break;
            case 'session_count':
                key = _constants.Stats.TOTAL_SESSIONS;
                break;
        }

        if (key) {
            stats[key] = row.value;
        }
    });

    return stats;
}

function analytics() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_SYSTEM_ANALYTICS:
            {
                var stats = convertAnalyticsRowsToStats(action.data, action.name);
                return _extends({}, state, stats);
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function teamAnalytics() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_TEAM_ANALYTICS:
            {
                var nextState = _extends({}, state);
                var stats = convertAnalyticsRowsToStats(action.data, action.name);
                var analyticsForTeam = _extends({}, nextState[action.teamId] || {}, stats);
                nextState[action.teamId] = analyticsForTeam;
                return nextState;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function userAccessTokens() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKEN:
            {
                return _extends({}, state, _defineProperty({}, action.data.id, action.data));
            }
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS_FOR_USER:
            {
                var nextState = {};

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = action.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var uat = _step3.value;

                        nextState[uat.id] = uat;
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

                return _extends({}, state, nextState);
            }
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS:
            {
                var _nextState2 = {};

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = action.data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _uat = _step4.value;

                        _nextState2[_uat.id] = _uat;
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

                return _extends({}, state, _nextState2);
            }
        case _action_types.UserTypes.REVOKED_USER_ACCESS_TOKEN:
            {
                var _nextState3 = _extends({}, state);
                Reflect.deleteProperty(_nextState3, action.data);
                return _extends({}, _nextState3);
            }
        case _action_types.UserTypes.ENABLED_USER_ACCESS_TOKEN:
            {
                var token = _extends({}, state[action.data], { is_active: true });
                return _extends({}, state, _defineProperty({}, action.data, token));
            }
        case _action_types.UserTypes.DISABLED_USER_ACCESS_TOKEN:
            {
                var _token = _extends({}, state[action.data], { is_active: false });
                return _extends({}, state, _defineProperty({}, action.data, _token));
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function userAccessTokensForUser() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKEN:
            {
                var nextUserState = _extends({}, state[action.data.user_id] || {});
                nextUserState[action.data.id] = action.data;

                return _extends({}, state, _defineProperty({}, action.data.user_id, nextUserState));
            }
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS_FOR_USER:
            {
                var _nextUserState = _extends({}, state[action.userId] || {});

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = action.data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var uat = _step5.value;

                        _nextUserState[uat.id] = uat;
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return _extends({}, state, _defineProperty({}, action.userId, _nextUserState));
            }
        case _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS:
            {
                var _nextUserState2 = {};

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = action.data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _uat2 = _step6.value;

                        _nextUserState2[_uat2.user_id] = _nextUserState2[_uat2.user_id] || {};
                        _nextUserState2[_uat2.user_id][_uat2.id] = _uat2;
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                return _extends({}, state, _nextUserState2);
            }
        case _action_types.UserTypes.REVOKED_USER_ACCESS_TOKEN:
            {
                var userIds = Object.keys(state);
                for (var i = 0; i < userIds.length; i++) {
                    var userId = userIds[i];
                    if (state[userId] && state[userId][action.data]) {
                        var _nextUserState3 = _extends({}, state[userId]);
                        Reflect.deleteProperty(_nextUserState3, action.data);
                        return _extends({}, state, _defineProperty({}, userId, _nextUserState3));
                    }
                }

                return state;
            }
        case _action_types.UserTypes.ENABLED_USER_ACCESS_TOKEN:
            {
                var _userIds = Object.keys(state);
                for (var _i = 0; _i < _userIds.length; _i++) {
                    var _userId = _userIds[_i];
                    if (state[_userId] && state[_userId][action.data]) {
                        var _nextUserState4 = _extends({}, state[_userId]);
                        var token = _extends({}, _nextUserState4[action.data], { is_active: true });
                        _nextUserState4[token.id] = token;
                        return _extends({}, state, _defineProperty({}, _userId, _nextUserState4));
                    }
                }

                return state;
            }
        case _action_types.UserTypes.DISABLED_USER_ACCESS_TOKEN:
            {
                var _userIds2 = Object.keys(state);
                for (var _i2 = 0; _i2 < _userIds2.length; _i2++) {
                    var _userId2 = _userIds2[_i2];
                    if (state[_userId2] && state[_userId2][action.data]) {
                        var _nextUserState5 = _extends({}, state[_userId2]);
                        var _token2 = _extends({}, _nextUserState5[action.data], { is_active: false });
                        _nextUserState5[_token2.id] = _token2;
                        return _extends({}, state, _defineProperty({}, _userId2, _nextUserState5));
                    }
                }

                return state;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function plugins() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_PLUGIN:
            {
                var nextState = _extends({}, state);
                nextState[action.data.id] = action.data;
                return nextState;
            }
        case _action_types.AdminTypes.RECEIVED_PLUGINS:
            {
                var _nextState4 = _extends({}, state);
                var activePlugins = action.data.active;
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = activePlugins[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var plugin = _step7.value;

                        _nextState4[plugin.id] = _extends({}, plugin, { active: true });
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                var inactivePlugins = action.data.inactive;
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = inactivePlugins[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var _plugin = _step8.value;

                        _nextState4[_plugin.id] = _extends({}, _plugin, { active: false });
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }

                return _nextState4;
            }
        case _action_types.AdminTypes.REMOVED_PLUGIN:
            {
                var _nextState5 = _extends({}, state);
                Reflect.deleteProperty(_nextState5, action.data);
                return _nextState5;
            }
        case _action_types.AdminTypes.ENABLED_PLUGIN:
            {
                var _nextState6 = _extends({}, state);
                var _plugin2 = _nextState6[action.data];
                if (_plugin2 && !_plugin2.active) {
                    _nextState6[action.data] = _extends({}, _plugin2, { active: true });
                    return _nextState6;
                }
                return state;
            }
        case _action_types.AdminTypes.DISABLED_PLUGIN:
            {
                var _nextState7 = _extends({}, state);
                var _plugin3 = _nextState7[action.data];
                if (_plugin3 && _plugin3.active) {
                    _nextState7[action.data] = _extends({}, _plugin3, { active: false });
                    return _nextState7;
                }
                return state;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function pluginStatuses() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.AdminTypes.RECEIVED_PLUGIN_STATUSES:
            {
                var nextState = {};

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = (action.data || [])[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var plugin = _step9.value;

                        var id = plugin.plugin_id;

                        // The plugin may be in different states across the cluster. Pick the highest one to
                        // surface an error.
                        var pluginState = Math.max(nextState[id] && nextState[id].state || 0, plugin.state);

                        var instances = [].concat(_toConsumableArray(nextState[id] && nextState[id].instances || []), [{
                            cluster_id: plugin.cluster_id,
                            version: plugin.version,
                            state: plugin.state
                        }]);

                        nextState[id] = {
                            id: id,
                            name: nextState[id] && nextState[id].name || plugin.name,
                            description: nextState[id] && nextState[id].description || plugin.description,
                            version: nextState[id] && nextState[id].version || plugin.version,
                            is_prepackaged: nextState[id] && nextState[id].is_prepackaged || _constants.Plugins.PREPACKAGED_PLUGINS.includes(id),
                            active: pluginState > 0,
                            state: pluginState,
                            instances: instances
                        };
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }

                return nextState;
            }

        case _action_types.AdminTypes.RECEIVED_PLUGIN:
            {
                var _plugin4 = action.data;
                var existingPlugin = state[_plugin4.id] || { instances: [] };

                return _extends({}, state, _defineProperty({}, _plugin4.id, _extends({}, existingPlugin, {
                    id: _plugin4.id,
                    name: _plugin4.name,
                    description: _plugin4.description,
                    version: _plugin4.version,
                    is_prepackaged: false,
                    active: _plugin4.active,
                    state: _plugins2.default.PLUGIN_STATE_NOT_RUNNING
                })));
            }

        case _action_types.AdminTypes.ENABLE_PLUGIN_REQUEST:
            {
                var pluginId = action.data;
                if (!state[pluginId]) {
                    return state;
                }

                return _extends({}, state, _defineProperty({}, pluginId, _extends({}, state[pluginId], {
                    state: _plugins2.default.PLUGIN_STATE_STARTING
                })));
            }

        case _action_types.AdminTypes.DISABLE_PLUGIN_REQUEST:
            {
                var _pluginId = action.data;
                if (!state[_pluginId]) {
                    return state;
                }

                return _extends({}, state, _defineProperty({}, _pluginId, _extends({}, state[_pluginId], {
                    state: _plugins2.default.PLUGIN_STATE_STOPPING
                })));
            }

        case _action_types.AdminTypes.REMOVED_PLUGIN:
            {
                var _pluginId2 = action.data;
                if (!state[_pluginId2]) {
                    return state;
                }

                var _nextState8 = _extends({}, state);
                Reflect.deleteProperty(_nextState8, _pluginId2);

                return _nextState8;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // array of strings each representing a log entry
    logs: logs,

    // object where every key is an audit id and has an object with audit details
    audits: audits,

    // object representing the server configuration
    config: config,

    // object representing which fields of the server configuration were set through the environment config
    environmentConfig: environmentConfig,

    // object where every key is a report id and has an object with report details
    complianceReports: complianceReports,

    // array of cluster status data
    clusterInfo: clusterInfo,

    // object with certificate type as keys and boolean statuses as values
    samlCertStatus: samlCertStatus,

    // object with analytic categories as types and numbers as values
    analytics: analytics,

    // object with team ids as keys and analytics objects as values
    teamAnalytics: teamAnalytics,

    // object with user ids as keys and objects, with token ids as keys, and
    // user access tokens as values without actual token
    userAccessTokensByUser: userAccessTokensForUser,

    // object with token ids as keys, and user access tokens as values without actual token
    userAccessTokens: userAccessTokens,

    // object with plugin ids as keys and objects representing plugin manifests as values
    plugins: plugins,

    // object with plugin ids as keys and objects representing plugin statuses across the cluster
    pluginStatuses: pluginStatuses
});