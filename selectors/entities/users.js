'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUsersInVisibleDMs = exports.shouldShowTermsOfService = exports.getProfilesWithoutTeam = exports.getProfilesNotInCurrentTeam = exports.getProfilesInTeam = exports.getProfilesInCurrentTeam = exports.getProfilesNotInCurrentChannel = exports.getProfilesInCurrentChannel = exports.getProfiles = exports.getProfileSetNotInCurrentTeam = exports.getProfileSetInCurrentTeam = exports.getProfileSetNotInCurrentChannel = exports.getProfileSetInCurrentChannel = exports.getCurrentUserMentionKeys = exports.getCurrentUserRoles = exports.isCurrentUserSystemAdmin = exports.getUsersByEmail = exports.getUsersByUsername = exports.getUsers = exports.getCurrentUser = exports.getCurrentUserId = undefined;
exports.getUserIdsInChannels = getUserIdsInChannels;
exports.getUserIdsNotInChannels = getUserIdsNotInChannels;
exports.getUserIdsInTeams = getUserIdsInTeams;
exports.getUserIdsNotInTeams = getUserIdsNotInTeams;
exports.getUserIdsWithoutTeam = getUserIdsWithoutTeam;
exports.getUserStatuses = getUserStatuses;
exports.getUserSessions = getUserSessions;
exports.getUserAudits = getUserAudits;
exports.getUser = getUser;
exports.getUserByUsername = getUserByUsername;
exports.getUserByEmail = getUserByEmail;
exports.getStatusForUserId = getStatusForUserId;
exports.getTotalUsersStats = getTotalUsersStats;
exports.searchProfiles = searchProfiles;
exports.searchProfilesInCurrentChannel = searchProfilesInCurrentChannel;
exports.searchProfilesNotInCurrentChannel = searchProfilesNotInCurrentChannel;
exports.searchProfilesInCurrentTeam = searchProfilesInCurrentTeam;
exports.searchProfilesInTeam = searchProfilesInTeam;
exports.searchProfilesNotInCurrentTeam = searchProfilesNotInCurrentTeam;
exports.searchProfilesWithoutTeam = searchProfilesWithoutTeam;
exports.makeGetProfilesForReactions = makeGetProfilesForReactions;
exports.makeGetProfilesInChannel = makeGetProfilesInChannel;
exports.makeGetProfilesByIdsAndUsernames = makeGetProfilesByIdsAndUsernames;

var _reselect = require('reselect');

var _common = require('./common');

var _general = require('./general');

var _preferences = require('./preferences');

