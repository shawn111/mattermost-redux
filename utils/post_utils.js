'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postTypePriority = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _postTypePriority;

exports.isPostFlagged = isPostFlagged;
exports.isSystemMessage = isSystemMessage;
exports.isFromWebhook = isFromWebhook;
exports.isPostEphemeral = isPostEphemeral;
exports.shouldIgnorePost = shouldIgnorePost;
exports.isUserActivityPost = isUserActivityPost;
exports.isPostOwner = isPostOwner;
exports.isEdited = isEdited;
exports.canDeletePost = canDeletePost;
exports.canEditPost = canEditPost;
exports.editDisable = editDisable;
exports.getLastCreateAt = getLastCreateAt;
exports.shouldFilterJoinLeavePost = shouldFilterJoinLeavePost;
exports.isPostPendingOrFailed = isPostPendingOrFailed;
exports.comparePosts = comparePosts;
exports.comparePostTypes = comparePostTypes;
exports.combineUserActivitySystemPost = combineUserActivitySystemPost;
exports.combineSystemPosts = combineSystemPosts;

var _constants = require('../constants');

var _general = require('../selectors/entities/general');

var _roles = require('../selectors/entities/roles');

var _helpers = require('./helpers');

var _preference_utils = require('./preference_utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var MAX_COMBINED_SYSTEM_POSTS = 100;

function isPostFlagged(postId, myPreferences) {
    var key = (0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_FLAGGED_POST, postId);
    return myPreferences.hasOwnProperty(key);
}

function isSystemMessage(post) {
    return post.type !== '' && post.type && post.type.startsWith(_constants.Posts.SYSTEM_MESSAGE_PREFIX);
}

function isFromWebhook(post) {
    return post.props && post.props.from_webhook;
}

function isPostEphemeral(post) {
    return post.type === _constants.Posts.POST_TYPES.EPHEMERAL || post.type === _constants.Posts.POST_TYPES.EPHEMERAL_ADD_TO_CHANNEL || post.state === _constants.Posts.POST_DELETED;
}

function shouldIgnorePost(post) {
    return _constants.Posts.IGNORE_POST_TYPES.includes(post.type);
}

function isUserActivityPost(postType) {
    return _constants.Posts.USER_ACTIVITY_POST_TYPES.includes(postType);
}

function isPostOwner(userId, post) {
    return userId === post.user_id;
}

function isEdited(post) {
    return post.edit_at > 0;
}

function canDeletePost(state, config, license, teamId, channelId, userId, post, isAdmin, isSystemAdmin) {
    if (!post) {
        return false;
    }

    var isOwner = isPostOwner(userId, post);

    if ((0, _general.hasNewPermissions)(state)) {
        var canDelete = (0, _roles.haveIChannelPermission)(state, { team: teamId, channel: channelId, permission: _constants.Permissions.DELETE_POST });
        if (!isOwner) {
            return canDelete && (0, _roles.haveIChannelPermission)(state, { team: teamId, channel: channelId, permission: _constants.Permissions.DELETE_OTHERS_POSTS });
        }
        return canDelete;
    }

    if (license.IsLicensed === 'true') {
        return config.RestrictPostDelete === _constants.General.PERMISSIONS_ALL && (isOwner || isAdmin) || config.RestrictPostDelete === _constants.General.PERMISSIONS_TEAM_ADMIN && isAdmin || config.RestrictPostDelete === _constants.General.PERMISSIONS_SYSTEM_ADMIN && isSystemAdmin;
    }
    return isOwner || isAdmin;
}

function canEditPost(state, config, license, teamId, channelId, userId, post) {
    if (!post || isSystemMessage(post)) {
        return false;
    }

    var isOwner = isPostOwner(userId, post);

    var canEdit = true;

    if ((0, _general.hasNewPermissions)(state)) {
        canEdit = canEdit && (0, _roles.haveIChannelPermission)(state, { team: teamId, channel: channelId, permission: _constants.Permissions.EDIT_POST });
        if (!isOwner) {
            canEdit = canEdit && (0, _roles.haveIChannelPermission)(state, { team: teamId, channel: channelId, permission: _constants.Permissions.EDIT_OTHERS_POSTS });
        }
        if (license.IsLicensed === 'true' && config.PostEditTimeLimit !== '-1' && config.PostEditTimeLimit !== -1) {
            var timeLeft = post.create_at + config.PostEditTimeLimit * 1000 - Date.now();
            if (timeLeft <= 0) {
                canEdit = false;
            }
        }
    } else {
        canEdit = isOwner && config.AllowEditPost !== 'never';
        if (config.AllowEditPost === _constants.General.ALLOW_EDIT_POST_TIME_LIMIT) {
            var _timeLeft = post.create_at + config.PostEditTimeLimit * 1000 - Date.now();
            if (_timeLeft <= 0) {
                canEdit = false;
            }
        }
    }

    return canEdit;
}

function editDisable(state, config, license, teamId, channelId, userId, post, editDisableAction) {
    var canEdit = canEditPost(state, config, license, teamId, channelId, userId, post);

    if (canEdit && license.IsLicensed === 'true') {
        if (config.AllowEditPost === _constants.General.ALLOW_EDIT_POST_TIME_LIMIT || config.PostEditTimeLimit !== -1 && config.PostEditTimeLimit !== '-1') {
            var timeLeft = post.create_at + config.PostEditTimeLimit * 1000 - Date.now();
            if (timeLeft > 0) {
                editDisableAction.fireAfter(timeLeft + 1000);
            }
        }
    }
}

function getLastCreateAt(postsArray) {
    var createAt = postsArray.map(function (p) {
        return p.create_at;
    });

    if (createAt.length) {
        return Reflect.apply(Math.max, null, createAt);
    }

    return 0;
}

var joinLeavePostTypes = [_constants.Posts.POST_TYPES.JOIN_LEAVE, _constants.Posts.POST_TYPES.JOIN_CHANNEL, _constants.Posts.POST_TYPES.LEAVE_CHANNEL, _constants.Posts.POST_TYPES.ADD_REMOVE, _constants.Posts.POST_TYPES.ADD_TO_CHANNEL, _constants.Posts.POST_TYPES.REMOVE_FROM_CHANNEL, _constants.Posts.POST_TYPES.JOIN_TEAM, _constants.Posts.POST_TYPES.LEAVE_TEAM, _constants.Posts.POST_TYPES.ADD_TO_TEAM, _constants.Posts.POST_TYPES.REMOVE_FROM_TEAM, _constants.Posts.POST_TYPES.COMBINED_USER_ACTIVITY];

// Returns true if a post should be hidden when the user has Show Join/Leave Messages disabled
function shouldFilterJoinLeavePost(post, showJoinLeave, currentUsername) {
    if (showJoinLeave) {
        return false;
    }

    // Don't filter out non-join/leave messages
    if (joinLeavePostTypes.indexOf(post.type) === -1) {
        return false;
    }

    // Don't filter out join/leave messages about the current user
    return !isJoinLeavePostForUsername(post, currentUsername);
}

function isJoinLeavePostForUsername(post, currentUsername) {
    if (!post.props) {
        return false;
    }

    if (post.user_activity_posts) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = post.user_activity_posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var childPost = _step.value;

                if (isJoinLeavePostForUsername(childPost, currentUsername)) {
                    // If any of the contained posts are for this user, the client will
                    // need to figure out how to render the post
                    return true;
                }
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
    }

    return post.props.username === currentUsername || post.props.addedUsername === currentUsername || post.props.removedUsername === currentUsername;
}

