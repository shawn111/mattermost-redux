'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPostIdSending = exports.getCurrentUsersLatestPost = exports.getLatestReplyablePostId = exports.getMostRecentPostIdInChannel = exports.getLastPostPerChannel = exports.getSearchResults = exports.getPostsInCurrentChannel = exports.getPostIdsInCurrentChannel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.getAllPosts = getAllPosts;
exports.getPost = getPost;
exports.getPostsInThread = getPostsInThread;
exports.getReactionsForPosts = getReactionsForPosts;
exports.makeGetReactionsForPost = makeGetReactionsForPost;
exports.getOpenGraphMetadata = getOpenGraphMetadata;
exports.getOpenGraphMetadataForUrl = getOpenGraphMetadataForUrl;
exports.makeGetPostIdsForThread = makeGetPostIdsForThread;
exports.makeGetPostIdsAroundPost = makeGetPostIdsAroundPost;
exports.makeGetPostsInChannel = makeGetPostsInChannel;
exports.makeGetPostsAroundPost = makeGetPostsAroundPost;
exports.makeGetPostsForThread = makeGetPostsForThread;
exports.makeGetCommentCountForPost = makeGetCommentCountForPost;
exports.getSearchMatches = getSearchMatches;
exports.makeGetMessageInHistoryItem = makeGetMessageInHistoryItem;
exports.makeGetPostsForIds = makeGetPostsForIds;
exports.getPostIdsInChannel = getPostIdsInChannel;

var _reselect = require('reselect');

var _common = require('./common');

var _preferences = require('./preferences');

var _helpers = require('../../utils/helpers');

var _constants = require('../../constants');

var _post_utils = require('../../utils/post_utils');

var _preference_utils = require('../../utils/preference_utils');

function getAllPosts(state) {
    return state.entities.posts.posts;
}

function getPost(state, postId) {
    return getAllPosts(state)[postId];
}

function getPostsInThread(state) {
    return state.entities.posts.postsInThread;
}

function getReactionsForPosts(state) {
    return state.entities.posts.reactions;
}

function makeGetReactionsForPost() {
    return (0, _reselect.createSelector)(getReactionsForPosts, function (state, postId) {
        return postId;
    }, function (reactions, postId) {
        return Object.values(reactions[postId] || {});
    });
}

function getOpenGraphMetadata(state) {
    return state.entities.posts.openGraph;
}

function getOpenGraphMetadataForUrl(state, url) {
    return state.entities.posts.openGraph[url];
}

var getPostIdsInCurrentChannel = exports.getPostIdsInCurrentChannel = (0, _helpers.createIdsSelector)(function (state) {
    return state.entities.posts.postsInChannel[state.entities.channels.currentChannelId];
}, function (postIdsInCurrentChannel) {
    return postIdsInCurrentChannel || [];
});

var getPostsInCurrentChannel = exports.getPostsInCurrentChannel = (0, _reselect.createSelector)(getAllPosts, getPostIdsInCurrentChannel, function (posts, postIds) {
    return postIds.map(function (id) {
        return posts[id];
    });
});

function makeGetPostIdsForThread() {
    return (0, _helpers.createIdsSelector)(getAllPosts, function (state, rootId) {
        return state.entities.posts.postsInThread[rootId] || [];
    }, function (state, rootId) {
        return state.entities.posts.posts[rootId];
    }, function (posts, postsForThread, rootPost) {
        var thread = [];

        if (rootPost) {
            thread.push(rootPost);
        }

        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post) {
                thread.push(post);
            }
        });

        thread.sort(_post_utils.comparePosts);

        return thread.map(function (post) {
            return post.id;
        });
    });
}

function makeGetPostIdsAroundPost() {
    return (0, _helpers.createIdsSelector)(function (state, focusedPostId, channelId) {
        return state.entities.posts.postsInChannel[channelId];
    }, function (state, focusedPostId) {
        return focusedPostId;
    }, function (state, focusedPostId, channelId, options) {
        return options && options.postsBeforeCount;
    }, function (state, focusedPostId, channelId, options) {
        return options && options.postsAfterCount;
    }, function (postIds, focusedPostId) {
        var postsBeforeCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.Posts.POST_CHUNK_SIZE / 2;
        var postsAfterCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.Posts.POST_CHUNK_SIZE / 2;

        if (!postIds) {
            return null;
        }

        var focusedPostIndex = postIds.indexOf(focusedPostId);
        if (focusedPostIndex === -1) {
            return null;
        }

        var desiredPostIndexBefore = focusedPostIndex - postsBeforeCount;
        var minPostIndex = desiredPostIndexBefore < 0 ? 0 : desiredPostIndexBefore;
        var maxPostIndex = focusedPostIndex + postsAfterCount + 1; // Needs the extra 1 to include the focused post

        return postIds.slice(minPostIndex, maxPostIndex);
    });
}

