'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissErrorObject = dismissErrorObject;
exports.dismissError = dismissError;
exports.getLogErrorAction = getLogErrorAction;
exports.logError = logError;
exports.clearErrors = clearErrors;

var _action_types = require('../action_types');

var _serializeError = require('serialize-error');

var _serializeError2 = _interopRequireDefault(_serializeError);

var _client = require('../client');

var _event_emitter = require('../utils/event_emitter');

var _event_emitter2 = _interopRequireDefault(_event_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function dismissErrorObject(index) {
    return {
        type: _action_types.ErrorTypes.DISMISS_ERROR,
        index: index
    };
}

function dismissError(index) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch(dismissErrorObject(index));

                            return _context.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
}

function getLogErrorAction(error) {
    var displayable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return {
        type: _action_types.ErrorTypes.LOG_ERROR,
        displayable: displayable,
        error: error
    };
}

function logError(error) {
    var _this2 = this;

    var displayable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
            var serializedError, sendToServer, stringifiedSerializedError;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!(error.server_error_id === 'api.context.session_expired.app_error')) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt('return', { data: true });

                        case 2:
                            serializedError = (0, _serializeError2.default)(error);
                            sendToServer = true;

                            if (error.stack && error.stack.includes('TypeError: Failed to fetch')) {
                                sendToServer = false;
                            }
                            if (error.server_error_id) {
                                sendToServer = false;
                            }

                            if (!sendToServer) {
                                _context2.next = 15;
                                break;
                            }

                            _context2.prev = 7;
                            stringifiedSerializedError = JSON.stringify(serializedError).toString();
                            _context2.next = 11;
                            return _client.Client4.logClientError(stringifiedSerializedError);

                        case 11:
                            _context2.next = 15;
                            break;

                        case 13:
                            _context2.prev = 13;
                            _context2.t0 = _context2['catch'](7);

                        case 15:

                            _event_emitter2.default.emit(_action_types.ErrorTypes.LOG_ERROR, error);
                            dispatch(getLogErrorAction(serializedError, displayable));

                            return _context2.abrupt('return', { data: true });

                        case 18:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[7, 13]]);
        }));

        return function (_x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function clearErrors() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.ErrorTypes.CLEAR_ERRORS });

                            return _context3.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x5) {
            return _ref3.apply(this, arguments);
        };
    }();
}