function isPostPendingOrFailed(post) {
    return post.failed || post.id === post.pending_post_id;
}

function comparePosts(a, b) {
    var aIsPendingOrFailed = isPostPendingOrFailed(a);
    var bIsPendingOrFailed = isPostPendingOrFailed(b);
    if (aIsPendingOrFailed && !bIsPendingOrFailed) {
        return -1;
    } else if (!aIsPendingOrFailed && bIsPendingOrFailed) {
        return 1;
    }

    if (a.create_at > b.create_at) {
        return -1;
    } else if (a.create_at < b.create_at) {
        return 1;
    }

    return 0;
}

var postTypePriority = exports.postTypePriority = (_postTypePriority = {}, _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.JOIN_TEAM, 0), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.ADD_TO_TEAM, 1), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.LEAVE_TEAM, 2), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.REMOVE_FROM_TEAM, 3), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.JOIN_CHANNEL, 4), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.ADD_TO_CHANNEL, 5), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.LEAVE_CHANNEL, 6), _defineProperty(_postTypePriority, _constants.Posts.POST_TYPES.REMOVE_FROM_CHANNEL, 7), _postTypePriority);

function comparePostTypes(a, b) {
    return postTypePriority[a.postType] - postTypePriority[b.postType];
}

function extractUserActivityData(userActivities) {
    var messageData = [];
    var allUserIds = [];
    var allUsernames = [];

    Object.entries(userActivities).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            postType = _ref2[0],
            values = _ref2[1];

        if (postType === _constants.Posts.POST_TYPES.ADD_TO_TEAM || postType === _constants.Posts.POST_TYPES.ADD_TO_CHANNEL || postType === _constants.Posts.POST_TYPES.REMOVE_FROM_CHANNEL) {
            Object.entries(values).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    actorId = _ref4[0],
                    users = _ref4[1];

                var ids = users.ids,
                    usernames = users.usernames;

                messageData.push({ postType: postType, userIds: [].concat(_toConsumableArray(usernames), _toConsumableArray(ids)), actorId: actorId });
                if (ids.length > 0) {
                    allUserIds.push.apply(allUserIds, _toConsumableArray(ids));
                }

                if (usernames.length > 0) {
                    allUsernames.push.apply(allUsernames, _toConsumableArray(usernames));
                }
                allUserIds.push(actorId);
            });
        } else {
            messageData.push({ postType: postType, userIds: values });
            allUserIds.push.apply(allUserIds, _toConsumableArray(values));
        }
    });

    messageData.sort(comparePostTypes);

    function reduceUsers(acc, curr) {
        if (!acc.includes(curr)) {
            acc.push(curr);
        }
        return acc;
    }

    return {
        allUserIds: allUserIds.reduce(reduceUsers, []),
        allUsernames: allUsernames.reduce(reduceUsers, []),
        messageData: messageData
    };
}

