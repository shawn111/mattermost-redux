'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJob = createJob;
exports.getJob = getJob;
exports.getJobs = getJobs;
exports.getJobsByType = getJobsByType;
exports.cancelJob = cancelJob;

var _action_types = require('../action_types');

var _client = require('../client');

var _constants = require('../constants');

var _helpers = require('./helpers');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function createJob(job) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createJob, _action_types.JobTypes.CREATE_JOB_REQUEST, [_action_types.JobTypes.RECEIVED_JOB, _action_types.JobTypes.CREATE_JOB_SUCCESS], _action_types.JobTypes.CREATE_JOB_FAILURE, job);
}

function getJob(id) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getJob, _action_types.JobTypes.GET_JOB_REQUEST, [_action_types.JobTypes.RECEIVED_JOB, _action_types.JobTypes.GET_JOB_SUCCESS], _action_types.JobTypes.GET_JOB_FAILURE, id);
}

function getJobs() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.JOBS_CHUNK_SIZE;

    return (0, _helpers.bindClientFunc)(_client.Client4.getJobs, _action_types.JobTypes.GET_JOBS_REQUEST, [_action_types.JobTypes.RECEIVED_JOBS, _action_types.JobTypes.GET_JOBS_SUCCESS], _action_types.JobTypes.GET_JOBS_FAILURE, page, perPage);
}

function getJobsByType(type) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.JOBS_CHUNK_SIZE;

    return (0, _helpers.bindClientFunc)(_client.Client4.getJobsByType, _action_types.JobTypes.GET_JOBS_REQUEST, [_action_types.JobTypes.RECEIVED_JOBS, _action_types.JobTypes.RECEIVED_JOBS_BY_TYPE, _action_types.JobTypes.GET_JOBS_SUCCESS], _action_types.JobTypes.GET_JOBS_FAILURE, type, page, perPage);
}

function cancelJob(job) {
    return (0, _helpers.bindClientFunc)(_client.Client4.cancelJob, _action_types.JobTypes.CANCEL_JOB_REQUEST, _action_types.JobTypes.CANCEL_JOB_SUCCESS, _action_types.JobTypes.CANCEL_JOB_FAILURE, job);
}