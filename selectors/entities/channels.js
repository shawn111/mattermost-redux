'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterPostIds = exports.getSortedDirectChannelIds = exports.getDirectAndGroupChannels = exports.getSortedDirectChannelWithUnreadsIds = exports.getSortedPrivateChannelIds = exports.getSortedPrivateChannelWithUnreadsIds = exports.getSortedPublicChannelIds = exports.getSortedPublicChannelWithUnreadsIds = exports.getSortedFavoriteChannelIds = exports.getSortedFavoriteChannelWithUnreadsIds = exports.getSortedUnreadChannelIds = exports.getUnreadChannelIds = exports.getChannelIdsForCurrentTeam = exports.getChannelIdsInCurrentTeam = exports.getDirectChannelIds = exports.canManageChannelMembers = exports.getUnreadsInCurrentTeam = exports.getUnreads = exports.getMembersInCurrentChannel = exports.getDefaultChannel = exports.getChannelsWithUnreadSection = exports.getChannelsByCategory = exports.getOtherChannels = exports.getMyChannels = exports.getGroupChannels = exports.getDirectChannels = exports.getChannelsNameMapInCurrentTeam = exports.getChannelsInCurrentTeam = exports.getChannelSetInCurrentTeam = exports.isCurrentChannelDefault = exports.isCurrentChannelArchived = exports.isCurrentChannelMuted = exports.isCurrentChannelFavorite = exports.getCurrentChannelStats = exports.getMyChannelMember = exports.getCurrentChannel = exports.getChannel = exports.getDirectChannelsSet = exports.getMyCurrentChannelMembership = exports.getMyChannelMemberships = exports.getCurrentChannelId = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getAllChannels = getAllChannels;
exports.getAllChannelStats = getAllChannelStats;
exports.getChannelsInTeam = getChannelsInTeam;
exports.getChannelMembersInChannels = getChannelMembersInChannels;
exports.makeGetChannel = makeGetChannel;
exports.isCurrentChannelReadOnly = isCurrentChannelReadOnly;
exports.isChannelReadOnlyById = isChannelReadOnlyById;
exports.isChannelReadOnly = isChannelReadOnly;
exports.shouldHideDefaultChannel = shouldHideDefaultChannel;
exports.getChannelByName = getChannelByName;
exports.getGroupOrDirectChannelVisibility = getGroupOrDirectChannelVisibility;

var _reselect = require('reselect');

var _constants = require('../../constants');

var _common = require('./common');

var _general = require('./general');

var _preferences = require('./preferences');

var _posts = require('./posts');

var _teams = require('./teams');

var _roles = require('./roles');

var _users = require('./users');

var _channel_utils = require('../../utils/channel_utils');

