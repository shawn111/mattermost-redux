'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getServerVersion = exports.getAutolinkedUrlSchemes = exports.canDownloadFilesOnMobile = exports.canUploadFilesOnMobile = undefined;
exports.getConfig = getConfig;
exports.getLicense = getLicense;
exports.getSupportedTimezones = getSupportedTimezones;
exports.getCurrentUrl = getCurrentUrl;
exports.hasNewPermissions = hasNewPermissions;

var _reselect = require('reselect');

var _helpers = require('../../utils/helpers');

var _constants = require('../../constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getConfig(state) {
    return state.entities.general.config;
}

function getLicense(state) {
    return state.entities.general.license;
}

function getSupportedTimezones(state) {
    return state.entities.general.timezones;
}

function getCurrentUrl(state) {
    return state.entities.general.credentials.url;
}

function hasNewPermissions(state) {
    var version = state.entities.general.serverVersion;

    // FIXME This must be changed to 4, 9, 0 before we generate the 4.9.0 release
    return (0, _helpers.isMinimumServerVersion)(version, 4, 9, 0) || version.indexOf('dev') !== -1 && (0, _helpers.isMinimumServerVersion)(version, 4, 8, 0) || version.match(/^4.8.\d.\d\d\d\d.*$/) !== null && (0, _helpers.isMinimumServerVersion)(version, 4, 8, 0);
}

var canUploadFilesOnMobile = exports.canUploadFilesOnMobile = (0, _reselect.createSelector)(getConfig, getLicense, function (config, license) {
    // Defaults to true if either setting doesn't exist
    return config.EnableFileAttachments !== 'false' && (license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileUpload !== 'false');
});

var canDownloadFilesOnMobile = exports.canDownloadFilesOnMobile = (0, _reselect.createSelector)(getConfig, getLicense, function (config, license) {
    // Defaults to true if the setting doesn't exist
    return license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileDownload !== 'false';
});

var getAutolinkedUrlSchemes = exports.getAutolinkedUrlSchemes = (0, _reselect.createSelector)(getConfig, function (config) {
    if (!config.CustomUrlSchemes) {
        return _constants.General.DEFAULT_AUTOLINKED_URL_SCHEMES;
    }

    return [].concat(_toConsumableArray(_constants.General.DEFAULT_AUTOLINKED_URL_SCHEMES), _toConsumableArray(config.CustomUrlSchemes.split(',')));
});

var getServerVersion = exports.getServerVersion = function getServerVersion(state) {
    return state.entities.general.serverVersion;
};