function formatPostInChannel(post, previousPost, index, allPosts, postsInThread, postIds, currentUser) {
    var isFirstReply = false;
    var isLastReply = false;
    var commentedOnPost = void 0;

    if (post.root_id) {
        if (previousPost.root_id !== post.root_id) {
            // Post is the first reply in a list of consecutive replies
            isFirstReply = true;

            if (previousPost.id !== post.root_id) {
                commentedOnPost = allPosts[post.root_id];
            }
        }

        if (index - 1 < 0 || allPosts[postIds[index - 1]].root_id !== post.root_id) {
            // Post is the last reply in a list of consecutive replies
            isLastReply = true;
        }
    }

    var previousPostIsComment = false;
    if (previousPost.root_id) {
        previousPostIsComment = true;
    }

    var postFromWebhook = Boolean(post.props && post.props.from_webhook);
    var prevPostFromWebhook = Boolean(previousPost.props && previousPost.props.from_webhook);
    var consecutivePostByUser = false;
    if (previousPost.user_id === post.user_id && post.create_at - previousPost.create_at <= _constants.Posts.POST_COLLAPSE_TIMEOUT && !postFromWebhook && !prevPostFromWebhook && !(0, _post_utils.isSystemMessage)(post) && !(0, _post_utils.isSystemMessage)(previousPost)) {
        // The last post and this post were made by the same user within some time
        consecutivePostByUser = true;
    }

    var threadRepliedToByCurrentUser = false;
    var threadCreatedByCurrentUser = false;
    var replyCount = 0;
    var isCommentMention = false;

    if (currentUser) {
        var rootId = post.root_id || post.id;
        var threadIds = postsInThread[rootId] || [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = threadIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pid = _step.value;

                var p = allPosts[pid];
                if (!p) {
                    continue;
                }

                if (p.user_id === currentUser.id) {
                    threadRepliedToByCurrentUser = true;
                }

                if (!(0, _post_utils.isPostEphemeral)(p)) {
                    replyCount += 1;
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

        var rootPost = allPosts[rootId];
        if (rootPost && rootPost.user_id === currentUser.id) {
            threadCreatedByCurrentUser = true;
        }

        var commentsNotifyLevel = 'never';
        if (currentUser.notify_props && currentUser.notify_props.comments) {
            commentsNotifyLevel = currentUser.notify_props.comments;
        }

        var notCurrentUser = post.user_id !== currentUser.id || post.props && post.props.from_webhook;
        if (notCurrentUser) {
            if (commentsNotifyLevel === 'any' && (threadCreatedByCurrentUser || threadRepliedToByCurrentUser)) {
                isCommentMention = true;
            } else if (commentsNotifyLevel === 'root' && threadCreatedByCurrentUser) {
                isCommentMention = true;
            }
        }
    }

    return _extends({}, post, {
        isFirstReply: isFirstReply,
        isLastReply: isLastReply,
        previousPostIsComment: previousPostIsComment,
        commentedOnPost: commentedOnPost,
        consecutivePostByUser: consecutivePostByUser,
        replyCount: replyCount,
        isCommentMention: isCommentMention
    });
}

function makeGetPostsInChannel() {
    return (0, _reselect.createSelector)(getAllPosts, getPostsInThread, function (state, channelId) {
        return state.entities.posts.postsInChannel[channelId];
    }, _common.getCurrentUser, _preferences.getMyPreferences, function (state, channelId, numPosts) {
        return numPosts || _constants.Posts.POST_CHUNK_SIZE;
    }, function (allPosts, postsInThread, postIds, currentUser, myPreferences, numPosts) {
        if (!postIds || !currentUser) {
            return null;
        }

        var posts = [];

        var joinLeavePref = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_ADVANCED_SETTINGS, _constants.Preferences.ADVANCED_FILTER_JOIN_LEAVE)];
        var showJoinLeave = joinLeavePref ? joinLeavePref.value !== 'false' : true;

        for (var i = 0; i < postIds.length && i < numPosts; i++) {
            var post = allPosts[postIds[i]];

            if ((0, _post_utils.shouldFilterJoinLeavePost)(post, showJoinLeave, currentUser.username)) {
                continue;
            }

            var previousPost = allPosts[postIds[i + 1]] || { create_at: 0 };
            posts.push(formatPostInChannel(post, previousPost, i, allPosts, postsInThread, postIds, currentUser));
        }

        return posts;
    });
}

