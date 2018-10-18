'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _channelTypeOrder;

exports.buildDisplayableChannelList = buildDisplayableChannelList;
exports.buildDisplayableChannelListWithUnreadSection = buildDisplayableChannelListWithUnreadSection;
exports.completeDirectChannelInfo = completeDirectChannelInfo;
exports.completeDirectChannelDisplayName = completeDirectChannelDisplayName;
exports.cleanUpUrlable = cleanUpUrlable;
exports.getChannelByName = getChannelByName;
exports.getDirectChannelName = getDirectChannelName;
exports.getUserIdFromChannelName = getUserIdFromChannelName;
exports.isAutoClosed = isAutoClosed;
exports.isDirectChannel = isDirectChannel;
exports.isDirectChannelVisible = isDirectChannelVisible;
exports.isGroupChannel = isGroupChannel;
exports.isGroupChannelVisible = isGroupChannelVisible;
exports.isGroupOrDirectChannelVisible = isGroupOrDirectChannelVisible;
exports.showCreateOption = showCreateOption;
exports.showManagementOptions = showManagementOptions;
exports.showDeleteOption = showDeleteOption;
exports.canManageMembersOldPermissions = canManageMembersOldPermissions;
exports.getChannelsIdForTeam = getChannelsIdForTeam;
exports.getGroupDisplayNameFromUserIds = getGroupDisplayNameFromUserIds;
exports.isFavoriteChannel = isFavoriteChannel;
exports.isDefault = isDefault;
exports.isOpenChannel = isOpenChannel;
exports.isPrivateChannel = isPrivateChannel;
exports.sortChannelsByTypeAndDisplayName = sortChannelsByTypeAndDisplayName;
exports.sortChannelsByDisplayName = sortChannelsByDisplayName;
exports.sortChannelsByDisplayNameAndMuted = sortChannelsByDisplayNameAndMuted;
exports.isChannelMuted = isChannelMuted;
exports.filterChannelsMatchingTerm = filterChannelsMatchingTerm;

var _constants = require('../constants');

var _user_utils = require('./user_utils');

var _preference_utils = require('./preference_utils');

var _general = require('../selectors/entities/general');

var _roles = require('../selectors/entities/roles');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var channelTypeOrder = (_channelTypeOrder = {}, _defineProperty(_channelTypeOrder, _constants.General.OPEN_CHANNEL, 0), _defineProperty(_channelTypeOrder, _constants.General.PRIVATE_CHANNEL, 1), _defineProperty(_channelTypeOrder, _constants.General.DM_CHANNEL, 2), _defineProperty(_channelTypeOrder, _constants.General.GM_CHANNEL, 2), _channelTypeOrder);

/**
 * Returns list of sorted channels grouped by type. Favorites here is considered as separated type.
 *
 * Example: {
 *  publicChannels: [...],
 *  privateChannels: [...],
 *  directAndGroupChannels: [...],
 *  favoriteChannels: [...]
 * }
 */
function buildDisplayableChannelList(usersState, allChannels, myMembers, config, myPreferences, teammateNameDisplay, lastPosts) {
    var missingDirectChannels = createMissingDirectChannels(usersState.currentUserId, allChannels, myPreferences);

    var currentUserId = usersState.currentUserId,
        profiles = usersState.profiles;

    var locale = getUserLocale(currentUserId, profiles);

    var channels = buildChannels(usersState, allChannels, missingDirectChannels, teammateNameDisplay, locale);
    var favoriteChannels = buildFavoriteChannels(channels, myPreferences, locale);
    var notFavoriteChannels = buildNotFavoriteChannels(channels, myPreferences);
    var directAndGroupChannels = buildDirectAndGroupChannels(notFavoriteChannels, myMembers, config, myPreferences, currentUserId, profiles, lastPosts);

    return {
        favoriteChannels: favoriteChannels,
        publicChannels: notFavoriteChannels.filter(isOpenChannel),
        privateChannels: notFavoriteChannels.filter(isPrivateChannel),
        directAndGroupChannels: directAndGroupChannels
    };
}

