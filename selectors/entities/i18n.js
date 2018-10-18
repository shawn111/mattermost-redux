'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentUserLocale = getCurrentUserLocale;

var _common = require('./common');

var _general = require('../../constants/general');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function getCurrentUserLocale(state) {
    var defaultLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _general.DEFAULT_LOCALE;

    var currentUser = (0, _common.getCurrentUser)(state);

    if (!currentUser) {
        return defaultLocale;
    }

    return currentUser.locale || defaultLocale;
}