var _helpers = require('../../utils/helpers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.getCurrentChannelId = _common.getCurrentChannelId;
exports.getMyChannelMemberships = _common.getMyChannelMemberships;
exports.getMyCurrentChannelMembership = _common.getMyCurrentChannelMembership;
function getAllChannels(state) {
    return state.entities.channels.channels;
}

function getAllChannelStats(state) {
    return state.entities.channels.stats;
}

function getChannelsInTeam(state) {
    return state.entities.channels.channelsInTeam;
}

var getDirectChannelsSet = exports.getDirectChannelsSet = (0, _reselect.createSelector)(getChannelsInTeam, function (channelsInTeam) {
    return channelsInTeam[''] || new Set();
});

function getChannelMembersInChannels(state) {
    return state.entities.channels.membersInChannel;
}

function makeGetChannel() {
    return (0, _reselect.createSelector)(getAllChannels, function (state, props) {
        return props.id;
    }, function (state) {
        return state.entities.users;
    }, _preferences.getTeammateNameDisplaySetting, function (allChannels, channelId, users, teammateNameDisplay) {
        var channel = allChannels[channelId];
        if (channel) {
            return (0, _channel_utils.completeDirectChannelInfo)(users, teammateNameDisplay, channel);
        }
        return channel;
    });
}

var getChannel = exports.getChannel = (0, _reselect.createSelector)(getAllChannels, function (state, id) {
    return id;
}, function (state) {
    return state.entities.users;
}, _preferences.getTeammateNameDisplaySetting, function (allChannels, channelId, users, teammateNameDisplay) {
    var channel = allChannels[channelId];
    if (channel) {
        return (0, _channel_utils.completeDirectChannelInfo)(users, teammateNameDisplay, channel);
    }
    return channel;
});

var getCurrentChannel = exports.getCurrentChannel = (0, _reselect.createSelector)(getAllChannels, _common.getCurrentChannelId, function (state) {
    return state.entities.users;
}, _preferences.getTeammateNameDisplaySetting, function (allChannels, currentChannelId, users, teammateNameDisplay) {
    var channel = allChannels[currentChannelId];
    if (channel) {
        return (0, _channel_utils.completeDirectChannelInfo)(users, teammateNameDisplay, channel);
    }
    return channel;
});

var getMyChannelMember = exports.getMyChannelMember = (0, _reselect.createSelector)(_common.getMyChannelMemberships, function (state, channelId) {
    return channelId;
}, function (channelMemberships, channelId) {
    return channelMemberships[channelId] || {};
});

var getCurrentChannelStats = exports.getCurrentChannelStats = (0, _reselect.createSelector)(getAllChannelStats, _common.getCurrentChannelId, function (allChannelStats, currentChannelId) {
    return allChannelStats[currentChannelId];
});

var isCurrentChannelFavorite = exports.isCurrentChannelFavorite = (0, _reselect.createSelector)(_preferences.getMyPreferences, _common.getCurrentChannelId, function (preferences, channelId) {
    return (0, _channel_utils.isFavoriteChannel)(preferences, channelId);
});

var isCurrentChannelMuted = exports.isCurrentChannelMuted = (0, _reselect.createSelector)(_common.getMyCurrentChannelMembership, function (membership) {
    return (0, _channel_utils.isChannelMuted)(membership);
});

var isCurrentChannelArchived = exports.isCurrentChannelArchived = (0, _reselect.createSelector)(getCurrentChannel, function (channel) {
    return channel.delete_at !== 0;
});

var isCurrentChannelDefault = exports.isCurrentChannelDefault = (0, _reselect.createSelector)(getCurrentChannel, function (channel) {
    return (0, _channel_utils.isDefault)(channel);
});

function isCurrentChannelReadOnly(state) {
    return isChannelReadOnly(state, getCurrentChannel(state));
}

function isChannelReadOnlyById(state, channelId) {
    return isChannelReadOnly(state, getChannel(state, channelId));
}

function isChannelReadOnly(state, channel) {
    return channel && channel.name === _constants.General.DEFAULT_CHANNEL && !(0, _users.isCurrentUserSystemAdmin)(state) && (0, _general.getConfig)(state).ExperimentalTownSquareIsReadOnly === 'true';
}

function shouldHideDefaultChannel(state, channel) {
    return channel && channel.name === _constants.General.DEFAULT_CHANNEL && !(0, _users.isCurrentUserSystemAdmin)(state) && (0, _general.getConfig)(state).ExperimentalHideTownSquareinLHS === 'true';
}

function getChannelByName(state, channelName) {
    return (0, _channel_utils.getChannelByName)(getAllChannels(state), channelName);
}

var getChannelSetInCurrentTeam = exports.getChannelSetInCurrentTeam = (0, _reselect.createSelector)(_teams.getCurrentTeamId, getChannelsInTeam, function (currentTeamId, channelsInTeam) {
    return channelsInTeam[currentTeamId] || [];
});

function sortAndInjectChannels(channels, channelSet, locale) {
    var currentChannels = [];
    if (typeof channelSet === 'undefined') {
        return currentChannels;
    }

    channelSet.forEach(function (c) {
        currentChannels.push(channels[c]);
    });

    return currentChannels.sort(_channel_utils.sortChannelsByDisplayName.bind(null, locale));
}

var getChannelsInCurrentTeam = exports.getChannelsInCurrentTeam = (0, _reselect.createSelector)(getAllChannels, getChannelSetInCurrentTeam, _common.getCurrentUser, function (channels, currentTeamChannelSet, currentUser) {
    var locale = _constants.General.DEFAULT_LOCALE;
    if (currentUser && currentUser.locale) {
        locale = currentUser.locale;
    }
    return sortAndInjectChannels(channels, currentTeamChannelSet, locale);
});

var getChannelsNameMapInCurrentTeam = exports.getChannelsNameMapInCurrentTeam = (0, _reselect.createSelector)(getAllChannels, getChannelSetInCurrentTeam, function (channels, currentTeamChannelSet) {
    var channelMap = {};
    currentTeamChannelSet.forEach(function (id) {
        var channel = channels[id];
        channelMap[channel.name] = channel;
    });
    return channelMap;
});

// Returns both DMs and GMs
var getDirectChannels = exports.getDirectChannels = (0, _reselect.createSelector)(getAllChannels, getDirectChannelsSet, function (state) {
    return state.entities.users;
}, _preferences.getTeammateNameDisplaySetting, function (channels, channelSet, users, teammateNameDisplay) {
    var dmChannels = [];
    channelSet.forEach(function (c) {
        dmChannels.push((0, _channel_utils.completeDirectChannelInfo)(users, teammateNameDisplay, channels[c]));
    });
    return dmChannels;
});

// Returns only GMs
var getGroupChannels = exports.getGroupChannels = (0, _reselect.createSelector)(getAllChannels, getDirectChannelsSet, function (state) {
    return state.entities.users;
}, _preferences.getTeammateNameDisplaySetting, function (channels, channelSet, users, teammateNameDisplay) {
    var gmChannels = [];
    channelSet.forEach(function (id) {
        var channel = channels[id];
        if (channel.type === _constants.General.GM_CHANNEL) {
            gmChannels.push((0, _channel_utils.completeDirectChannelInfo)(users, teammateNameDisplay, channel));
        }
    });
    return gmChannels;
});

var getMyChannels = exports.getMyChannels = (0, _reselect.createSelector)(getChannelsInCurrentTeam, getDirectChannels, _common.getMyChannelMemberships, function (channels, directChannels, myMembers) {
    return [].concat(_toConsumableArray(channels), _toConsumableArray(directChannels)).filter(function (c) {
        return myMembers.hasOwnProperty(c.id);
    });
});

var getOtherChannels = exports.getOtherChannels = (0, _reselect.createSelector)(getChannelsInCurrentTeam, _common.getMyChannelMemberships, function (channels, myMembers) {
    return channels.filter(function (c) {
        return !myMembers.hasOwnProperty(c.id) && c.type === _constants.General.OPEN_CHANNEL;
    });
});

var getChannelsByCategory = exports.getChannelsByCategory = (0, _reselect.createSelector)(_common.getCurrentChannelId, getMyChannels, _common.getMyChannelMemberships, _general.getConfig, _preferences.getMyPreferences, _preferences.getTeammateNameDisplaySetting, function (state) {
    return state.entities.users;
}, _posts.getLastPostPerChannel, function (currentChannelId, channels, myMembers, config, myPreferences, teammateNameDisplay, usersState, lastPosts) {
    var allChannels = channels.map(function (c) {
        var channel = _extends({}, c);
        channel.isCurrent = c.id === currentChannelId;
        return channel;
    });

    return (0, _channel_utils.buildDisplayableChannelList)(usersState, allChannels, myMembers, config, myPreferences, teammateNameDisplay, lastPosts);
});

var getChannelsWithUnreadSection = exports.getChannelsWithUnreadSection = (0, _reselect.createSelector)(_common.getCurrentChannelId, getMyChannels, _common.getMyChannelMemberships, _general.getConfig, _preferences.getMyPreferences, _preferences.getTeammateNameDisplaySetting, function (state) {
    return state.entities.users;
}, _posts.getLastPostPerChannel, function (currentChannelId, channels, myMembers, config, myPreferences, teammateNameDisplay, usersState, lastPosts) {
    var allChannels = channels.map(function (c) {
        var channel = _extends({}, c);
        channel.isCurrent = c.id === currentChannelId;
        return channel;
    });

    return (0, _channel_utils.buildDisplayableChannelListWithUnreadSection)(usersState, allChannels, myMembers, config, myPreferences, teammateNameDisplay, lastPosts);
});

var getDefaultChannel = exports.getDefaultChannel = (0, _reselect.createSelector)(getAllChannels, _teams.getCurrentTeamId, function (channels, teamId) {
    return Object.values(channels).find(function (c) {
        return c && c.team_id === teamId && c.name === _constants.General.DEFAULT_CHANNEL;
    });
});

var getMembersInCurrentChannel = exports.getMembersInCurrentChannel = (0, _reselect.createSelector)(_common.getCurrentChannelId, getChannelMembersInChannels, function (currentChannelId, members) {
    return members[currentChannelId];
});

var getUnreads = exports.getUnreads = (0, _reselect.createSelector)(getAllChannels, _common.getMyChannelMemberships, _common.getUsers, _users.getCurrentUserId, function (channels, myMembers, users, currentUserId) {
    var messageCount = 0;
    var mentionCount = 0;
    Object.keys(myMembers).forEach(function (channelId) {
        var channel = channels[channelId];
        var m = myMembers[channelId];

        if (channel && m) {
            var otherUserId = void 0;
            if (channel.type === 'D') {
                otherUserId = (0, _channel_utils.getUserIdFromChannelName)(currentUserId, channel.name);
                if (users[otherUserId] && users[otherUserId].delete_at === 0) {
                    mentionCount += channel.total_msg_count - m.msg_count;
                }
            } else if (m.mention_count > 0 && channel.delete_at === 0) {
                mentionCount += m.mention_count;
            }
            if (m.notify_props && m.notify_props.mark_unread !== 'mention' && channel.total_msg_count - m.msg_count > 0) {
                if (channel.type === 'D') {
                    if (users[otherUserId] && users[otherUserId].delete_at === 0) {
                        messageCount += 1;
                    }
                } else if (channel.delete_at === 0) {
                    messageCount += 1;
                }
            }
        }
    });

    return { messageCount: messageCount, mentionCount: mentionCount };
});

var getUnreadsInCurrentTeam = exports.getUnreadsInCurrentTeam = (0, _reselect.createSelector)(_common.getCurrentChannelId, getMyChannels, _common.getMyChannelMemberships, _common.getUsers, _users.getCurrentUserId, function (currentChannelId, channels, myMembers, users, currentUserId) {
    var messageCount = 0;
    var mentionCount = 0;

    channels.forEach(function (channel) {
        var m = myMembers[channel.id];
        if (m && channel.id !== currentChannelId) {
            var otherUserId = void 0;
            if (channel.type === 'D') {
                otherUserId = (0, _channel_utils.getUserIdFromChannelName)(currentUserId, channel.name);
                if (users[otherUserId] && users[otherUserId].delete_at === 0) {
                    mentionCount += channel.total_msg_count - m.msg_count;
                }
            } else if (m.mention_count > 0 && channel.delete_at === 0) {
                mentionCount += m.mention_count;
            }
            if (m.notify_props && m.notify_props.mark_unread !== 'mention' && channel.total_msg_count - m.msg_count > 0) {
                if (channel.type === 'D') {
                    if (users[otherUserId] && users[otherUserId].delete_at === 0) {
                        messageCount += 1;
                    }
                } else if (channel.delete_at === 0) {
                    messageCount += 1;
                }
            }
        }
    });

    return { messageCount: messageCount, mentionCount: mentionCount };
});

var canManageChannelMembers = exports.canManageChannelMembers = (0, _reselect.createSelector)(getCurrentChannel, _common.getCurrentUser, _teams.getCurrentTeamMembership, _common.getMyCurrentChannelMembership, _general.getConfig, _general.getLicense, _general.hasNewPermissions, function (state) {
    return (0, _roles.haveICurrentChannelPermission)(state, { permission: _constants.Permissions.MANAGE_PRIVATE_CHANNEL_MEMBERS });
}, function (state) {
    return (0, _roles.haveICurrentChannelPermission)(state, { permission: _constants.Permissions.MANAGE_PUBLIC_CHANNEL_MEMBERS });
}, function (channel, user, teamMembership, channelMembership, config, license, newPermissions, managePrivateMembers, managePublicMembers) {
    if (!channel) {
        return false;
    }

    if (channel.type === _constants.General.DM_CHANNEL || channel.type === _constants.General.GM_CHANNEL || channel.name === _constants.General.DEFAULT_CHANNEL) {
        return false;
    }

    if (newPermissions) {
        if (channel.type === _constants.General.OPEN_CHANNEL) {
            return managePublicMembers;
        } else if (channel.type === _constants.General.PRIVATE_CHANNEL) {
            return managePrivateMembers;
        }
        return true;
    }
    return (0, _channel_utils.canManageMembersOldPermissions)(channel, user, teamMembership, channelMembership, config, license);
});

var getDirectChannelIds = exports.getDirectChannelIds = (0, _helpers.createIdsSelector)(getDirectChannelsSet, function (directIds) {
    return Array.from(directIds);
});

var getChannelIdsInCurrentTeam = exports.getChannelIdsInCurrentTeam = (0, _helpers.createIdsSelector)(_teams.getCurrentTeamId, getChannelsInTeam, function (currentTeamId, channelsInTeam) {
    return Array.from(channelsInTeam[currentTeamId] || []);
});

var getChannelIdsForCurrentTeam = exports.getChannelIdsForCurrentTeam = (0, _helpers.createIdsSelector)(getChannelIdsInCurrentTeam, getDirectChannelIds, function (channels, direct) {
    return [].concat(_toConsumableArray(channels), _toConsumableArray(direct));
});

var getUnreadChannelIds = exports.getUnreadChannelIds = (0, _helpers.createIdsSelector)(getAllChannels, _common.getMyChannelMemberships, getChannelIdsForCurrentTeam, function (state) {
    var lastUnreadChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return lastUnreadChannel;
}, function (channels, members, teamChannelIds, lastUnreadChannel) {
    var unreadIds = teamChannelIds.filter(function (id) {
        var c = channels[id];
        var m = members[id];

        if (c && m) {
            var chHasUnread = c.total_msg_count - m.msg_count > 0;
            var chHasMention = m.mention_count > 0;
            if (m.notify_props && m.notify_props.mark_unread !== 'mention' && chHasUnread || chHasMention) {
                return true;
            }
        }
        return false;
    });

    if (lastUnreadChannel && !unreadIds.includes(lastUnreadChannel.id)) {
        unreadIds.push(lastUnreadChannel.id);
    }

    return unreadIds;
});

function filterUnreadChannels(unreadIds, channelIds) {
    return channelIds.filter(function (id) {
        return !unreadIds.includes(id);
    });
}

var getSortedUnreadChannelIds = exports.getSortedUnreadChannelIds = (0, _helpers.createIdsSelector)(_common.getCurrentUser, _common.getUsers, getAllChannels, _common.getMyChannelMemberships, getUnreadChannelIds, _preferences.getTeammateNameDisplaySetting, function (state) {
    var lastUnreadChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return lastUnreadChannel;
}, function (currentUser, profiles, channels, myMembers, unreadIds, settings, lastUnreadChannel) {
    // If we receive an unread for a channel and then a mention the channel
    // won't be sorted correctly until we receive a message in another channel
    if (!currentUser) {
        return [];
    }

    var locale = currentUser.locale || _constants.General.DEFAULT_LOCALE;
    var allUnreadChannels = unreadIds.map(function (id) {
        var c = channels[id];

        if (c.delete_at !== 0) {
            return false;
        }

        if (c.type === _constants.General.DM_CHANNEL || c.type === _constants.General.GM_CHANNEL) {
            return (0, _channel_utils.completeDirectChannelDisplayName)(currentUser.id, profiles, settings, c);
        }

        return c;
    }).filter(function (c) {
        return c;
    }).sort(function (a, b) {
        var aMember = myMembers[a.id];
        var bMember = myMembers[b.id];
        var aIsMention = a.type === _constants.General.DM_CHANNEL || aMember && aMember.mention_count > 0;
        var bIsMention = b.type === _constants.General.DM_CHANNEL || bMember && bMember.mention_count > 0;

        if (lastUnreadChannel && b.id === lastUnreadChannel.id && lastUnreadChannel.hadMentions) {
            bIsMention = true;
        }

        if (aIsMention === bIsMention && (0, _channel_utils.isChannelMuted)(bMember) === (0, _channel_utils.isChannelMuted)(aMember)) {
            return (0, _channel_utils.sortChannelsByDisplayName)(locale, a, b);
        } else if (aIsMention || (0, _channel_utils.isChannelMuted)(bMember) && !(0, _channel_utils.isChannelMuted)(aMember)) {
            return -1;
        }

        return 1;
    });

    return allUnreadChannels.map(function (c) {
        return c.id;
    });
});

var getSortedFavoriteChannelWithUnreadsIds = exports.getSortedFavoriteChannelWithUnreadsIds = (0, _helpers.createIdsSelector)(_common.getCurrentUser, _common.getUsers, getAllChannels, _common.getMyChannelMemberships, _preferences.getFavoritesPreferences, getChannelIdsForCurrentTeam, _preferences.getTeammateNameDisplaySetting, _general.getConfig, _preferences.getMyPreferences, _common.getCurrentChannelId, function (currentUser, profiles, channels, myMembers, favoriteIds, teamChannelIds, settings, config, prefs, currentChannelId) {
    if (!currentUser) {
        return [];
    }

    var locale = currentUser.locale || _constants.General.DEFAULT_LOCALE;
    var favoriteChannel = favoriteIds.filter(function (id) {
        if (!myMembers[id] || !channels[id]) {
            return false;
        }

        var channel = channels[id];
        var otherUserId = (0, _channel_utils.getUserIdFromChannelName)(currentUser.id, channel.name);

        if (channel.delete_at !== 0 && channel.id !== currentChannelId) {
            return false;
        }

        // Deleted users from CLI will not have a profiles entry
        if (channel.type === _constants.General.DM_CHANNEL && !profiles[otherUserId]) {
            return false;
        }

        if (channel.type === _constants.General.DM_CHANNEL && !(0, _channel_utils.isDirectChannelVisible)(profiles[otherUserId] || otherUserId, config, prefs, channel, null, null, currentChannelId)) {
            return false;
        } else if (channel.type === _constants.General.GM_CHANNEL && !(0, _channel_utils.isGroupChannelVisible)(config, prefs, channel)) {
            return false;
        }

        return teamChannelIds.includes(id);
    }).map(function (id) {
        var c = channels[id];
        if (c.type === _constants.General.DM_CHANNEL || c.type === _constants.General.GM_CHANNEL) {
            return (0, _channel_utils.completeDirectChannelDisplayName)(currentUser.id, profiles, settings, c);
        }

        return c;
    }).sort(_channel_utils.sortChannelsByDisplayNameAndMuted.bind(null, locale, myMembers));
    return favoriteChannel.map(function (f) {
        return f.id;
    });
});

var getSortedFavoriteChannelIds = exports.getSortedFavoriteChannelIds = (0, _helpers.createIdsSelector)(getUnreadChannelIds, getSortedFavoriteChannelWithUnreadsIds, filterUnreadChannels);

var getSortedPublicChannelWithUnreadsIds = exports.getSortedPublicChannelWithUnreadsIds = (0, _helpers.createIdsSelector)(_common.getCurrentUser, getAllChannels, _common.getMyChannelMemberships, getChannelIdsForCurrentTeam, getSortedFavoriteChannelWithUnreadsIds, function (currentUser, channels, myMembers, teamChannelIds, favoriteIds) {
    if (!currentUser) {
        return [];
    }

    var locale = currentUser.locale || _constants.General.DEFAULT_LOCALE;
    var publicChannels = teamChannelIds.filter(function (id) {
        if (!myMembers[id]) {
            return false;
        }
        var channel = channels[id];
        return !favoriteIds.includes(id) && teamChannelIds.includes(id) && channel.type === _constants.General.OPEN_CHANNEL;
    }).map(function (id) {
        return channels[id];
    }).sort(_channel_utils.sortChannelsByDisplayNameAndMuted.bind(null, locale, myMembers));

    return publicChannels.map(function (c) {
        return c.id;
    });
});

var getSortedPublicChannelIds = exports.getSortedPublicChannelIds = (0, _helpers.createIdsSelector)(getUnreadChannelIds, getSortedPublicChannelWithUnreadsIds, filterUnreadChannels);

var getSortedPrivateChannelWithUnreadsIds = exports.getSortedPrivateChannelWithUnreadsIds = (0, _helpers.createIdsSelector)(_common.getCurrentUser, getAllChannels, _common.getMyChannelMemberships, getChannelIdsForCurrentTeam, getSortedFavoriteChannelWithUnreadsIds, function (currentUser, channels, myMembers, teamChannelIds, favoriteIds) {
    if (!currentUser) {
        return [];
    }

    var locale = currentUser.locale || _constants.General.DEFAULT_LOCALE;
    var privateChannels = teamChannelIds.filter(function (id) {
        if (!myMembers[id]) {
            return false;
        }
        var channel = channels[id];
        return !favoriteIds.includes(id) && teamChannelIds.includes(id) && channel.type === _constants.General.PRIVATE_CHANNEL;
    }).map(function (id) {
        return channels[id];
    }).sort(_channel_utils.sortChannelsByDisplayNameAndMuted.bind(null, locale, myMembers));
    return privateChannels.map(function (c) {
        return c.id;
    });
});

var getSortedPrivateChannelIds = exports.getSortedPrivateChannelIds = (0, _helpers.createIdsSelector)(getUnreadChannelIds, getSortedPrivateChannelWithUnreadsIds, filterUnreadChannels);

var getSortedDirectChannelWithUnreadsIds = exports.getSortedDirectChannelWithUnreadsIds = (0, _helpers.createIdsSelector)(_common.getCurrentUser, _common.getUsers, getAllChannels, _common.getMyChannelMemberships, _preferences.getVisibleTeammate, _preferences.getVisibleGroupIds, getSortedFavoriteChannelWithUnreadsIds, _preferences.getTeammateNameDisplaySetting, _general.getConfig, _preferences.getMyPreferences, _posts.getLastPostPerChannel, _common.getCurrentChannelId, function (currentUser, profiles, channels, myMembers, teammates, groupIds, favoriteIds, settings, config, preferences, lastPosts, currentChannelId) {
    if (!currentUser) {
        return [];
    }

    var locale = currentUser.locale || _constants.General.DEFAULT_LOCALE;
    var channelValues = Object.values(channels);
    var directChannelsIds = [];
    teammates.reduce(function (result, teammateId) {
        var name = (0, _channel_utils.getDirectChannelName)(currentUser.id, teammateId);
        var channel = channelValues.find(function (c) {
            return c.name === name;
        }); //eslint-disable-line max-nested-callbacks
        if (channel) {
            var lastPost = lastPosts[channel.id];
            var otherUser = profiles[(0, _channel_utils.getUserIdFromChannelName)(currentUser.id, channel.name)];
            if (!favoriteIds.includes(channel.id) && !(0, _channel_utils.isAutoClosed)(config, preferences, channel, lastPost ? lastPost.create_at : 0, otherUser ? otherUser.delete_at : 0, currentChannelId)) {
                result.push(channel.id);
            }
        }
        return result;
    }, directChannelsIds);
    var directChannels = groupIds.filter(function (id) {
        var channel = channels[id];
        if (channel) {
            var lastPost = lastPosts[channel.id];
            return !favoriteIds.includes(id) && !(0, _channel_utils.isAutoClosed)(config, preferences, channels[id], lastPost ? lastPost.create_at : 0, currentChannelId);
        }

        return false;
    }).concat(directChannelsIds).map(function (id) {
        var channel = channels[id];
        return (0, _channel_utils.completeDirectChannelDisplayName)(currentUser.id, profiles, settings, channel);
    }).sort(_channel_utils.sortChannelsByDisplayNameAndMuted.bind(null, locale, myMembers));
    return directChannels.map(function (c) {
        return c.id;
    });
});

// getDirectAndGroupChannels returns all direct and group channels, even if they have been manually
// or automatically closed.
//
// This is similar to the getDirectChannels above (which actually also returns group channels,
// but suppresses manually closed group channels but not manually closed direct channels.) This
// method does away with all the suppression, since the webapp client downstream uses this for
// the channel switcher and puts such suppressed channels in a separate category.
var getDirectAndGroupChannels = exports.getDirectAndGroupChannels = (0, _reselect.createSelector)(_common.getCurrentUser, _common.getUsers, getAllChannels, _preferences.getTeammateNameDisplaySetting, function (currentUser, profiles, channels, settings) {
    if (!currentUser) {
        return [];
    }

    return Object.values(channels).filter(function (channel) {
        return Boolean(channel);
    }).filter(function (channel) {
        return channel.type === _constants.General.DM_CHANNEL || channel.type === _constants.General.GM_CHANNEL;
    }).map(function (channel) {
        return (0, _channel_utils.completeDirectChannelDisplayName)(currentUser.id, profiles, settings, channel);
    });
});

var getSortedDirectChannelIds = exports.getSortedDirectChannelIds = (0, _helpers.createIdsSelector)(getUnreadChannelIds, getSortedDirectChannelWithUnreadsIds, filterUnreadChannels);

function getGroupOrDirectChannelVisibility(state, channelId) {
    return (0, _channel_utils.isGroupOrDirectChannelVisible)(getChannel(state, channelId), (0, _common.getMyChannelMemberships)(state), (0, _general.getConfig)(state), (0, _preferences.getMyPreferences)(state), (0, _common.getCurrentUser)(state).id, (0, _common.getUsers)(state), (0, _posts.getLastPostPerChannel)(state));
}

// Filters post IDs by the given condition.
// The condition function receives as parameters the associated channel object and the post object.
var filterPostIds = exports.filterPostIds = function filterPostIds(condition) {
    if (typeof condition !== 'function') {
        throw new TypeError(condition + ' is not a function');
    }
    return (0, _reselect.createSelector)(getAllChannels, _posts.getAllPosts, function (state, postIds) {
        return postIds;
    }, function (channels, posts, postIds) {
        return postIds.filter(function (postId) {
            var post = posts[postId];
            var channel = void 0;
            if (post) {
                channel = channels[post.channel_id];
            }
            return post && channel && condition(channel, post);
        });
    });
};