function buildDisplayableChannelListWithUnreadSection(usersState, myChannels, myMembers, config, myPreferences, teammateNameDisplay, lastPosts) {
    var currentUserId = usersState.currentUserId,
        profiles = usersState.profiles;

    var locale = getUserLocale(currentUserId, profiles);

    var missingDirectChannels = createMissingDirectChannels(currentUserId, myChannels, myPreferences);
    var channels = buildChannels(usersState, myChannels, missingDirectChannels, teammateNameDisplay, locale);
    var unreadChannels = [].concat(_toConsumableArray(buildChannelsWithMentions(channels, myMembers, locale)), _toConsumableArray(buildUnreadChannels(channels, myMembers, locale)));
    var notUnreadChannels = channels.filter(not(isUnreadChannel.bind(null, myMembers)));
    var favoriteChannels = buildFavoriteChannels(notUnreadChannels, myPreferences, locale);
    var notFavoriteChannels = buildNotFavoriteChannels(notUnreadChannels, myPreferences);
    var directAndGroupChannels = buildDirectAndGroupChannels(notFavoriteChannels, myMembers, config, myPreferences, currentUserId, profiles, lastPosts);

    return {
        unreadChannels: unreadChannels,
        favoriteChannels: favoriteChannels,
        publicChannels: notFavoriteChannels.filter(isOpenChannel),
        privateChannels: notFavoriteChannels.filter(isPrivateChannel),
        directAndGroupChannels: directAndGroupChannels
    };
}

function completeDirectChannelInfo(usersState, teammateNameDisplay, channel) {
    if (isDirectChannel(channel)) {
        var dmChannelClone = _extends({}, channel);
        var teammateId = getUserIdFromChannelName(usersState.currentUserId, channel.name);

        return Object.assign(dmChannelClone, {

            // return empty string instead of `someone` default string for display_name
            display_name: (0, _user_utils.displayUsername)(usersState.profiles[teammateId], teammateNameDisplay, false),
            teammate_id: teammateId,
            status: usersState.statuses[teammateId] || 'offline'
        });
    } else if (isGroupChannel(channel)) {
        return completeDirectGroupInfo(usersState, teammateNameDisplay, channel);
    }

    return channel;
}

function completeDirectChannelDisplayName(currentUserId, profiles, teammateNameDisplay, channel) {
    if (isDirectChannel(channel)) {
        var dmChannelClone = _extends({}, channel);
        var teammateId = getUserIdFromChannelName(currentUserId, channel.name);

        return Object.assign(dmChannelClone, { display_name: (0, _user_utils.displayUsername)(profiles[teammateId], teammateNameDisplay) });
    } else if (isGroupChannel(channel)) {
        var usernames = channel.display_name.split(', ');
        var users = Object.values(profiles);
        var userIds = [];
        usernames.forEach(function (username) {
            var u = users.find(function (p) {
                return p.username === username;
            });
            if (u) {
                userIds.push(u.id);
            }
        });
        if (usernames.length === userIds.length) {
            return Object.assign({}, channel, {
                display_name: getGroupDisplayNameFromUserIds(userIds, profiles, currentUserId, teammateNameDisplay)
            });
        }
    }

    return channel;
}

function cleanUpUrlable(input) {
    var cleaned = input.trim().replace(/-/g, ' ').replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s/g, '-');
    cleaned = cleaned.replace(/-{2,}/, '-');
    cleaned = cleaned.replace(/^-+/, '');
    cleaned = cleaned.replace(/-+$/, '');
    return cleaned;
}

function getChannelByName(channels, name) {
    var channelIds = Object.keys(channels);
    for (var i = 0; i < channelIds.length; i++) {
        var id = channelIds[i];
        if (channels[id].name === name) {
            return channels[id];
        }
    }
    return null;
}

function getDirectChannelName(id, otherId) {
    var handle = void 0;

    if (otherId > id) {
        handle = id + '__' + otherId;
    } else {
        handle = otherId + '__' + id;
    }

    return handle;
}

function getUserIdFromChannelName(userId, channelName) {
    var ids = channelName.split('__');
    var otherUserId = '';
    if (ids[0] === userId) {
        otherUserId = ids[1];
    } else {
        otherUserId = ids[0];
    }

    return otherUserId;
}

