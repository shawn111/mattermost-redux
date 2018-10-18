"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var DelayedAction = function DelayedAction(action) {
    var _this = this;

    _classCallCheck(this, DelayedAction);

    this.fire = function () {
        _this.action();

        _this.timer = null;
    };

    this.fireAfter = function (timeout) {
        if (_this.timer !== null) {
            clearTimeout(_this.timer);
        }

        _this.timer = setTimeout(_this.fire, timeout);
    };

    this.cancel = function () {
        if (_this.timer !== null) {
            clearTimeout(_this.timer);
        }
    };

    this.action = action;

    this.timer = null;
};

exports.default = DelayedAction;