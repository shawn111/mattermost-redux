'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLatestErrorAlert = exports.getLatestDeveloperAlert = exports.getLatestNotificationAlert = undefined;
exports.getAlerts = getAlerts;
exports.getLatestAlert = getLatestAlert;

var _reselect = require('reselect');

var _constants = require('../../constants');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function getAlerts(state) {
    return state.entities.alerts.alertStack;
}

function getLatestAlert(state) {
    return state.entities.alerts.alertStack[0];
}

var getLatestNotificationAlert = exports.getLatestNotificationAlert = (0, _reselect.createSelector)(getAlerts, function (alerts) {
    return alerts.find(function (a) {
        return a.type === _constants.Alerts.ALERT_NOTIFICATION;
    });
});

var getLatestDeveloperAlert = exports.getLatestDeveloperAlert = (0, _reselect.createSelector)(getAlerts, function (alerts) {
    return alerts.find(function (a) {
        return a.type === _constants.Alerts.ALERT_DEVELOPER;
    });
});

var getLatestErrorAlert = exports.getLatestErrorAlert = (0, _reselect.createSelector)(getAlerts, function (alerts) {
    return alerts.find(function (a) {
        return a.type === _constants.Alerts.ALERT_ERROR;
    });
});