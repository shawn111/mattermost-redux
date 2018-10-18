'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getFilesForPost = getFilesForPost;
exports.getMissingFilesForPost = getMissingFilesForPost;
exports.uploadFile = uploadFile;
exports.getFilePublicLink = getFilePublicLink;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _action_types = require('../action_types');

var _errors = require('./errors');

var _helpers = require('./helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getFilesForPost(postId) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var files;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.FileTypes.FETCH_FILES_FOR_POST_REQUEST, data: {} }, getState);
                            files = void 0;
                            _context.prev = 2;
                            _context.next = 5;
                            return _client.Client4.getFileInfosForPost(postId);

                        case 5:
                            files = _context.sent;
                            _context.next = 13;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.FileTypes.FETCH_FILES_FOR_POST_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.FileTypes.RECEIVED_FILES_FOR_POST,
                                data: files,
                                postId: postId
                            }, {
                                type: _action_types.FileTypes.FETCH_FILES_FOR_POST_SUCCESS
                            }]), getState);

                            return _context.abrupt('return', { data: true });

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

function getMissingFilesForPost(postId) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var fileIdsByPostId, posts;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            fileIdsByPostId = getState().entities.files.fileIdsByPostId;
                            posts = [];

                            if (fileIdsByPostId[postId]) {
                                _context2.next = 6;
                                break;
                            }

                            _context2.next = 5;
                            return getFilesForPost(postId)(dispatch, getState);

                        case 5:
                            posts = _context2.sent;

                        case 6:
                            return _context2.abrupt('return', { data: posts });

                        case 7:
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

function uploadFile(channelId, rootId, clientIds, fileFormData, formBoundary) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var files, failure, data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.FileTypes.UPLOAD_FILES_REQUEST, data: {} }, getState);

                            files = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.uploadFile(fileFormData, formBoundary);

                        case 5:
                            files = _context3.sent;
                            _context3.next = 14;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);

                            failure = {
                                type: _action_types.FileTypes.UPLOAD_FILES_FAILURE,
                                clientIds: clientIds,
                                channelId: channelId,
                                rootId: rootId,
                                error: _context3.t0
                            };


                            dispatch((0, _reduxBatchedActions.batchActions)([failure, (0, _errors.logError)(_context3.t0)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 14:
                            data = files.file_infos.map(function (file, index) {
                                return _extends({}, file, {
                                    clientId: files.client_ids[index]
                                });
                            });


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.FileTypes.RECEIVED_UPLOAD_FILES,
                                data: data,
                                channelId: channelId,
                                rootId: rootId
                            }, {
                                type: _action_types.FileTypes.UPLOAD_FILES_SUCCESS
                            }]), getState);

                            return _context3.abrupt('return', { data: files });

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

function getFilePublicLink(fileId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getFilePublicLink, _action_types.FileTypes.GET_FILE_PUBLIC_LINK_REQUEST, [_action_types.FileTypes.RECEIVED_FILE_PUBLIC_LINK, _action_types.FileTypes.GET_FILE_PUBLIC_LINK_SUCCESS], _action_types.FileTypes.GET_FILE_PUBLIC_LINK_FAILURE, fileId);
}