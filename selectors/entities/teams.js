'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChannelDrawerBadgeCount = exports.getMyTeamsCount = exports.getMySortedTeamIds = exports.getSortedJoinableTeams = exports.getJoinableTeams = exports.getJoinableTeamIds = exports.getMembersInCurrentTeam = exports.getMyTeamMember = exports.getMyTeams = exports.getCurrentTeamStats = exports.getCurrentRelativeTeamUrl = exports.getCurrentTeamUrl = exports.isCurrentUserCurrentTeamAdmin = exports.getCurrentTeamMembership = exports.getCurrentTeam = exports.getTeamsList = exports.getTeamByName = undefined;
exports.getCurrentTeamId = getCurrentTeamId;
exports.getTeams = getTeams;
exports.getTeamStats = getTeamStats;
exports.getTeamMemberships = getTeamMemberships;
exports.getMembersInTeams = getMembersInTeams;
exports.getTeam = getTeam;
exports.getTeamMember = getTeamMember;
exports.makeGetBadgeCountForTeamId = makeGetBadgeCountForTeamId;

var _reselect = require('reselect');

var _general = require('../../constants/general');

var _general2 = require('./general');

var _helpers = require('../../utils/helpers');

var _user_utils = require('../../utils/user_utils');

function getCurrentTeamId(state) {
    return state.entities.teams.currentTeamId;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var getTeamByName = exports.getTeamByName = (0, _reselect.createSelector)(getTeams, function (state, name) {
    return name;
}, function (teams, name) {
    return Object.values(teams).find(function (team) {
        return team.name === name;
    });
});

function getTeams(state) {
    return state.entities.teams.teams;
}

function getTeamStats(state) {
    return state.entities.teams.stats;
}

function getTeamMemberships(state) {
    return state.entities.teams.myMembers;
}

function getMembersInTeams(state) {
    return state.entities.teams.membersInTeam;
}

var getTeamsList = exports.getTeamsList = (0, _reselect.createSelector)(getTeams, function (teams) {
    return Object.values(teams);
});

var getCurrentTeam = exports.getCurrentTeam = (0, _reselect.createSelector)(getTeams, getCurrentTeamId, function (teams, currentTeamId) {
    return teams[currentTeamId];
});

function getTeam(state, id) {
    var teams = getTeams(state);
    return teams[id];
}

var getCurrentTeamMembership = exports.getCurrentTeamMembership = (0, _reselect.createSelector)(getCurrentTeamId, getTeamMemberships, function (currentTeamId, teamMemberships) {
    return teamMemberships[currentTeamId];
});

var isCurrentUserCurrentTeamAdmin = exports.isCurrentUserCurrentTeamAdmin = (0, _reselect.createSelector)(getCurrentTeamMembership, function (member) {
    if (member) {
        var roles = member.roles || '';
        return (0, _user_utils.isTeamAdmin)(roles);
    }
    return false;
});

var getCurrentTeamUrl = exports.getCurrentTeamUrl = (0, _reselect.createSelector)(_general2.getCurrentUrl, getCurrentTeam, function (currentUrl, currentTeam) {
    return currentUrl + '/' + currentTeam.name;
});

var getCurrentRelativeTeamUrl = exports.getCurrentRelativeTeamUrl = (0, _reselect.createSelector)(getCurrentTeam, function (currentTeam) {
    if (!currentTeam) {
        return '/';
    }
    return '/' + currentTeam.name;
});

var getCurrentTeamStats = exports.getCurrentTeamStats = (0, _reselect.createSelector)(getCurrentTeamId, getTeamStats, function (currentTeamId, teamStats) {
    return teamStats[currentTeamId];
});

var getMyTeams = exports.getMyTeams = (0, _reselect.createSelector)(getTeams, getTeamMemberships, function (teams, members) {
    return Object.values(teams).filter(function (t) {
        return members[t.id];
    });
});

var getMyTeamMember = exports.getMyTeamMember = (0, _reselect.createSelector)(getTeamMemberships, function (state, teamId) {
    return teamId;
}, function (teamMemberships, teamId) {
    return teamMemberships[teamId] || {};
});

var getMembersInCurrentTeam = exports.getMembersInCurrentTeam = (0, _reselect.createSelector)(getCurrentTeamId, getMembersInTeams, function (currentTeamId, teamMembers) {
    return teamMembers[currentTeamId];
});

function getTeamMember(state, teamId, userId) {
    var members = getMembersInTeams(state)[teamId];
    if (members) {
        return members[userId];
    }

    return null;
}

var getJoinableTeamIds = exports.getJoinableTeamIds = (0, _helpers.createIdsSelector)(getTeams, getTeamMemberships, function (teams, myMembers) {
    return Object.keys(teams).filter(function (id) {
        var team = teams[id];
        var member = myMembers[id];
        return team.delete_at === 0 && team.allow_open_invite && !member;
    });
});

var getJoinableTeams = exports.getJoinableTeams = (0, _reselect.createSelector)(getTeams, getJoinableTeamIds, function (teams, joinableTeamIds) {
    var openTeams = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = joinableTeamIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var id = _step.value;

            openTeams[id] = teams[id];
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

    return openTeams;
});

var getSortedJoinableTeams = exports.getSortedJoinableTeams = (0, _reselect.createSelector)(getTeams, getJoinableTeamIds, function (state, locale) {
    return locale;
}, function (teams, joinableTeamIds, locale) {
    var openTeams = {};

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = joinableTeamIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var id = _step2.value;

            openTeams[id] = teams[id];
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

    function sortTeams(a, b) {
        if (a.display_name !== b.display_name) {
            return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase(), locale || _general.DEFAULT_LOCALE, { numeric: true });
        }

        return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale || _general.DEFAULT_LOCALE, { numeric: true });
    }

    return Object.values(openTeams).sort(sortTeams);
});