function makeGetPostsAroundPost() {
    return (0, _reselect.createSelector)(getAllPosts, getPostsInThread, function (state, postId, channelId) {
        return state.entities.posts.postsInChannel[channelId];
    }, function (state, postId) {
        return postId;
    }, _common.getCurrentUser, _preferences.getMyPreferences, function (allPosts, postsInThread, postIds, focusedPostId, currentUser, myPreferences) {
        if (!postIds || !currentUser) {
            return null;
        }

        var focusedPostIndex = postIds.indexOf(focusedPostId);
        if (focusedPostIndex === -1) {
            return null;
        }

        var desiredPostIndexBefore = focusedPostIndex - _constants.Posts.POST_CHUNK_SIZE / 2;
        var minPostIndex = desiredPostIndexBefore < 0 ? 0 : desiredPostIndexBefore;

        var slicedPostIds = postIds.slice(minPostIndex);

        var posts = [];
        var joinLeavePref = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_ADVANCED_SETTINGS, _constants.Preferences.ADVANCED_FILTER_JOIN_LEAVE)];
        var showJoinLeave = joinLeavePref ? joinLeavePref.value !== 'false' : true;

        for (var i = 0; i < slicedPostIds.length; i++) {
            var post = allPosts[slicedPostIds[i]];

            if ((0, _post_utils.shouldFilterJoinLeavePost)(post, showJoinLeave, currentUser.username)) {
                continue;
            }

            var previousPost = allPosts[slicedPostIds[i + 1]] || { create_at: 0 };
            var formattedPost = formatPostInChannel(post, previousPost, i, allPosts, postsInThread, slicedPostIds, currentUser);

            if (post.id === focusedPostId) {
                formattedPost.highlight = true;
            }

            posts.push(formattedPost);
        }

        return posts;
    });
}

// Returns a function that creates a creates a selector that will get the posts for a given thread.
// That selector will take a props object (containing a rootId field) as its
// only argument and will be memoized based on that argument.
function makeGetPostsForThread() {
    return (0, _reselect.createSelector)(getAllPosts, function (state, _ref) {
        var rootId = _ref.rootId;
        return state.entities.posts.postsInThread[rootId] || [];
    }, function (state, _ref2) {
        var rootId = _ref2.rootId;
        return state.entities.posts.posts[rootId];
    }, function (posts, postsForThread, rootPost) {
        var thread = [];

        if (rootPost) {
            thread.push(rootPost);
        }

        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post) {
                thread.push(post);
            }
        });

        thread.sort(_post_utils.comparePosts);

        return thread;
    });
}

function makeGetCommentCountForPost() {
    return (0, _reselect.createSelector)(getAllPosts, function (state, _ref3) {
        var post = _ref3.post;
        return state.entities.posts.postsInThread[post ? post.id : ''] || [];
    }, function (state, props) {
        return props;
    }, function (posts, postsForThread, _ref4) {
        var currentPost = _ref4.post;

        if (!currentPost) {
            return 0;
        }

        var count = 0;
        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post && post.state !== _constants.Posts.POST_DELETED && !(0, _post_utils.isPostEphemeral)(post)) {
                count += 1;
            }
        });
        return count;
    });
}

var getSearchResults = exports.getSearchResults = (0, _reselect.createSelector)(getAllPosts, function (state) {
    return state.entities.search.results;
}, function (posts, postIds) {
    if (!postIds) {
        return [];
    }

    return postIds.map(function (id) {
        return posts[id];
    });
});

