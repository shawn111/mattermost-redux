'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFilePublicLink = getFilePublicLink;
exports.makeGetFilesForPost = makeGetFilesForPost;

var _reselect = require('reselect');

var _i18n = require('./i18n');

var _file_utils = require('../../utils/file_utils');

function getAllFiles(state) {
    return state.entities.files.files;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function getFilesIdsForPost(state, postId) {
    if (postId) {
        return state.entities.files.fileIdsByPostId[postId] || [];
    }

    return [];
}

function getFilePublicLink(state) {
    return state.entities.files.filePublicLink;
}

function makeGetFilesForPost() {
    return (0, _reselect.createSelector)([getAllFiles, getFilesIdsForPost, _i18n.getCurrentUserLocale], function (allFiles, fileIdsForPost, locale) {
        var fileInfos = fileIdsForPost.map(function (id) {
            return allFiles[id];
        }).filter(function (id) {
            return Boolean(id);
        });

        return (0, _file_utils.sortFileInfos)(fileInfos, locale);
    });
}