'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function isFunction(obj) {
    return typeof obj === 'function';
}

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.listeners = new Map();
    }

    _createClass(EventEmitter, [{
        key: 'addListener',
        value: function addListener(label, callback) {
            if (!this.listeners.has(label)) {
                this.listeners.set(label, []);
            }

            // $FlowFixMe
            this.listeners.get(label).push(callback);
        }
    }, {
        key: 'on',
        value: function on(label, callback) {
            this.addListener(label, callback);
        }
    }, {
        key: 'removeListener',
        value: function removeListener(label, callback) {
            var listeners = this.listeners.get(label);
            var index = void 0;

            if (listeners && listeners.length) {
                index = listeners.reduce(function (i, listener, idx) {
                    return isFunction(listener) && listener === callback ? idx : i;
                }, -1);

                if (index > -1) {
                    listeners.splice(index, 1);
                    this.listeners.set(label, listeners);
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'off',
        value: function off(label, callback) {
            this.removeListener(label, callback);
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }
            return false;
        }
    }]);

    return EventEmitter;
}();

exports.default = new EventEmitter();