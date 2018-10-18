'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScheme = getScheme;
exports.getSchemes = getSchemes;
exports.createScheme = createScheme;
exports.deleteScheme = deleteScheme;
exports.patchScheme = patchScheme;
exports.getSchemeTeams = getSchemeTeams;
exports.getSchemeChannels = getSchemeChannels;

var _client = require('../client');

var _action_types = require('../action_types');

var _constants = require('../constants');

var _reduxBatchedActions = require('redux-batched-actions');

var _helpers = require('./helpers');

var _errors = require('./errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getScheme(schemeId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getScheme, _action_types.SchemeTypes.GET_SCHEME_REQUEST, [_action_types.SchemeTypes.RECEIVED_SCHEME, _action_types.SchemeTypes.GET_SCHEME_SUCCESS], _action_types.SchemeTypes.GET_SCHEME_FAILURE, schemeId);
}

function getSchemes(scope) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getSchemes, _action_types.SchemeTypes.GET_SCHEMES_REQUEST, [_action_types.SchemeTypes.RECEIVED_SCHEMES, _action_types.SchemeTypes.GET_SCHEMES_SUCCESS], _action_types.SchemeTypes.GET_SCHEMES_FAILURE, scope, page, perPage);
}

function createScheme(scheme) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createScheme, _action_types.SchemeTypes.CREATE_SCHEME_REQUEST, [_action_types.SchemeTypes.CREATED_SCHEME, _action_types.SchemeTypes.CREATE_SCHEME_SUCCESS], _action_types.SchemeTypes.CREATE_SCHEME_FAILURE, scheme);
}

function deleteScheme(schemeId) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.SchemeTypes.DELETE_SCHEME_REQUEST, data: null }, getState);

                            data = null;
                            _context.prev = 2;
                            _context.next = 5;
                            return _client.Client4.deleteScheme(schemeId);

                        case 5:
                            data = _context.sent;
                            _context.next = 13;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.SchemeTypes.DELETE_SCHEME_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 13:

                            dispatch({ type: _action_types.SchemeTypes.DELETED_SCHEME, data: { schemeId: schemeId } }, getState);
                            dispatch({ type: _action_types.SchemeTypes.DELETE_SCHEME_SUCCESS, data: null }, getState);

                            return _context.abrupt('return', { data: data });

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[2, 8]]);
        }));

        return function (_x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }();
}

function patchScheme(schemeId, scheme) {
    return (0, _helpers.bindClientFunc)(_client.Client4.patchScheme, _action_types.SchemeTypes.PATCH_SCHEME_REQUEST, [_action_types.SchemeTypes.PATCHED_SCHEME, _action_types.SchemeTypes.PATCH_SCHEME_SUCCESS], _action_types.SchemeTypes.PATCH_SCHEME_FAILURE, schemeId, scheme);
}

function getSchemeTeams(schemeId) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getSchemeTeams, _action_types.SchemeTypes.GET_SCHEME_TEAMS_REQUEST, [_action_types.SchemeTypes.RECEIVED_SCHEME_TEAMS, _action_types.SchemeTypes.GET_SCHEME_TEAMS_SUCCESS], _action_types.SchemeTypes.GET_SCHEME_TEAMS_FAILURE, schemeId, page, perPage);
}

function getSchemeChannels(schemeId) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getSchemeChannels, _action_types.SchemeTypes.GET_SCHEME_CHANNELS_REQUEST, [_action_types.SchemeTypes.RECEIVED_SCHEME_CHANNELS, _action_types.SchemeTypes.GET_SCHEME_CHANNELS_SUCCESS], _action_types.SchemeTypes.GET_SCHEME_CHANNELS_FAILURE, schemeId, page, perPage);
}