var _user_utils = require('../../utils/user_utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.getCurrentUserId = _common.getCurrentUserId;
exports.getCurrentUser = _common.getCurrentUser;
exports.getUsers = _common.getUsers;
function getUserIdsInChannels(state) {
    return state.entities.users.profilesInChannel;
}

function getUserIdsNotInChannels(state) {
    return state.entities.users.profilesNotInChannel;
}

function getUserIdsInTeams(state) {
    return state.entities.users.profilesInTeam;
}

function getUserIdsNotInTeams(state) {
    return state.entities.users.profilesNotInTeam;
}

function getUserIdsWithoutTeam(state) {
    return state.entities.users.profilesWithoutTeam;
}

function getUserStatuses(state) {
    return state.entities.users.statuses;
}

function getUserSessions(state) {
    return state.entities.users.mySessions;
}

function getUserAudits(state) {
    return state.entities.users.myAudits;
}

function getUser(state, id) {
    return state.entities.users.profiles[id];
}

var getUsersByUsername = exports.getUsersByUsername = (0, _reselect.createSelector)(_common.getUsers, function (users) {
    var usersByUsername = {};

    for (var id in users) {
        if (users.hasOwnProperty(id)) {
            var user = users[id];
            usersByUsername[user.username] = user;
        }
    }

    return usersByUsername;
});

function getUserByUsername(state, username) {
    return getUsersByUsername(state)[username];
}

var getUsersByEmail = exports.getUsersByEmail = (0, _reselect.createSelector)(_common.getUsers, function (users) {
    var usersByEmail = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.values(users)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var user = _step.value;

            usersByEmail[user.email] = user;
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

    return usersByEmail;
});

function getUserByEmail(state, email) {
    return getUsersByEmail(state)[email];
}

var isCurrentUserSystemAdmin = exports.isCurrentUserSystemAdmin = (0, _reselect.createSelector)(_common.getCurrentUser, function (user) {
    var roles = user.roles || '';
    return (0, _user_utils.isSystemAdmin)(roles);
});

var getCurrentUserRoles = exports.getCurrentUserRoles = (0, _reselect.createSelector)(_common.getMyCurrentChannelMembership, function (state) {
    return state.entities.teams.myMembers[state.entities.teams.currentTeamId];
}, _common.getCurrentUser, function (currentChannelMembership, currentTeamMembership, currentUser) {
    var roles = '';
    if (currentTeamMembership) {
        roles += currentTeamMembership.roles + ' ';
    }

    if (currentChannelMembership) {
        roles += currentChannelMembership.roles + ' ';
    }

    if (currentUser) {
        roles += currentUser.roles;
    }
    return roles.trim();
});

var getCurrentUserMentionKeys = exports.getCurrentUserMentionKeys = (0, _reselect.createSelector)(_common.getCurrentUser, function (user) {
    var keys = [];

    if (!user || !user.notify_props) {
        return keys;
    }

    if (user.notify_props.mention_keys) {
        keys = keys.concat(user.notify_props.mention_keys.split(',').map(function (key) {
            return { key: key };
        }));
    }

    if (user.notify_props.first_name === 'true' && user.first_name) {
        keys.push({ key: user.first_name, caseSensitive: true });
    }

    if (user.notify_props.channel === 'true') {
        keys.push({ key: '@channel' });
        keys.push({ key: '@all' });
        keys.push({ key: '@here' });
    }

    var usernameKey = '@' + user.username;
    if (keys.findIndex(function (key) {
        return key.key === usernameKey;
    }) === -1) {
        keys.push({ key: usernameKey });
    }

    return keys;
});

var getProfileSetInCurrentChannel = exports.getProfileSetInCurrentChannel = (0, _reselect.createSelector)(_common.getCurrentChannelId, getUserIdsInChannels, function (currentChannel, channelProfiles) {
    return channelProfiles[currentChannel];
});

var getProfileSetNotInCurrentChannel = exports.getProfileSetNotInCurrentChannel = (0, _reselect.createSelector)(_common.getCurrentChannelId, getUserIdsNotInChannels, function (currentChannel, channelProfiles) {
    return channelProfiles[currentChannel];
});

var getProfileSetInCurrentTeam = exports.getProfileSetInCurrentTeam = (0, _reselect.createSelector)(function (state) {
    return state.entities.teams.currentTeamId;
}, getUserIdsInTeams, function (currentTeam, teamProfiles) {
    return teamProfiles[currentTeam];
});

var getProfileSetNotInCurrentTeam = exports.getProfileSetNotInCurrentTeam = (0, _reselect.createSelector)(function (state) {
    return state.entities.teams.currentTeamId;
}, getUserIdsNotInTeams, function (currentTeam, teamProfiles) {
    return teamProfiles[currentTeam];
});

var PROFILE_SET_ALL = 'all';
function sortAndInjectProfiles(profiles, profileSet) {
    var skipInactive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var currentProfiles = [];
    if (typeof profileSet === 'undefined') {
        return currentProfiles;
    } else if (profileSet === PROFILE_SET_ALL) {
        currentProfiles = Object.values(profiles);
    } else {
        currentProfiles = Array.from(profileSet).map(function (p) {
            return profiles[p];
        });
    }

    currentProfiles = currentProfiles.filter(function (profile) {
        return Boolean(profile);
    });

    if (skipInactive) {
        currentProfiles = currentProfiles.filter(function (profile) {
            return !(profile.delete_at && profile.delete_at !== 0);
        });
    }

    return currentProfiles.sort(_user_utils.sortByUsername);
}

var getProfiles = exports.getProfiles = (0, _reselect.createSelector)(_common.getUsers, function (profiles) {
    return sortAndInjectProfiles(profiles, PROFILE_SET_ALL);
});

var getProfilesInCurrentChannel = exports.getProfilesInCurrentChannel = (0, _reselect.createSelector)(_common.getUsers, getProfileSetInCurrentChannel, function (profiles, currentChannelProfileSet) {
    return sortAndInjectProfiles(profiles, currentChannelProfileSet);
});

var getProfilesNotInCurrentChannel = exports.getProfilesNotInCurrentChannel = (0, _reselect.createSelector)(_common.getUsers, getProfileSetNotInCurrentChannel, function (profiles, notInCurrentChannelProfileSet) {
    return sortAndInjectProfiles(profiles, notInCurrentChannelProfileSet);
});

var getProfilesInCurrentTeam = exports.getProfilesInCurrentTeam = (0, _reselect.createSelector)(_common.getUsers, getProfileSetInCurrentTeam, function (profiles, currentTeamProfileSet) {
    return sortAndInjectProfiles(profiles, currentTeamProfileSet);
});

var getProfilesInTeam = exports.getProfilesInTeam = (0, _reselect.createSelector)(_common.getUsers, getUserIdsInTeams, function (state, teamId) {
    return teamId;
}, function (profiles, usersInTeams, teamId) {
    return sortAndInjectProfiles(profiles, usersInTeams[teamId] || new Set());
});

var getProfilesNotInCurrentTeam = exports.getProfilesNotInCurrentTeam = (0, _reselect.createSelector)(_common.getUsers, getProfileSetNotInCurrentTeam, function (profiles, notInCurrentTeamProfileSet) {
    return sortAndInjectProfiles(profiles, notInCurrentTeamProfileSet);
});

var getProfilesWithoutTeam = exports.getProfilesWithoutTeam = (0, _reselect.createSelector)(_common.getUsers, getUserIdsWithoutTeam, function (profiles, withoutTeamProfileSet) {
    return sortAndInjectProfiles(profiles, withoutTeamProfileSet);
});

function getStatusForUserId(state, userId) {
    return getUserStatuses(state)[userId];
}

function getTotalUsersStats(state) {
    return state.entities.users.stats;
}

function searchProfiles(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(Object.values((0, _common.getUsers)(state)), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesInCurrentChannel(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesInCurrentChannel(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesNotInCurrentChannel(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesNotInCurrentChannel(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesInCurrentTeam(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesInCurrentTeam(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesInTeam(state, teamId, term) {
    var skipCurrent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesInTeam(state, teamId), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesNotInCurrentTeam(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesNotInCurrentTeam(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function searchProfilesWithoutTeam(state, term) {
    var skipCurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var profiles = (0, _user_utils.filterProfilesMatchingTerm)(getProfilesWithoutTeam(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, (0, _common.getCurrentUserId)(state));
    }

    return profiles;
}

function removeCurrentUserFromList(profiles, currentUserId) {
    var index = profiles.findIndex(function (p) {
        return p.id === currentUserId;
    });
    if (index >= 0) {
        profiles.splice(index, 1);
    }
}

var shouldShowTermsOfService = exports.shouldShowTermsOfService = (0, _reselect.createSelector)(_general.getConfig, _common.getCurrentUser, _general.getLicense, function (config, user, license) {
    // Defaults to false if the setting doesn't exist
    return Boolean(license.IsLicensed === 'true' && config.EnableCustomTermsOfService === 'true' && user && config.CustomTermsOfServiceId !== user.accepted_terms_of_service_id);
});

var getUsersInVisibleDMs = exports.getUsersInVisibleDMs = (0, _reselect.createSelector)(_common.getUsers, _preferences.getDirectShowPreferences, function (users, preferences) {
    var dmUsers = [];
    preferences.forEach(function (pref) {
        if (pref.value === 'true' && users[pref.name]) {
            dmUsers.push(users[pref.name]);
        }
    });
    return dmUsers;
});

function makeGetProfilesForReactions() {
    return (0, _reselect.createSelector)(_common.getUsers, function (state, reactions) {
        return reactions;
    }, function (users, reactions) {
        var profiles = [];
        reactions.forEach(function (r) {
            if (users[r.user_id]) {
                profiles.push(users[r.user_id]);
            }
        });
        return profiles;
    });
}

function makeGetProfilesInChannel() {
    return (0, _reselect.createSelector)(_common.getUsers, getUserIdsInChannels, function (state, channelId) {
        return channelId;
    }, function (state, channelId, skipInactive) {
        return skipInactive;
    }, function (users, userIds, channelId) {
        var skipInactive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var userIdsInChannel = userIds[channelId];

        if (!userIdsInChannel) {
            return [];
        }

        return sortAndInjectProfiles(users, userIdsInChannel, skipInactive);
    });
}

function makeGetProfilesByIdsAndUsernames() {
    return (0, _reselect.createSelector)(_common.getUsers, getUsersByUsername, function (state, props) {
        return props.allUserIds;
    }, function (state, props) {
        return props.allUsernames;
    }, function (allProfilesById, allProfilesByUsername, allUserIds, allUsernames) {
        var userProfiles = [];

        if (allUserIds && allUserIds.length > 0) {
            var profilesById = allUserIds.filter(function (userId) {
                return allProfilesById[userId];
            }).map(function (userId) {
                return allProfilesById[userId];
            });

            if (profilesById && profilesById.length > 0) {
                userProfiles.push.apply(userProfiles, _toConsumableArray(profilesById));
            }
        }

        if (allUsernames && allUsernames.length > 0) {
            var profilesByUsername = allUsernames.filter(function (username) {
                return allProfilesByUsername[username];
            }).map(function (username) {
                return allProfilesByUsername[username];
            });

            if (profilesByUsername && profilesByUsername.length > 0) {
                userProfiles.push.apply(userProfiles, _toConsumableArray(profilesByUsername));
            }
        }

        return userProfiles;
    });
}