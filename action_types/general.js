'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _key_mirror = require('../utils/key_mirror');

var _key_mirror2 = _interopRequireDefault(_key_mirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _key_mirror2.default)({
    RECEIVED_APP_STATE: null,
    RECEIVED_APP_CREDENTIALS: null,
    REMOVED_APP_CREDENTIALS: null,
    RECEIVED_APP_DEVICE_TOKEN: null,

    PING_REQUEST: null,
    PING_SUCCESS: null,
    PING_FAILURE: null,
    PING_RESET: null,

    RECEIVED_SERVER_VERSION: null,

    CLIENT_CONFIG_REQUEST: null,
    CLIENT_CONFIG_SUCCESS: null,
    CLIENT_CONFIG_FAILURE: null,
    CLIENT_CONFIG_RECEIVED: null,
    CLIENT_CONFIG_RESET: null,

    CLIENT_LICENSE_REQUEST: null,
    CLIENT_LICENSE_SUCCESS: null,
    CLIENT_LICENSE_FAILURE: null,
    CLIENT_LICENSE_RECEIVED: null,
    CLIENT_LICENSE_RESET: null,

    RECEIVED_DATA_RETENTION_POLICY: null,
    DATA_RETENTION_POLICY_REQUEST: null,
    DATA_RETENTION_POLICY_SUCCESS: null,
    DATA_RETENTION_POLICY_FAILURE: null,

    LOG_CLIENT_ERROR_REQUEST: null,
    LOG_CLIENT_ERROR_SUCCESS: null,
    LOG_CLIENT_ERROR_FAILURE: null,

    SUPPORTED_TIMEZONES_REQUEST: null,
    SUPPORTED_TIMEZONES_SUCCESS: null,
    SUPPORTED_TIMEZONES_FAILURE: null,
    SUPPORTED_TIMEZONES_RECEIVED: null,

    WEBSOCKET_REQUEST: null,
    WEBSOCKET_SUCCESS: null,
    WEBSOCKET_FAILURE: null,
    WEBSOCKET_CLOSED: null,

    REDIRECT_LOCATION_REQUEST: null,
    REDIRECT_LOCATION_SUCCESS: null,
    REDIRECT_LOCATION_FAILURE: null
}); // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.