'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function files() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.FileTypes.RECEIVED_UPLOAD_FILES:
        case _action_types.FileTypes.RECEIVED_FILES_FOR_POST:
            {
                var filesById = action.data.reduce(function (filesMap, file) {
                    return _extends({}, filesMap, _defineProperty({}, file.id, file));
                }, {});
                return _extends({}, state, filesById);
            }

        case _action_types.PostTypes.POST_DELETED:
            {
                if (action.data && action.data.file_ids && action.data.file_ids.length) {
                    var nextState = _extends({}, state);
                    var fileIds = action.data.file_ids;
                    fileIds.forEach(function (id) {
                        Reflect.deleteProperty(nextState, id);
                    });

                    return nextState;
                }

                return state;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function fileIdsByPostId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.FileTypes.RECEIVED_FILES_FOR_POST:
            {
                var data = action.data,
                    postId = action.postId;

                var filesIdsForPost = data.map(function (file) {
                    return file.id;
                });
                return _extends({}, state, _defineProperty({}, postId, filesIdsForPost));
            }

        case _action_types.PostTypes.POST_DELETED:
            {
                if (action.data) {
                    var nextState = _extends({}, state);
                    Reflect.deleteProperty(nextState, action.data.id);
                    return nextState;
                }

                return state;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function filePublicLink() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.FileTypes.RECEIVED_FILE_PUBLIC_LINK:
            {
                return action.data;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({
    files: files,
    fileIdsByPostId: fileIdsByPostId,
    filePublicLink: filePublicLink
});