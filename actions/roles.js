'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRolesByNames = getRolesByNames;
exports.getRoleByName = getRoleByName;
exports.getRole = getRole;
exports.editRole = editRole;
exports.setPendingRoles = setPendingRoles;
exports.loadRolesIfNeeded = loadRolesIfNeeded;

var _client = require('../client');

var _action_types = require('../action_types');

var _roles = require('../selectors/entities/roles');

var _general = require('../selectors/entities/general');

var _helpers = require('./helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function getRolesByNames(rolesNames) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getRolesByNames, _action_types.RoleTypes.ROLES_BY_NAMES_REQUEST, [_action_types.RoleTypes.RECEIVED_ROLES, _action_types.RoleTypes.ROLES_BY_NAMES_SUCCESS], _action_types.RoleTypes.ROLES_BY_NAMES_FAILURE, rolesNames);
}

function getRoleByName(roleName) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getRoleByName, _action_types.RoleTypes.ROLE_BY_NAME_REQUEST, [_action_types.RoleTypes.RECEIVED_ROLE, _action_types.RoleTypes.ROLE_BY_NAME_SUCCESS], _action_types.RoleTypes.ROLE_BY_NAME_FAILURE, roleName);
}

function getRole(roleId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getRole, _action_types.RoleTypes.ROLE_BY_ID_REQUEST, [_action_types.RoleTypes.RECEIVED_ROLE, _action_types.RoleTypes.ROLE_BY_ID_SUCCESS], _action_types.RoleTypes.ROLE_BY_ID_FAILURE, roleId);
}

function editRole(role) {
    return (0, _helpers.bindClientFunc)(_client.Client4.patchRole, _action_types.RoleTypes.EDIT_ROLE_REQUEST, [_action_types.RoleTypes.RECEIVED_ROLE, _action_types.RoleTypes.EDIT_ROLE_SUCCESS], _action_types.RoleTypes.EDIT_ROLE_FAILURE, role.id, role);
}

function setPendingRoles(roles) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.RoleTypes.SET_PENDING_ROLES, data: roles }, getState);
                            return _context.abrupt('return', { data: roles });

                        case 2:
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

function loadRolesIfNeeded(roles) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var state, pendingRoles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, role, loadedRoles, newRoles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _role;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            state = getState();
                            pendingRoles = new Set();

                            try {
                                pendingRoles = new Set(state.entities.roles.pending);
                            } catch (e) {
                                // eslint-disable-line
                            }
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 6;
                            for (_iterator = roles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                role = _step.value;

                                pendingRoles.add(role);
                            }
                            _context2.next = 14;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](6);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 14:
                            _context2.prev = 14;
                            _context2.prev = 15;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 17:
                            _context2.prev = 17;

                            if (!_didIteratorError) {
                                _context2.next = 20;
                                break;
                            }

                            throw _iteratorError;

                        case 20:
                            return _context2.finish(17);

                        case 21:
                            return _context2.finish(14);

                        case 22:
                            if (state.entities.general.serverVersion) {
                                _context2.next = 25;
                                break;
                            }

                            setPendingRoles(Array.from(pendingRoles))(dispatch, getState);
                            return _context2.abrupt('return', { data: [] });

                        case 25:
                            if ((0, _general.hasNewPermissions)(state)) {
                                _context2.next = 30;
                                break;
                            }

                            if (!state.entities.roles.pending) {
                                _context2.next = 29;
                                break;
                            }

                            _context2.next = 29;
                            return setPendingRoles([])(dispatch, getState);

                        case 29:
                            return _context2.abrupt('return', { data: [] });

                        case 30:
                            loadedRoles = (0, _roles.getRoles)(state);
                            newRoles = new Set();
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context2.prev = 35;

                            for (_iterator2 = pendingRoles[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                _role = _step2.value;

                                if (!loadedRoles[_role] && _role.trim() !== '') {
                                    newRoles.add(_role);
                                }
                            }

                            _context2.next = 43;
                            break;

                        case 39:
                            _context2.prev = 39;
                            _context2.t1 = _context2['catch'](35);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context2.t1;

                        case 43:
                            _context2.prev = 43;
                            _context2.prev = 44;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 46:
                            _context2.prev = 46;

                            if (!_didIteratorError2) {
                                _context2.next = 49;
                                break;
                            }

                            throw _iteratorError2;

                        case 49:
                            return _context2.finish(46);

                        case 50:
                            return _context2.finish(43);

                        case 51:
                            if (!state.entities.roles.pending) {
                                _context2.next = 54;
                                break;
                            }

                            _context2.next = 54;
                            return setPendingRoles([])(dispatch, getState);

                        case 54:
                            if (!(newRoles.size > 0)) {
                                _context2.next = 56;
                                break;
                            }

                            return _context2.abrupt('return', getRolesByNames(Array.from(newRoles))(dispatch, getState));

                        case 56:
                            return _context2.abrupt('return', { data: state.entities.roles.roles });

                        case 57:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[6, 10, 14, 22], [15,, 17, 21], [35, 39, 43, 51], [44,, 46, 50]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}