'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPing = getPing;
exports.resetPing = resetPing;
exports.getClientConfig = getClientConfig;
exports.getDataRetentionPolicy = getDataRetentionPolicy;
exports.getLicenseConfig = getLicenseConfig;
exports.logClientError = logClientError;
exports.setAppState = setAppState;
exports.setDeviceToken = setDeviceToken;
exports.setServerVersion = setServerVersion;
exports.setStoreFromLocalData = setStoreFromLocalData;
exports.getSupportedTimezones = getSupportedTimezones;
exports.setUrl = setUrl;
exports.getRedirectLocation = getRedirectLocation;

var _client = require('../client');

var _helpers = require('./helpers.js');

var _action_types = require('../action_types');

var _users = require('./users');

var _roles = require('./roles');

var _errors = require('./errors');

var _reduxBatchedActions = require('redux-batched-actions');

var _general = require('../selectors/entities/general');

var _helpers2 = require('../utils/helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getPing() {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data, pingError;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.PING_REQUEST, data: {} }, getState);

                            data = void 0;
                            pingError = new _helpers.FormattedError('mobile.server_ping_failed', 'Cannot connect to the server. Please check your server URL and internet connection.');
                            _context.prev = 3;
                            _context.next = 6;
                            return _client.Client4.ping();

                        case 6:
                            data = _context.sent;

                            if (!(data.status !== 'OK')) {
                                _context.next = 10;
                                break;
                            }

                            // successful ping but not the right return {data}
                            dispatch({ type: _action_types.GeneralTypes.PING_FAILURE, data: {}, error: pingError }, getState);
                            return _context.abrupt('return', { error: pingError });

                        case 10:
                            _context.next = 17;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](3);
                            // Client4Error
                            if (_context.t0.status_code === 401) {
                                // When the server requires a client certificate to connect.
                                pingError = _context.t0;
                            }
                            dispatch({ type: _action_types.GeneralTypes.PING_FAILURE, data: {}, error: pingError }, getState);
                            return _context.abrupt('return', { error: pingError });

                        case 17:

                            dispatch({ type: _action_types.GeneralTypes.PING_SUCCESS, data: data }, getState);
                            return _context.abrupt('return', { data: data });

                        case 19:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[3, 12]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function resetPing() {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.PING_RESET, data: {} }, getState);

                            return _context2.abrupt('return', { data: true });

                        case 2:
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

function getClientConfig() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.CLIENT_CONFIG_REQUEST, data: {} }, getState);

                            data = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.getClientConfigOld();

                        case 5:
                            data = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.GeneralTypes.CLIENT_CONFIG_FAILURE,
                                error: _context3.t0
                            }, (0, _errors.logError)(_context3.t0)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:

                            _client.Client4.setEnableLogging(data.EnableDeveloper === 'true');
                            _client.Client4.setDiagnosticId(data.DiagnosticId);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.GeneralTypes.CLIENT_CONFIG_RECEIVED, data: data }, { type: _action_types.GeneralTypes.CLIENT_CONFIG_SUCCESS }]));

                            return _context3.abrupt('return', { data: data });

                        case 17:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function getDataRetentionPolicy() {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_REQUEST, data: {} }, getState);

                            data = void 0;
                            _context4.prev = 2;
                            _context4.next = 5;
                            return _client.Client4.getDataRetentionPolicy();

                        case 5:
                            data = _context4.sent;
                            _context4.next = 13;
                            break;

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_FAILURE,
                                error: _context4.t0
                            }, (0, _errors.logError)(_context4.t0)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.GeneralTypes.RECEIVED_DATA_RETENTION_POLICY, data: data }, { type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_SUCCESS }]));

                            return _context4.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[2, 8]]);
        }));

        return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function getLicenseConfig() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getClientLicenseOld, _action_types.GeneralTypes.CLIENT_LICENSE_REQUEST, [_action_types.GeneralTypes.CLIENT_LICENSE_RECEIVED, _action_types.GeneralTypes.CLIENT_LICENSE_SUCCESS], _action_types.GeneralTypes.CLIENT_LICENSE_FAILURE);
}