function isAutoClosed(config, myPreferences, channel, channelActivity, channelArchiveTime) {
    var currentChannelId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

    var cutoff = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

    var viewTimePref = myPreferences[_constants.Preferences.CATEGORY_CHANNEL_APPROXIMATE_VIEW_TIME + '--' + channel.id];
    var viewTime = viewTimePref ? parseInt(viewTimePref.value, 10) : 0;
    if (viewTime > cutoff) {
        return false;
    }

    var openTimePref = myPreferences[_constants.Preferences.CATEGORY_CHANNEL_OPEN_TIME + '--' + channel.id];
    var openTime = openTimePref ? parseInt(openTimePref.value, 10) : 0;

    // Only close archived channels when not being viewed
    if (channel.id !== currentChannelId && channelArchiveTime && channelArchiveTime > openTime) {
        return true;
    }

    if (config.CloseUnusedDirectMessages !== 'true' || isFavoriteChannel(myPreferences, channel.id)) {
        return false;
    }
    var autoClose = myPreferences[_constants.Preferences.CATEGORY_SIDEBAR_SETTINGS + '--close_unused_direct_messages'];
    if (!autoClose || autoClose.value === 'after_seven_days') {
        if (channelActivity && channelActivity > cutoff) {
            return false;
        }
        if (openTime > cutoff) {
            return false;
        }
        var lastActivity = channel.last_post_at;
        return !lastActivity || lastActivity < cutoff;
    }
    return false;
}

function isDirectChannel(channel) {
    return channel.type === _constants.General.DM_CHANNEL;
}

function isDirectChannelVisible(otherUserOrOtherUserId, config, myPreferences, channel, lastPost, isUnread, currentChannelId) {
    var otherUser = (typeof otherUserOrOtherUserId === 'undefined' ? 'undefined' : _typeof(otherUserOrOtherUserId)) === 'object' ? otherUserOrOtherUserId : null;
    var otherUserId = (typeof otherUserOrOtherUserId === 'undefined' ? 'undefined' : _typeof(otherUserOrOtherUserId)) === 'object' ? otherUserOrOtherUserId.id : otherUserOrOtherUserId;
    var dm = myPreferences[_constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW + '--' + otherUserId];
    if (!dm || dm.value !== 'true') {
        return false;
    }
    return isUnread || !isAutoClosed(config, myPreferences, channel, lastPost ? lastPost.create_at : 0, otherUser ? otherUser.delete_at : 0, currentChannelId);
}

function isGroupChannel(channel) {
    return channel.type === _constants.General.GM_CHANNEL;
}

function isGroupChannelVisible(config, myPreferences, channel, lastPost, isUnread) {
    var gm = myPreferences[_constants.Preferences.CATEGORY_GROUP_CHANNEL_SHOW + '--' + channel.id];
    if (!gm || gm.value !== 'true') {
        return false;
    }
    return isUnread || !isAutoClosed(config, myPreferences, channel, lastPost ? lastPost.create_at : 0);
}

function isGroupOrDirectChannelVisible(channel, memberships, config, myPreferences, currentUserId, users, lastPosts) {
    var lastPost = lastPosts[channel.id];
    if (isGroupChannel(channel) && isGroupChannelVisible(config, myPreferences, channel, lastPost, isUnreadChannel(memberships, channel))) {
        return true;
    }
    if (!isDirectChannel(channel)) {
        return false;
    }
    var otherUserId = getUserIdFromChannelName(currentUserId, channel.name);
    return isDirectChannelVisible(users[otherUserId] || otherUserId, config, myPreferences, channel, lastPost, isUnreadChannel(memberships, channel));
}

