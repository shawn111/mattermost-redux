'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormattedError = undefined;
exports.forceLogoutIfNecessary = forceLogoutIfNecessary;
exports.requestData = requestData;
exports.requestSuccess = requestSuccess;
exports.requestFailure = requestFailure;
exports.bindClientFunc = bindClientFunc;
exports.debounce = debounce;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _action_types = require('../action_types');

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


var HTTP_UNAUTHORIZED = 401;

function forceLogoutIfNecessary(err, dispatch, getState) {
    var currentUserId = getState().entities.users.currentUserId;

    if (err.status_code === HTTP_UNAUTHORIZED && err.url && err.url.indexOf('/login') === -1 && currentUserId) {
        _client.Client4.setToken('');
        dispatch({ type: _action_types.UserTypes.LOGOUT_SUCCESS, data: {} });
    }
}

function dispatcher(type, data, dispatch, getState) {
    if (type.indexOf('SUCCESS') === -1) {
        // we don't want to pass the data for the request types
        dispatch(requestSuccess(type, data), getState);
    } else {
        dispatch(requestData(type), getState);
    }
}

function requestData(type) {
    return {
        type: type,
        data: null
    };
}

function requestSuccess(type, data) {
    return {
        type: type,
        data: data
    };
}

function requestFailure(type, error) {
    return {
        type: type,
        error: error
    };
}

/**
 * Returns an ActionFunc which calls a specfied (client) function and
 * dispatches the specifed actions on request, success or failure.
 *
 * @export
 * @param {() => Promise<mixed>} clientFunc          clientFunc to execute
 * @param {ActionType} request                       ActionType to dispatch on request
 * @param {(ActionType | Array<ActionType>)} success ActionType to dispatch on success
 * @param {ActionType} failure                       ActionType to dispatch on failure
 * @param {...Array<any>} args
 * @returns {ActionFunc} ActionFunc
 */
function bindClientFunc(clientFunc, request, success, failure) {
    for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        args[_key - 4] = arguments[_key];
    }

    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch(requestData(request), getState);

                            data = null;
                            _context.prev = 2;
                            _context.next = 5;
                            return clientFunc.apply(undefined, args);

                        case 5:
                            data = _context.sent;
                            _context.next = 13;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](2);

                            forceLogoutIfNecessary(_context.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([requestFailure(failure, _context.t0), (0, _errors.logError)(_context.t0)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 13:

                            if (Array.isArray(success)) {
                                success.forEach(function (s) {
                                    dispatcher(s, data, dispatch, getState);
                                });
                            } else {
                                dispatcher(success, data, dispatch, getState);
                            }

                            return _context.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[2, 8]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

// Debounce function based on underscores modified to use es6 and a cb
function debounce(func, wait, immediate, cb) {
    var timeout = void 0;
    return function fx() {
        var _this2 = this;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var runLater = function runLater() {
            timeout = null;
            if (!immediate) {
                Reflect.apply(func, _this2, args);
                if (cb) {
                    cb();
                }
            }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(runLater, wait);
        if (callNow) {
            Reflect.apply(func, this, args);
            if (cb) {
                cb();
            }
        }
    };
}

var FormattedError = exports.FormattedError = function (_Error) {
    _inherits(FormattedError, _Error);

    function FormattedError(id, defaultMessage) {
        var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, FormattedError);

        var _this3 = _possibleConstructorReturn(this, (FormattedError.__proto__ || Object.getPrototypeOf(FormattedError)).call(this, defaultMessage));

        _this3.intl = {
            id: id,
            defaultMessage: defaultMessage,
            values: values
        };
        return _this3;
    }

    return FormattedError;
}(Error);