'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.autoUpdateTimezone = autoUpdateTimezone;

var _users = require('../selectors/entities/users');

var _timezone = require('../selectors/entities/timezone');

var _users2 = require('./users');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function autoUpdateTimezone(deviceTimezone) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var currentUer, currentTimezone, newTimezoneExists, timezone, updatedUser;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            currentUer = (0, _users.getCurrentUser)(getState());
                            currentTimezone = (0, _timezone.getUserTimezone)(getState(), currentUer.id);
                            newTimezoneExists = currentTimezone.automaticTimezone !== deviceTimezone;


                            if (currentTimezone.useAutomaticTimezone && newTimezoneExists) {
                                timezone = {
                                    useAutomaticTimezone: 'true',
                                    automaticTimezone: deviceTimezone,
                                    manualTimezone: currentTimezone.manualTimezone
                                };
                                updatedUser = _extends({}, currentUer, {
                                    timezone: timezone
                                });


                                (0, _users2.updateMe)(updatedUser)(dispatch, getState);
                            }

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}