var getMySortedTeamIds = exports.getMySortedTeamIds = (0, _helpers.createIdsSelector)(getTeams, getTeamMemberships, function (state, locale) {
    return locale;
}, function (teams, myMembers, locale) {
    return Object.values(teams).filter(function (t) {
        return myMembers[t.id];
    }).sort(function (a, b) {
        if (a.display_name !== b.display_name) {
            return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase(), locale, { numeric: true });
        }

        return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { numeric: true });
    }).map(function (t) {
        return t.id;
    });
});

var getMyTeamsCount = exports.getMyTeamsCount = (0, _reselect.createSelector)(getTeamMemberships, function (teams) {
    return Object.keys(teams).length;
});

// returns the badge number to show (excluding the current team)
// > 0 means is returning the mention count
// 0 means that there are no unread messages
// -1 means that there are unread messages but no mentions
var getChannelDrawerBadgeCount = exports.getChannelDrawerBadgeCount = (0, _reselect.createSelector)(getCurrentTeamId, getTeamMemberships, function (currentTeamId, teamMembers) {
    var mentionCount = 0;
    var messageCount = 0;
    Object.values(teamMembers).forEach(function (m) {
        if (m.team_id !== currentTeamId) {
            mentionCount += m.mention_count || 0;
            messageCount += m.msg_count || 0;
        }
    });

    var badgeCount = 0;
    if (mentionCount) {
        badgeCount = mentionCount;
    } else if (messageCount) {
        badgeCount = -1;
    }

    return badgeCount;
});

// returns the badge for a team
// > 0 means is returning the mention count
// 0 means that there are no unread messages
// -1 means that there are unread messages but no mentions
function makeGetBadgeCountForTeamId() {
    return (0, _reselect.createSelector)(getTeamMemberships, function (state, id) {
        return id;
    }, function (members, teamId) {
        var member = members[teamId];
        var badgeCount = 0;

        if (member) {
            if (member.mention_count) {
                badgeCount = member.mention_count;
            } else if (member.msg_count) {
                badgeCount = -1;
            }
        }

        return badgeCount;
    });
}