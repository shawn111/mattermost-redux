'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


exports.initialRequestState = initialRequestState;
exports.handleRequest = handleRequest;

var _constants = require('../../constants');

function initialRequestState() {
    return {
        status: _constants.RequestStatus.NOT_STARTED,
        error: null
    };
}

function handleRequest(REQUEST, SUCCESS, FAILURE, state, action) {
    switch (action.type) {
        case REQUEST:
            return _extends({}, state, {
                status: _constants.RequestStatus.STARTED
            });
        case SUCCESS:
            return _extends({}, state, {
                status: _constants.RequestStatus.SUCCESS,
                error: null
            });
        case FAILURE:
            {
                var error = action.error;
                if (error instanceof Error) {
                    error = error.hasOwnProperty('intl') ? JSON.parse(JSON.stringify(error)) : error.toString();
                }

                return _extends({}, state, {
                    status: _constants.RequestStatus.FAILURE,
                    error: error
                });
            }
        default:
            return state;
    }
}