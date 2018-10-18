'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getUserTimezone = getUserTimezone;
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function getUserTimezone(state, id) {
    var profile = state.entities.users.profiles[id];

    if (profile && profile.timezone) {
        return _extends({}, profile.timezone, {
            useAutomaticTimezone: profile.timezone.useAutomaticTimezone === 'true'
        });
    }

    return {
        useAutomaticTimezone: true,
        automaticTimezone: '',
        manualTimezone: ''
    };
}