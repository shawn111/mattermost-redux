'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEmailInterval = getEmailInterval;

var _constants = require('../constants');

function getEmailInterval(enableEmailNotification, enableEmailBatching, emailIntervalPreference) {
    var INTERVAL_NEVER = _constants.Preferences.INTERVAL_NEVER,
        INTERVAL_IMMEDIATE = _constants.Preferences.INTERVAL_IMMEDIATE,
        INTERVAL_FIFTEEN_MINUTES = _constants.Preferences.INTERVAL_FIFTEEN_MINUTES,
        INTERVAL_HOUR = _constants.Preferences.INTERVAL_HOUR;


    var validValuesWithEmailBatching = [INTERVAL_IMMEDIATE, INTERVAL_NEVER, INTERVAL_FIFTEEN_MINUTES, INTERVAL_HOUR];
    var validValuesWithoutEmailBatching = [INTERVAL_IMMEDIATE, INTERVAL_NEVER];

    if (!enableEmailNotification) {
        return INTERVAL_NEVER;
    } else if (enableEmailBatching && validValuesWithEmailBatching.indexOf(emailIntervalPreference) === -1) {
        // When email batching is enabled, the default interval is 15 minutes
        return INTERVAL_FIFTEEN_MINUTES;
    } else if (!enableEmailBatching && validValuesWithoutEmailBatching.indexOf(emailIntervalPreference) === -1) {
        // When email batching is not enabled, the default interval is immediately
        return INTERVAL_IMMEDIATE;
    }

    return emailIntervalPreference;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.