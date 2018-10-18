'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.teamListToMap = teamListToMap;
function teamListToMap(teamList) {
    var teams = {};
    for (var i = 0; i < teamList.length; i++) {
        teams[teamList[i].id] = teamList[i];
    }
    return teams;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.