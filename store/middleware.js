'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMiddleware = createMiddleware;

var _reduxActionBuffer = require('redux-action-buffer');

var _reduxActionBuffer2 = _interopRequireDefault(_reduxActionBuffer);

var _constants = require('redux-persist/constants');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var defaultOptions = {
    additionalMiddleware: [],
    enableBuffer: true,
    enableThunk: true
};

function createMiddleware(clientOptions) {
    var options = Object.assign({}, defaultOptions, clientOptions);
    var additionalMiddleware = options.additionalMiddleware,
        enableBuffer = options.enableBuffer,
        enableThunk = options.enableThunk;


    var middleware = [];

    if (enableThunk) {
        middleware.push(_reduxThunk2.default);
    }

    if (additionalMiddleware) {
        if (typeof additionalMiddleware === 'function') {
            middleware.push(additionalMiddleware);
        } else {
            middleware.push.apply(middleware, _toConsumableArray(additionalMiddleware));
        }
    }

    if (enableBuffer) {
        middleware.push((0, _reduxActionBuffer2.default)(_constants.REHYDRATE));
    }

    return middleware;
}