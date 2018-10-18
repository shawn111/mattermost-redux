'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllJobs = getAllJobs;
exports.getJobsByType = getJobsByType;
exports.makeGetJobsByType = makeGetJobsByType;

var _reselect = require('reselect');

function getAllJobs(state) {
    return state.entities.jobs.jobs;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getJobsByType(state) {
    return state.entities.jobs.jobsByTypeList;
}

function makeGetJobsByType(type) {
    return (0, _reselect.createSelector)(getJobsByType, function (jobsByType) {
        return jobsByType[type] || [];
    });
}