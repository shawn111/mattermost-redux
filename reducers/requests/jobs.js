'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function createJob() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.JobTypes.CREATE_JOB_REQUEST, _action_types.JobTypes.CREATE_JOB_SUCCESS, _action_types.JobTypes.CREATE_JOB_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getJob() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.JobTypes.GET_JOB_REQUEST, _action_types.JobTypes.GET_JOB_SUCCESS, _action_types.JobTypes.GET_JOB_FAILURE, state, action);
}

function getJobs() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.JobTypes.GET_JOBS_REQUEST, _action_types.JobTypes.GET_JOBS_SUCCESS, _action_types.JobTypes.GET_JOBS_FAILURE, state, action);
}

function cancelJob() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.JobTypes.CANCEL_JOB_REQUEST, _action_types.JobTypes.CANCEL_JOB_SUCCESS, _action_types.JobTypes.CANCEL_JOB_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    createJob: createJob,
    getJob: getJob,
    getJobs: getJobs,
    cancelJob: cancelJob
});