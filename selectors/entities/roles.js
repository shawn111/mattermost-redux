'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.haveICurrentChannelPermission = exports.haveICurrentTeamPermission = exports.haveIChannelPermission = exports.haveITeamPermission = exports.haveISystemPermission = exports.getMyChannelPermissions = exports.getMyTeamPermissions = exports.getMyCurrentChannelPermissions = exports.getMyCurrentTeamPermissions = exports.getMySystemPermissions = exports.getRolesById = exports.getMyRoles = exports.getMyChannelRoles = exports.getMyTeamRoles = exports.getMySystemRoles = undefined;
exports.getRoles = getRoles;

var _reselect = require('reselect');

var _common = require('./common');

var _teams = require('./teams');

var getMySystemRoles = exports.getMySystemRoles = (0, _reselect.createSelector)(_common.getCurrentUser, function (user) {
    if (user) {
        return new Set(user.roles.split(' '));
    }
    return new Set();
}); // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var getMyTeamRoles = exports.getMyTeamRoles = (0, _reselect.createSelector)(_teams.getTeamMemberships, function (teamsMemberships) {
    var roles = {};
    if (teamsMemberships) {
        for (var key in teamsMemberships) {
            if (teamsMemberships.hasOwnProperty(key) && teamsMemberships[key].roles) {
                roles[key] = new Set(teamsMemberships[key].roles.split(' '));
            }
        }
    }
    return roles;
});

var getMyChannelRoles = exports.getMyChannelRoles = (0, _reselect.createSelector)(function (state) {
    return state.entities.channels.myMembers;
}, function (channelsMemberships) {
    var roles = {};
    if (channelsMemberships) {
        for (var key in channelsMemberships) {
            if (channelsMemberships.hasOwnProperty(key) && channelsMemberships[key].roles) {
                roles[key] = new Set(channelsMemberships[key].roles.split(' '));
            }
        }
    }
    return roles;
});

var getMyRoles = exports.getMyRoles = (0, _reselect.createSelector)(getMySystemRoles, getMyTeamRoles, getMyChannelRoles, function (systemRoles, teamRoles, channelRoles) {
    return {
        system: systemRoles,
        team: teamRoles,
        channel: channelRoles
    };
});

function getRoles(state) {
    return state.entities.roles.roles;
}

var getRolesById = exports.getRolesById = (0, _reselect.createSelector)(getRoles, function (rolesByName) {
    var rolesById = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.values(rolesByName)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var role = _step.value;

            rolesById[role.id] = role;
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

    return rolesById;
});

var getMySystemPermissions = exports.getMySystemPermissions = (0, _reselect.createSelector)(getMySystemRoles, getRoles, function (mySystemRoles, roles) {
    var permissions = new Set();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = mySystemRoles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var roleName = _step2.value;

            if (roles[roleName]) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = roles[roleName].permissions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var permission = _step3.value;

                        permissions.add(permission);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return permissions;
});

var getMyCurrentTeamPermissions = exports.getMyCurrentTeamPermissions = (0, _reselect.createSelector)(getMyTeamRoles, getRoles, getMySystemPermissions, _teams.getCurrentTeamId, function (myTeamRoles, roles, systemPermissions, teamId) {
    var permissions = new Set();
    if (myTeamRoles[teamId]) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = myTeamRoles[teamId][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var roleName = _step4.value;

                if (roles[roleName]) {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = roles[roleName].permissions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var permission = _step5.value;

                            permissions.add(permission);
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    }
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = systemPermissions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _permission = _step6.value;

            permissions.add(_permission);
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return permissions;
});

var getMyCurrentChannelPermissions = exports.getMyCurrentChannelPermissions = (0, _reselect.createSelector)(getMyChannelRoles, getRoles, getMyCurrentTeamPermissions, _common.getCurrentChannelId, function (myChannelRoles, roles, teamPermissions, channelId) {
    var permissions = new Set();
    if (myChannelRoles[channelId]) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = myChannelRoles[channelId][Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var roleName = _step7.value;

                if (roles[roleName]) {
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = roles[roleName].permissions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var permission = _step8.value;

                            permissions.add(permission);
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }
    }
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = teamPermissions[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _permission2 = _step9.value;

            permissions.add(_permission2);
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }

    return permissions;
});

var getMyTeamPermissions = exports.getMyTeamPermissions = (0, _reselect.createSelector)(getMyTeamRoles, getRoles, getMySystemPermissions, function (state, options) {
    return options.team;
}, function (myTeamRoles, roles, systemPermissions, teamId) {
    var permissions = new Set();
    if (myTeamRoles[teamId]) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
            for (var _iterator10 = myTeamRoles[teamId][Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var roleName = _step10.value;

                if (roles[roleName]) {
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = roles[roleName].permissions[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var permission = _step11.value;

                            permissions.add(permission);
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                    _iterator10.return();
                }
            } finally {
                if (_didIteratorError10) {
                    throw _iteratorError10;
                }
            }
        }
    }
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = systemPermissions[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var _permission3 = _step12.value;

            permissions.add(_permission3);
        }
    } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
            }
        } finally {
            if (_didIteratorError12) {
                throw _iteratorError12;
            }
        }
    }

    return permissions;
});

var getMyChannelPermissions = exports.getMyChannelPermissions = (0, _reselect.createSelector)(getMyChannelRoles, getRoles, getMyTeamPermissions, function (state, options) {
    return options.channel;
}, function (myChannelRoles, roles, teamPermissions, channelId) {
    var permissions = new Set();
    if (myChannelRoles[channelId]) {
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
            for (var _iterator13 = myChannelRoles[channelId][Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                var roleName = _step13.value;

                if (roles[roleName]) {
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = roles[roleName].permissions[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var permission = _step14.value;

                            permissions.add(permission);
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                    _iterator13.return();
                }
            } finally {
                if (_didIteratorError13) {
                    throw _iteratorError13;
                }
            }
        }
    }
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
        for (var _iterator15 = teamPermissions[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var _permission4 = _step15.value;

            permissions.add(_permission4);
        }
    } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                _iterator15.return();
            }
        } finally {
            if (_didIteratorError15) {
                throw _iteratorError15;
            }
        }
    }

    return permissions;
});

var haveISystemPermission = exports.haveISystemPermission = (0, _reselect.createSelector)(getMySystemPermissions, function (state, options) {
    return options.permission;
}, function (permissions, permission) {
    return permissions.has(permission);
});

var haveITeamPermission = exports.haveITeamPermission = (0, _reselect.createSelector)(getMyTeamPermissions, function (state, options) {
    return options.permission;
}, function (permissions, permission) {
    return permissions.has(permission);
});

var haveIChannelPermission = exports.haveIChannelPermission = (0, _reselect.createSelector)(getMyChannelPermissions, function (state, options) {
    return options.permission;
}, function (permissions, permission) {
    return permissions.has(permission);
});

var haveICurrentTeamPermission = exports.haveICurrentTeamPermission = (0, _reselect.createSelector)(getMyCurrentTeamPermissions, function (state, options) {
    return options.permission;
}, function (permissions, permission) {
    return permissions.has(permission);
});

var haveICurrentChannelPermission = exports.haveICurrentChannelPermission = (0, _reselect.createSelector)(getMyCurrentChannelPermissions, function (state, options) {
    return options.permission;
}, function (permissions, permission) {
    return permissions.has(permission);
});