function combineUserActivitySystemPost() {
    var systemPosts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (systemPosts.length === 0) {
        return null;
    }

    var userActivities = systemPosts.reduce(function (acc, post) {
        var postType = post.type;
        var userActivityProps = acc;
        var combinedPostType = userActivityProps[postType];

        if (postType === _constants.Posts.POST_TYPES.ADD_TO_TEAM || postType === _constants.Posts.POST_TYPES.ADD_TO_CHANNEL || postType === _constants.Posts.POST_TYPES.REMOVE_FROM_CHANNEL) {
            var userId = post.props.addedUserId || post.props.removedUserId;
            var username = post.props.addedUsername || post.props.removedUsername;
            if (combinedPostType) {
                var users = combinedPostType[post.user_id] || { ids: [], usernames: [] };
                if (userId) {
                    if (!users.ids.includes(userId)) {
                        users.ids.push(userId);
                    }
                } else if (username && !users.usernames.includes(username)) {
                    users.usernames.push(username);
                }
                combinedPostType[post.user_id] = users;
            } else {
                var _users = { ids: [], usernames: [] };
                if (userId) {
                    _users.ids.push(userId);
                } else if (username) {
                    _users.usernames.push(username);
                }
                userActivityProps[postType] = _defineProperty({}, post.user_id, _users);
            }
        } else {
            var propsUserId = post.user_id;

            if (combinedPostType) {
                if (!combinedPostType.includes(propsUserId)) {
                    userActivityProps[postType] = [].concat(_toConsumableArray(combinedPostType), [propsUserId]);
                }
            } else {
                userActivityProps = _extends({}, userActivityProps, _defineProperty({}, postType, [propsUserId]));
            }
        }

        return userActivityProps;
    }, {});

    return extractUserActivityData(userActivities);
}

