"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Based on http://nicolasgallagher.com/redux-modules-and-code-splitting/
var ReducerRegistry = exports.ReducerRegistry = function ReducerRegistry() {
    var _this = this;

    _classCallCheck(this, ReducerRegistry);

    this.setReducers = function (reducers) {
        _this.reducers = reducers;
    };

    this.getReducers = function () {
        return _extends({}, _this.reducers);
    };

    this.register = function (name, reducer) {
        _this.reducers = _extends({}, _this.reducers, _defineProperty({}, name, reducer));
        if (_this.emitChange) {
            _this.emitChange(_this.getReducers());
        }
    };

    this.setChangeListener = function (listener) {
        _this.emitChange = listener;
    };

    this.emitChange = null;
    this.reducers = {};
};

var reducerRegistry = new ReducerRegistry();
exports.default = reducerRegistry;