function logClientError(message) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERROR';

    return (0, _helpers.bindClientFunc)(_client.Client4.logClientError, _action_types.GeneralTypes.LOG_CLIENT_ERROR_REQUEST, _action_types.GeneralTypes.LOG_CLIENT_ERROR_SUCCESS, _action_types.GeneralTypes.LOG_CLIENT_ERROR_FAILURE, message, level);
}

function setAppState(state) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_APP_STATE, data: state }, getState);

                            return _context5.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }));

        return function (_x10, _x11) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function setDeviceToken(token) {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_APP_DEVICE_TOKEN, data: token }, getState);

                            return _context6.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }));

        return function (_x12, _x13) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function setServerVersion(serverVersion) {
    var _this7 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_SERVER_VERSION, data: serverVersion }, getState);
                            dispatch((0, _roles.loadRolesIfNeeded)([]));

                            return _context7.abrupt('return', { data: true });

                        case 3:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }));

        return function (_x14, _x15) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function setStoreFromLocalData(data) {
    var _this8 = this;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _client.Client4.setToken(data.token);
                            _client.Client4.setUrl(data.url);

                            return _context8.abrupt('return', (0, _users.loadMe)()(dispatch, getState));

                        case 3:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }));

        return function (_x16, _x17) {
            return _ref8.apply(this, arguments);
        };
    }();
}

function getSupportedTimezones() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTimezones, _action_types.GeneralTypes.SUPPORTED_TIMEZONES_REQUEST, [_action_types.GeneralTypes.SUPPORTED_TIMEZONES_RECEIVED, _action_types.GeneralTypes.SUPPORTED_TIMEZONES_SUCCESS], _action_types.GeneralTypes.SUPPORTED_TIMEZONES_FAILURE);
}

function setUrl(url) {
    _client.Client4.setUrl(url);
    return true;
}

function getRedirectLocation(url) {
    var _this9 = this;

    return function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(dispatch, getState) {
            var pendingData, data;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.REDIRECT_LOCATION_REQUEST, data: {} }, getState);

                            pendingData = void 0;

                            if ((0, _helpers2.isMinimumServerVersion)((0, _general.getServerVersion)(getState()), 5, 3)) {
                                pendingData = _client.Client4.getRedirectLocation(url);
                            } else {
                                pendingData = Promise.resolve({ location: url });
                            }

                            data = void 0;
                            _context9.prev = 4;
                            _context9.next = 7;
                            return pendingData;

                        case 7:
                            data = _context9.sent;
                            _context9.next = 15;
                            break;

                        case 10:
                            _context9.prev = 10;
                            _context9.t0 = _context9['catch'](4);

                            (0, _helpers.forceLogoutIfNecessary)(_context9.t0, dispatch, getState);
                            dispatch({ type: _action_types.GeneralTypes.REDIRECT_LOCATION_FAILURE, data: _context9.t0 }, getState);
                            return _context9.abrupt('return', { error: _context9.t0 });

                        case 15:

                            dispatch({ type: _action_types.GeneralTypes.REDIRECT_LOCATION_SUCCESS, data: data }, getState);
                            return _context9.abrupt('return', { data: data });

                        case 17:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9, [[4, 10]]);
        }));

        return function (_x18, _x19) {
            return _ref9.apply(this, arguments);
        };
    }();
}

exports.default = {
    getPing: getPing,
    getClientConfig: getClientConfig,
    getDataRetentionPolicy: getDataRetentionPolicy,
    getSupportedTimezones: getSupportedTimezones,
    getLicenseConfig: getLicenseConfig,
    logClientError: logClientError,
    setAppState: setAppState,
    setDeviceToken: setDeviceToken,
    setServerVersion: setServerVersion,
    setStoreFromLocalData: setStoreFromLocalData,
    setUrl: setUrl,
    getRedirectLocation: getRedirectLocation
};