// Returns the matched text from the search results, if the server has provided them.
// These matches will only be present if the server is running Mattermost 5.1 or higher
// with Elasticsearch enabled to search posts. Otherwise, null will be returned.
function getSearchMatches(state) {
    return state.entities.search.matches;
}

function makeGetMessageInHistoryItem(type) {
    return (0, _reselect.createSelector)(function (state) {
        return state.entities.posts.messagesHistory;
    }, function (messagesHistory) {
        var idx = messagesHistory.index[type];
        var messages = messagesHistory.messages;
        if (idx >= 0 && messages && messages.length > idx) {
            return messages[idx];
        }
        return '';
    });
}

function makeGetPostsForIds() {
    return (0, _helpers.createIdsSelector)(getAllPosts, function (state, postIds) {
        return postIds;
    }, function (allPosts, postIds) {
        if (!postIds) {
            return [];
        }

        return postIds.map(function (id) {
            return allPosts[id];
        });
    });
}

var getLastPostPerChannel = exports.getLastPostPerChannel = (0, _reselect.createSelector)(getAllPosts, function (state) {
    return state.entities.posts.postsInChannel;
}, function (allPosts, allChannels) {
    var ret = {};

    for (var channelId in allChannels) {
        if (allChannels.hasOwnProperty(channelId)) {
            var channelPosts = allChannels[channelId];
            if (channelPosts.length > 0) {
                var postId = channelPosts[0];
                if (allPosts.hasOwnProperty(postId)) {
                    ret[channelId] = allPosts[postId];
                }
            }
        }
    }

    return ret;
});

var getMostRecentPostIdInChannel = exports.getMostRecentPostIdInChannel = (0, _reselect.createSelector)(getAllPosts, function (state, channelId) {
    return state.entities.posts.postsInChannel[channelId];
}, _preferences.getMyPreferences, function (posts, postIdsInChannel, preferences) {
    if (!postIdsInChannel) {
        return '';
    }
    var key = (0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_ADVANCED_SETTINGS, _constants.Preferences.ADVANCED_FILTER_JOIN_LEAVE);
    var allowSystemMessages = preferences[key] ? preferences[key].value === 'true' : true;

    if (!allowSystemMessages) {
        // return the most recent non-system message in the channel
        var postId = void 0;
        for (var i = 0; i < postIdsInChannel.length; i++) {
            var p = posts[postIdsInChannel[i]];
            if (!p.type || !p.type.startsWith(_constants.Posts.SYSTEM_MESSAGE_PREFIX)) {
                postId = p.id;
                break;
            }
        }
        return postId;
    }

    // return the most recent message in the channel
    return postIdsInChannel[0];
});

var getLatestReplyablePostId = exports.getLatestReplyablePostId = (0, _reselect.createSelector)(getPostsInCurrentChannel, function (posts) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = posts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var post = _step2.value;

            if (post.state !== _constants.Posts.POST_DELETED && !(0, _post_utils.isSystemMessage)(post) && !(0, _post_utils.isPostEphemeral)(post)) {
                return post.id;
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

    return null;
});

var getCurrentUsersLatestPost = exports.getCurrentUsersLatestPost = (0, _reselect.createSelector)(getPostsInCurrentChannel, _common.getCurrentUser, function (_, rootId) {
    return rootId;
}, function (posts, currentUser, rootId) {
    var lastPost = null;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = posts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var post = _step3.value;

            // don't edit webhook posts, deleted posts, or system messages
            if (post.user_id !== currentUser.id || post.props && post.props.from_webhook || post.state === _constants.Posts.POST_DELETED || (0, _post_utils.isSystemMessage)(post) || (0, _post_utils.isPostEphemeral)(post) || (0, _post_utils.isPostPendingOrFailed)(post)) {
                continue;
            }

            if (rootId) {
                if (post.root_id === rootId || post.id === rootId) {
                    lastPost = post;
                    break;
                }
            } else {
                lastPost = post;
                break;
            }
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

    return lastPost;
});

function getPostIdsInChannel(state, channelId) {
    return state.entities.posts.postsInChannel[channelId];
}

var isPostIdSending = exports.isPostIdSending = function isPostIdSending(state, postId) {
    return state.entities.posts.sendingPostIds.some(function (sendingPostId) {
        return sendingPostId === postId;
    });
};