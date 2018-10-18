'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


var _redux = require('redux');

var _action_types = require('../../action_types');

function jobs() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.JobTypes.RECEIVED_JOB:
            {
                var nextState = _extends({}, state);
                nextState[action.data.id] = action.data;
                return nextState;
            }
        case _action_types.JobTypes.RECEIVED_JOBS:
            {
                var _nextState = _extends({}, state);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = action.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var job = _step.value;

                        _nextState[job.id] = job;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return _nextState;
            }
        default:
            return state;
    }
}

function jobsByTypeList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.JobTypes.RECEIVED_JOBS_BY_TYPE:
            {
                var nextState = _extends({}, state);
                if (action.data && action.data.length && action.data.length > 0) {
                    nextState[action.data[0].type] = action.data;
                }
                return nextState;
            }
        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // object where every key is the job id and has an object with the job details
    jobs: jobs,

    // object where every key is a job type and contains a list of jobs.
    jobsByTypeList: jobsByTypeList

});