function showCreateOption(state, config, license, teamId, channelType, isAdmin, isSystemAdmin) {
    if ((0, _general.hasNewPermissions)(state)) {
        if (channelType === _constants.General.OPEN_CHANNEL) {
            return (0, _roles.haveITeamPermission)(state, { team: teamId, permission: _constants.Permissions.CREATE_PUBLIC_CHANNEL });
        } else if (channelType === _constants.General.PRIVATE_CHANNEL) {
            return (0, _roles.haveITeamPermission)(state, { team: teamId, permission: _constants.Permissions.CREATE_PRIVATE_CHANNEL });
        }
        return true;
    }

    if (license.IsLicensed !== 'true') {
        return true;
    }

    if (channelType === _constants.General.OPEN_CHANNEL) {
        if (config.RestrictPublicChannelCreation === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        } else if (config.RestrictPublicChannelCreation === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
    } else if (channelType === _constants.General.PRIVATE_CHANNEL) {
        if (config.RestrictPrivateChannelCreation === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        } else if (config.RestrictPrivateChannelCreation === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
    }

    return true;
}

function showManagementOptions(state, config, license, channel, isAdmin, isSystemAdmin, isChannelAdmin) {
    if ((0, _general.hasNewPermissions)(state)) {
        if (channel.type === _constants.General.OPEN_CHANNEL) {
            return (0, _roles.haveIChannelPermission)(state, { channel: channel.id, team: channel.team_id, permission: _constants.Permissions.MANAGE_PUBLIC_CHANNEL_PROPERTIES });
        } else if (channel.type === _constants.General.PRIVATE_CHANNEL) {
            return (0, _roles.haveIChannelPermission)(state, { channel: channel.id, team: channel.team_id, permission: _constants.Permissions.MANAGE_PRIVATE_CHANNEL_PROPERTIES });
        }
        return true;
    }

    if (license.IsLicensed !== 'true') {
        return true;
    }

    if (channel.type === _constants.General.OPEN_CHANNEL) {
        if (config.RestrictPublicChannelManagement === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        }
        if (config.RestrictPublicChannelManagement === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
        if (config.RestrictPublicChannelManagement === _constants.General.CHANNEL_ADMIN_ROLE && !isChannelAdmin && !isAdmin) {
            return false;
        }
    } else if (channel.type === _constants.General.PRIVATE_CHANNEL) {
        if (config.RestrictPrivateChannelManagement === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        }
        if (config.RestrictPrivateChannelManagement === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
        if (config.RestrictPrivateChannelManagement === _constants.General.CHANNEL_ADMIN_ROLE && !isChannelAdmin && !isAdmin) {
            return false;
        }
    }

    return true;
}

function showDeleteOption(state, config, license, channel, isAdmin, isSystemAdmin, isChannelAdmin) {
    if ((0, _general.hasNewPermissions)(state)) {
        if (channel.type === _constants.General.OPEN_CHANNEL) {
            return (0, _roles.haveIChannelPermission)(state, { channel: channel.id, team: channel.team_id, permission: _constants.Permissions.DELETE_PUBLIC_CHANNEL });
        } else if (channel.type === _constants.General.PRIVATE_CHANNEL) {
            return (0, _roles.haveIChannelPermission)(state, { channel: channel.id, team: channel.team_id, permission: _constants.Permissions.DELETE_PRIVATE_CHANNEL });
        }
        return true;
    }

    if (license.IsLicensed !== 'true') {
        return true;
    }

    if (channel.type === _constants.General.OPEN_CHANNEL) {
        if (config.RestrictPublicChannelDeletion === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        }
        if (config.RestrictPublicChannelDeletion === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
        if (config.RestrictPublicChannelDeletion === _constants.General.CHANNEL_ADMIN_ROLE && !isChannelAdmin && !isAdmin) {
            return false;
        }
    } else if (channel.type === _constants.General.PRIVATE_CHANNEL) {
        if (config.RestrictPrivateChannelDeletion === _constants.General.SYSTEM_ADMIN_ROLE && !isSystemAdmin) {
            return false;
        }
        if (config.RestrictPrivateChannelDeletion === _constants.General.TEAM_ADMIN_ROLE && !isAdmin) {
            return false;
        }
        if (config.RestrictPrivateChannelDeletion === _constants.General.CHANNEL_ADMIN_ROLE && !isChannelAdmin && !isAdmin) {
            return false;
        }
    }

    return true;
}

function canManageMembersOldPermissions(channel, user, teamMember, channelMember, config, license) {
    if (channel.type === _constants.General.DM_CHANNEL || channel.type === _constants.General.GM_CHANNEL || channel.name === _constants.General.DEFAULT_CHANNEL) {
        return false;
    }

    if (license.IsLicensed !== 'true') {
        return true;
    }

    if (channel.type === _constants.General.PRIVATE_CHANNEL) {
        var isSystemAdmin = user.roles.includes(_constants.General.SYSTEM_ADMIN_ROLE);
        if (config.RestrictPrivateChannelManageMembers === _constants.General.PERMISSIONS_SYSTEM_ADMIN && !isSystemAdmin) {
            return false;
        }

        var isTeamAdmin = teamMember.roles.includes(_constants.General.TEAM_ADMIN_ROLE);
        if (config.RestrictPrivateChannelManageMembers === _constants.General.PERMISSIONS_TEAM_ADMIN && !isTeamAdmin && !isSystemAdmin) {
            return false;
        }

        var isChannelAdmin = channelMember.roles.includes(_constants.General.CHANNEL_ADMIN_ROLE);
        if (config.RestrictPrivateChannelManageMembers === _constants.General.PERMISSIONS_CHANNEL_ADMIN && !isChannelAdmin && !isTeamAdmin && !isSystemAdmin) {
            return false;
        }
    }

    return true;
}

function getChannelsIdForTeam(state, teamId) {
    var channels = state.entities.channels.channels;


    return Object.values(channels).reduce(function (res, channel) {
        if (channel.team_id === teamId) {
            res.push(channel.id);
        }
        return res;
    }, []);
}

function getGroupDisplayNameFromUserIds(userIds, profiles, currentUserId, teammateNameDisplay) {
    var names = [];
    userIds.forEach(function (id) {
        if (id !== currentUserId) {
            names.push((0, _user_utils.displayUsername)(profiles[id], teammateNameDisplay));
        }
    });

    function sortUsernames(a, b) {
        var locale = getUserLocale(currentUserId, profiles);
        return a.localeCompare(b, locale, { numeric: true });
    }

    return names.sort(sortUsernames).join(', ');
}

function isFavoriteChannel(myPreferences, id) {
    var fav = myPreferences[_constants.Preferences.CATEGORY_FAVORITE_CHANNEL + '--' + id];
    return fav ? fav.value === 'true' : false;
}

function isDefault(channel) {
    return channel.name === _constants.General.DEFAULT_CHANNEL;
}

//====================================================

function createFakeChannel(userId, otherUserId) {
    return {
        name: getDirectChannelName(userId, otherUserId),
        last_post_at: 0,
        total_msg_count: 0,
        type: _constants.General.DM_CHANNEL,
        fake: true
    };
}

function createFakeChannelCurried(userId) {
    return function (otherUserId) {
        return createFakeChannel(userId, otherUserId);
    };
}

function createMissingDirectChannels(currentUserId, allChannels, myPreferences) {
    var directChannelsDisplayPreferences = (0, _preference_utils.getPreferencesByCategory)(myPreferences, _constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW);

    return Array.from(directChannelsDisplayPreferences).filter(function (entry) {
        return entry[1] === 'true';
    }).map(function (entry) {
        return entry[0];
    }).filter(function (teammateId) {
        return !allChannels.some(isDirectChannelForUser.bind(null, currentUserId, teammateId));
    }).map(createFakeChannelCurried(currentUserId));
}

function completeDirectGroupInfo(usersState, teammateNameDisplay, channel) {
    var currentUserId = usersState.currentUserId,
        profiles = usersState.profiles,
        profilesInChannel = usersState.profilesInChannel;

    var profilesIds = profilesInChannel[channel.id];
    var gm = _extends({}, channel);

    if (profilesIds) {
        return Object.assign(gm, {
            display_name: getGroupDisplayNameFromUserIds(profilesIds, profiles, currentUserId, teammateNameDisplay)
        });
    }

    var usernames = gm.display_name.split(', ');
    var users = Object.values(profiles);
    var userIds = [];
    usernames.forEach(function (username) {
        var u = users.find(function (p) {
            return p.username === username;
        });
        if (u) {
            userIds.push(u.id);
        }
    });
    if (usernames.length === userIds.length) {
        return Object.assign(gm, {
            display_name: getGroupDisplayNameFromUserIds(userIds, profiles, currentUserId, teammateNameDisplay)
        });
    }

    return channel;
}

function isDirectChannelForUser(userId, otherUserId, channel) {
    return channel.type === _constants.General.DM_CHANNEL && getUserIdFromChannelName(userId, channel.name) === otherUserId;
}

function channelHasMentions(members, channel) {
    var member = members[channel.id];
    if (member) {
        return member.mention_count > 0;
    }
    return false;
}

function channelHasUnreadMessages(members, channel) {
    var member = members[channel.id];
    if (member) {
        var msgCount = channel.total_msg_count - member.msg_count;
        var onlyMentions = member.notify_props && member.notify_props.mark_unread === _constants.General.MENTION;
        return msgCount && !onlyMentions && member.mention_count === 0;
    }

    return false;
}

function isUnreadChannel(members, channel) {
    var member = members[channel.id];
    if (member) {
        var msgCount = channel.total_msg_count - member.msg_count;
        var onlyMentions = member.notify_props && member.notify_props.mark_unread === _constants.General.MENTION;
        return member.mention_count > 0 || msgCount && !onlyMentions;
    }

    return false;
}

function isNotDeletedChannel(channel) {
    return channel.delete_at === 0;
}

function isOpenChannel(channel) {
    return channel.type === _constants.General.OPEN_CHANNEL;
}

function isPrivateChannel(channel) {
    return channel.type === _constants.General.PRIVATE_CHANNEL;
}

function sortChannelsByTypeAndDisplayName(locale, a, b) {
    if (channelTypeOrder[a.type] !== channelTypeOrder[b.type]) {
        if (channelTypeOrder[a.type] < channelTypeOrder[b.type]) {
            return -1;
        }

        return 1;
    }

    var aDisplayName = filterName(a.display_name);
    var bDisplayName = filterName(b.display_name);

    if (aDisplayName !== bDisplayName) {
        return aDisplayName.toLowerCase().localeCompare(bDisplayName.toLowerCase(), locale, { numeric: true });
    }

    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { numeric: true });
}

function filterName(name) {
    return name.replace(/[.,'"\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // eslint-disable-line no-useless-escape
}

function sortChannelsByDisplayName(locale, a, b) {
    if (a.display_name !== b.display_name) {
        return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase(), locale, { numeric: true });
    }

    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { numeric: true });
}

function sortChannelsByDisplayNameAndMuted(locale, members, a, b) {
    var aMember = members[a.id];
    var bMember = members[b.id];

    if (isChannelMuted(bMember) === isChannelMuted(aMember)) {
        return sortChannelsByDisplayName(locale, a, b);
    }

    if (!isChannelMuted(bMember) && isChannelMuted(aMember)) {
        return 1;
    }

    return -1;
}

function isChannelMuted(member) {
    return member && member.notify_props ? member.notify_props.mark_unread === 'mention' : false;
}

function not(f) {
    return function () {
        return !f.apply(undefined, arguments);
    };
}

function buildChannels(usersState, channels, missingDirectChannels, teammateNameDisplay, locale) {
    return channels.concat(missingDirectChannels).map(completeDirectChannelInfo.bind(null, usersState, teammateNameDisplay)).filter(isNotDeletedChannel).sort(sortChannelsByTypeAndDisplayName.bind(null, locale));
}

function buildFavoriteChannels(channels, myPreferences, locale) {
    return channels.filter(function (channel) {
        return isFavoriteChannel(myPreferences, channel.id);
    }).sort(sortChannelsByDisplayName.bind(null, locale));
}

function buildNotFavoriteChannels(channels, myPreferences) {
    return channels.filter(function (channel) {
        return !isFavoriteChannel(myPreferences, channel.id);
    });
}

function buildDirectAndGroupChannels(channels, memberships, config, myPreferences, currentUserId, users, lastPosts) {
    return channels.filter(function (channel) {
        return isGroupOrDirectChannelVisible(channel, memberships, config, myPreferences, currentUserId, users, lastPosts);
    });
}

function buildChannelsWithMentions(channels, members, locale) {
    return channels.filter(channelHasMentions.bind(null, members)).sort(sortChannelsByDisplayName.bind(null, locale));
}

function buildUnreadChannels(channels, members, locale) {
    return channels.filter(channelHasUnreadMessages.bind(null, members)).sort(sortChannelsByDisplayName.bind(null, locale));
}

function getUserLocale(userId, profiles) {
    var locale = _constants.General.DEFAULT_LOCALE;
    if (profiles && profiles[userId] && profiles[userId].locale) {
        locale = profiles[userId].locale;
    }

    return locale;
}

function filterChannelsMatchingTerm(channels, term) {
    var lowercasedTerm = term.toLowerCase();

    return channels.filter(function (channel) {
        if (!channel) {
            return false;
        }
        var name = (channel.name || '').toLowerCase();
        var displayName = (channel.display_name || '').toLowerCase();

        return name.startsWith(lowercasedTerm) || displayName.startsWith(lowercasedTerm);
    });
}