function combineSystemPosts() {
    var postsIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var posts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var channelId = arguments[2];

    if (postsIds.length === 0) {
        return { postsForChannel: postsIds, nextPosts: posts };
    }

    var postsForChannel = [];
    var nextPosts = _extends({}, posts);

    var userActivitySystemPosts = [];
    var systemPostIds = [];
    var messages = [];
    var createAt = void 0;
    var combinedPostId = void 0;

    postsIds.forEach(function (p, i) {
        var channelPost = posts[p];
        var combinedOrUserActivityPost = isUserActivityPost(channelPost.type) || channelPost.type === _constants.Posts.POST_TYPES.COMBINED_USER_ACTIVITY;
        if (channelPost.delete_at === 0 && combinedOrUserActivityPost) {
            if (!createAt || createAt > channelPost.create_at) {
                createAt = channelPost.create_at;
            }

            if (isUserActivityPost(channelPost.type)) {
                userActivitySystemPosts.push(channelPost);
                systemPostIds.push(channelPost.id);
                messages.push(channelPost.message);

                if (nextPosts[channelPost.id]) {
                    nextPosts[channelPost.id] = _extends({}, channelPost, { state: _constants.Posts.POST_DELETED, delete_at: 1 });
                }
            } else if (channelPost.type === _constants.Posts.POST_TYPES.COMBINED_USER_ACTIVITY) {
                var _userActivitySystemPo, _systemPostIds, _messages;

                (_userActivitySystemPo = userActivitySystemPosts).push.apply(_userActivitySystemPo, _toConsumableArray(channelPost.user_activity_posts));
                (_systemPostIds = systemPostIds).push.apply(_systemPostIds, _toConsumableArray(channelPost.system_post_ids));
                (_messages = messages).push.apply(_messages, _toConsumableArray(channelPost.props.messages));

                combinedPostId = channelPost.id;
            }
        }
        if (!combinedOrUserActivityPost && userActivitySystemPosts.length > 0 || userActivitySystemPosts.length === MAX_COMBINED_SYSTEM_POSTS || userActivitySystemPosts.length > 0 && i === postsIds.length - 1) {
            var combinedPost = {
                id: combinedPostId || (0, _helpers.generateId)(),
                root_id: '',
                channel_id: channelId,
                create_at: createAt,
                delete_at: 0,
                message: messages.join('\n'),
                props: {
                    messages: messages,
                    user_activity: combineUserActivitySystemPost(userActivitySystemPosts)
                },
                state: '',
                system_post_ids: systemPostIds,
                type: _constants.Posts.POST_TYPES.COMBINED_USER_ACTIVITY,
                user_activity_posts: userActivitySystemPosts,
                user_id: ''
            };

            nextPosts[combinedPost.id] = combinedPost;
            postsForChannel.push(combinedPost.id);

            userActivitySystemPosts = [];
            systemPostIds = [];
            messages = [];
            createAt = null;
            combinedPostId = null;

            if (!combinedOrUserActivityPost) {
                postsForChannel.push(channelPost.id);
            }
        } else if (!combinedOrUserActivityPost) {
            postsForChannel.push(channelPost.id);
        }
    });

    postsForChannel.sort(function (a, b) {
        return comparePosts(nextPosts[a], nextPosts[b]);
    });

    return { postsForChannel: postsForChannel, nextPosts: nextPosts };
}