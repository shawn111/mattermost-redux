'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var _handlePosts = handlePosts(state.posts, state.postsInChannel, state.postsInThread, action),
        posts = _handlePosts.posts,
        postsInChannel = _handlePosts.postsInChannel,
        postsInThread = _handlePosts.postsInThread;

    var nextState = {

        // Object mapping post ids to post objects
        posts: posts,

        // Array that contains the pending post ids for those messages that are in transition to being created
        pendingPostIds: handlePendingPosts(state.pendingPostIds, action),

        // Array that contains the sending post ids for those messages being sent to the server.
        sendingPostIds: handleSendingPosts(state.sendingPostIds, action),

        // Object mapping channel ids to an array of posts ids in that channel with the most recent post first
        postsInChannel: postsInChannel,

        // Object mapping post root ids to an array of posts ids in that thread with no guaranteed order
        postsInThread: postsInThread,

        // The current selected post
        selectedPostId: selectedPostId(state.selectedPostId, action),

        // The current selected focused post (permalink view)
        currentFocusedPostId: currentFocusedPostId(state.currentFocusedPostId, action),

        // Object mapping post ids to an object of emoji reactions using userId-emojiName as keys
        reactions: reactions(state.reactions, action),

        // Object mapping URLs to their relevant opengraph metadata for link previews
        openGraph: openGraph(state.openGraph, action),

        // History of posts and comments
        messagesHistory: messagesHistory(state.messagesHistory, action)
    };

    if (state.posts === nextState.posts && state.postsInChannel === nextState.postsInChannel && state.postsInThread === nextState.postsInThread && state.pendingPostIds === nextState.pendingPostIds && state.sendingPostIds === nextState.sendingPostIds && state.selectedPostId === nextState.selectedPostId && state.currentFocusedPostId === nextState.currentFocusedPostId && state.reactions === nextState.reactions && state.openGraph === nextState.openGraph && state.messagesHistory === nextState.messagesHistory) {
        // None of the children have changed so don't even let the parent object change
        return state;
    }

    return nextState;
};

var _action_types = require('../../action_types');

var _constants = require('../../constants');

var _post_utils = require('../../utils/post_utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function handleReceivedPost() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var post = action.data;
    var channelId = post.channel_id;

    var nextPosts = _extends({}, posts, _defineProperty({}, post.id, post));

    var nextPostsInChannel = postsInChannel;

    // Only change postsInChannel if the order of the posts needs to change
    if (!postsInChannel[channelId] || !postsInChannel[channelId].includes(post.id)) {
        // If we don't already have the post, assume it's the most recent one
        var postsForChannel = postsInChannel[channelId] || [];

        nextPostsInChannel = _extends({}, postsInChannel);
        nextPostsInChannel[channelId] = [post.id].concat(_toConsumableArray(postsForChannel));
    }

    var nextPostsInThread = postsInThread;
    if (post.root_id && (!postsInThread[post.root_id] || !postsInThread[post.root_id].includes(post.id))) {
        var postsForThread = postsInThread[post.root_id] || [];

        nextPostsInThread = _extends({}, postsInThread);
        nextPostsInThread[post.root_id] = [post.id].concat(_toConsumableArray(postsForThread));
    }

    var withCombineSystemPosts = (0, _post_utils.combineSystemPosts)(nextPostsInChannel[channelId], nextPosts);
    nextPostsInChannel[channelId] = withCombineSystemPosts.postsForChannel;

    return { posts: withCombineSystemPosts.nextPosts, postsInChannel: nextPostsInChannel, postsInThread: nextPostsInThread };
}

function handleRemovePendingPost() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var pendingPostId = action.data.id;
    var channelId = action.data.channel_id;
    var pendingPost = posts[pendingPostId];

    var nextPosts = _extends({}, posts);

    Reflect.deleteProperty(nextPosts, pendingPostId);

    var nextPostsInChannel = postsInChannel;

    // Only change postsInChannel if the order of the posts needs to change
    if (!postsInChannel[channelId] || postsInChannel[channelId].includes(pendingPostId)) {
        // If we don't already have the post, assume it's the most recent one
        var postsForChannel = postsInChannel[channelId] || [];

        nextPostsInChannel = _extends({}, postsInChannel);
        nextPostsInChannel[channelId] = postsForChannel.filter(function (postId) {
            return postId !== pendingPostId;
        });
    }

    var nextPostsInThread = postsInThread;
    if (pendingPost.root_id && (!postsInThread[pendingPost.root_id] || postsInThread[pendingPost.root_id].includes(pendingPostId))) {
        var postsForThread = postsInThread[pendingPost.root_id] || [];

        nextPostsInThread = _extends({}, postsInThread);
        nextPostsInThread[pendingPost.root_id] = postsForThread.filter(function (postId) {
            return postId !== pendingPostId;
        });
    }

    return { posts: nextPosts, postsInChannel: nextPostsInChannel, postsInThread: nextPostsInThread };
}

function handleReceivedPosts() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var newPosts = action.data.posts;
    var channelId = action.channelId;
    var skipAddToChannel = action.skipAddToChannel;

    // Change the state only if we have new posts,
    // otherwise there's no need to create a new object for the same state.
    if (!Object.keys(newPosts).length) {
        return { posts: posts, postsInChannel: postsInChannel, postsInThread: postsInThread };
    }

    var nextPosts = _extends({}, posts);
    var nextPostsInChannel = _extends({}, postsInChannel);
    var nextPostsInThread = _extends({}, postsInThread);
    var postsForChannel = postsInChannel[channelId] ? [].concat(_toConsumableArray(postsInChannel[channelId])) : [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.values(newPosts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var newPost = _step.value;

            if (newPost.delete_at > 0) {
                // Mark the post as deleted if we have it
                if (nextPosts[newPost.id]) {
                    nextPosts[newPost.id] = _extends({}, newPost, {
                        state: _constants.Posts.POST_DELETED,
                        file_ids: [],
                        has_reactions: false
                    });
                } else {
                    continue;
                }
            }

            // Only change the stored post if it's changed since we last received it
            if (!nextPosts[newPost.id] || nextPosts[newPost.id].update_at < newPost.update_at) {
                nextPosts[newPost.id] = newPost;
            }

            if (!skipAddToChannel && !postsForChannel.includes(newPost.id)) {
                // Just add the post id to the end of the order and we'll sort it out later
                postsForChannel.push(newPost.id);
            }

            // Remove any temporary posts
            if (nextPosts[newPost.pending_post_id]) {
                Reflect.deleteProperty(nextPosts, newPost.pending_post_id);

                var _index = postsForChannel.indexOf(newPost.pending_post_id);
                if (_index !== -1) {
                    postsForChannel.splice(_index, 1);
                }
            }

            if (!newPost.root_id) {
                continue;
            }

            var postsForThread = nextPostsInThread[newPost.root_id] ? [].concat(_toConsumableArray(nextPostsInThread[newPost.root_id])) : [];
            if (!postsForThread.includes(newPost.id)) {
                postsForThread.push(newPost.id);
            }

            var index = postsForThread.indexOf(newPost.pending_post_id);
            if (index !== -1) {
                postsForThread.splice(index, 1);
            }

            nextPostsInThread[newPost.root_id] = postsForThread;
        }

        // Sort to ensure that the most recent posts are first, with pending
        // and failed posts first
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

    postsForChannel.sort(function (a, b) {
        return (0, _post_utils.comparePosts)(nextPosts[a], nextPosts[b]);
    });

    var withCombineSystemPosts = (0, _post_utils.combineSystemPosts)(postsForChannel, nextPosts, channelId);
    nextPostsInChannel[channelId] = withCombineSystemPosts.postsForChannel;

    return { posts: withCombineSystemPosts.nextPosts, postsInChannel: nextPostsInChannel, postsInThread: nextPostsInThread };
}

function handlePendingPosts() {
    var pendingPostIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_NEW_POST:
            {
                var post = action.data;
                var nextPendingPostIds = [].concat(_toConsumableArray(pendingPostIds));
                if (post.pending_post_id && !nextPendingPostIds.includes(post.pending_post_id)) {
                    nextPendingPostIds.push(post.pending_post_id);
                }
                return nextPendingPostIds;
            }
        case _action_types.PostTypes.REMOVE_PENDING_POST:
            {
                var pendingPostId = action.data.id;
                var _nextPendingPostIds = pendingPostIds.filter(function (postId) {
                    return postId !== pendingPostId;
                });
                return _nextPendingPostIds;
            }
        case _action_types.PostTypes.RECEIVED_POSTS:
            {
                var newPosts = action.data.posts;
                var _nextPendingPostIds2 = [].concat(_toConsumableArray(pendingPostIds));

                if (!Object.keys(newPosts).length) {
                    return pendingPostIds;
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.values(newPosts)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var newPost = _step2.value;

                        var index = _nextPendingPostIds2.indexOf(newPost.pending_post_id);
                        if (index !== -1) {
                            _nextPendingPostIds2.splice(index, 1);
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

                return _nextPendingPostIds2;
            }
        default:
            return pendingPostIds;
    }
}

function handleSendingPosts() {
    var sendingPostIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_NEW_POST:
            {
                var sendingPostId = action.data.id;
                if (sendingPostIds.includes(sendingPostId)) {
                    return sendingPostIds;
                }

                return [].concat(_toConsumableArray(sendingPostIds), [sendingPostId]);
            }
        case _action_types.PostTypes.RECEIVED_POST:
            {
                var _sendingPostId = action.data.id;
                if (!sendingPostIds.includes(_sendingPostId)) {
                    return sendingPostIds;
                }

                return sendingPostIds.filter(function (postId) {
                    return postId !== _sendingPostId;
                });
            }
        case _action_types.PostTypes.RECEIVED_POSTS:
            {
                var postIds = Object.values(action.data.posts).map(function (post) {
                    return post.pending_post_id;
                });

                var nextSendingPostIds = sendingPostIds.filter(function (sendingPostId) {
                    return !postIds.includes(sendingPostId);
                });
                if (nextSendingPostIds.length === sendingPostIds.length) {
                    return sendingPostIds;
                }

                return nextSendingPostIds;
            }
        default:
            return sendingPostIds;
    }
}

function handlePostsFromSearch() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var newPosts = action.data.posts;
    var info = { posts: posts, postsInChannel: postsInChannel, postsInThread: postsInThread };
    var postsForChannel = new Map();

    var postIds = Object.keys(newPosts);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = postIds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var id = _step3.value;

            var nextPost = newPosts[id];
            var channelId = nextPost.channel_id;
            if (postsForChannel.has(channelId)) {
                postsForChannel.get(channelId)[id] = nextPost;
            } else {
                postsForChannel.set(channelId, _defineProperty({}, id, nextPost));
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

    postsForChannel.forEach(function (postList, channelId) {
        info = handleReceivedPosts(info.posts, postsInChannel, postsInThread, { channelId: channelId, data: { posts: postList } });
    });

    return info;
}

function handlePostDeleted() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var post = action.data;
    var channelId = post.channel_id;

    var nextPosts = posts;
    var nextPostsForChannel = postsInChannel;
    var nextPostsForThread = postsInThread;

    // We only need to do something if already have the post
    if (posts[post.id]) {
        nextPosts = _extends({}, posts);
        nextPostsForChannel = _extends({}, postsInChannel);

        // Mark the post as deleted
        nextPosts[post.id] = _extends({}, posts[post.id], {
            state: _constants.Posts.POST_DELETED,
            file_ids: [],
            has_reactions: false
        });

        // Remove any of its comments
        var channelPosts = postsInChannel[channelId] ? [].concat(_toConsumableArray(postsInChannel[channelId])) : [];
        var postsForChannel = [].concat(_toConsumableArray(channelPosts)); // make sure we don't modify the array we loop over
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = channelPosts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var id = _step4.value;

                if (nextPosts[id].root_id === post.id) {
                    Reflect.deleteProperty(nextPosts, id);

                    var commentIndex = postsForChannel.indexOf(id);
                    if (commentIndex !== -1) {
                        postsForChannel.splice(commentIndex, 1);
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

        nextPostsForChannel[channelId] = postsForChannel;

        if (postsInThread[post.id]) {
            nextPostsForThread = _extends({}, postsInThread);
            Reflect.deleteProperty(nextPostsForThread, post.id);
        }
    }

    return { posts: nextPosts, postsInChannel: nextPostsForChannel, postsInThread: nextPostsForThread };
}

function handleRemovePost() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    var post = action.data;
    var channelId = post.channel_id;

    var nextPosts = posts;
    var nextPostsForChannel = postsInChannel;
    var nextPostsForThread = void 0;

    // We only need to do something if already have the post
    if (nextPosts[post.id]) {
        nextPosts = _extends({}, posts);
        nextPostsForChannel = _extends({}, postsInChannel);
        var channelPosts = postsInChannel[channelId] ? [].concat(_toConsumableArray(postsInChannel[channelId])) : [];

        // Remove the post itself
        Reflect.deleteProperty(nextPosts, post.id);

        var index = channelPosts.indexOf(post.id);
        if (index !== -1) {
            channelPosts.splice(index, 1);
        }

        // Create a copy of the channelPosts after we splice the
        // parent post so we can safely loop and have the latest changes
        var postsForChannel = [].concat(_toConsumableArray(channelPosts));

        // Remove any of its comments
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = channelPosts[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var id = _step5.value;

                if (nextPosts[id].root_id === post.id) {
                    Reflect.deleteProperty(nextPosts, id);

                    var commentIndex = postsForChannel.indexOf(id);
                    if (commentIndex !== -1) {
                        postsForChannel.splice(commentIndex, 1);
                    }
                }
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

        nextPostsForChannel[channelId] = postsForChannel;

        if (postsInThread[post.id]) {
            nextPostsForThread = nextPostsForThread || _extends({}, postsInThread);
            Reflect.deleteProperty(nextPostsForThread, post.id);
        }

        if (postsInThread[post.root_id]) {
            nextPostsForThread = nextPostsForThread || _extends({}, postsInThread);
            var threadPosts = [].concat(_toConsumableArray(postsInThread[post.root_id]));
            var threadIndex = threadPosts.indexOf(post.id);
            if (threadIndex !== -1) {
                threadPosts.splice(threadIndex, 1);
            }
            nextPostsForThread[post.root_id] = threadPosts;
        }
    }

    return { posts: nextPosts, postsInChannel: nextPostsForChannel, postsInThread: nextPostsForThread || postsInThread };
}

function handlePosts() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var postsInChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var postsInThread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var action = arguments[3];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_POST:
            {
                var nextPosts = _extends({}, posts);
                nextPosts[action.data.id] = action.data;
                return {
                    posts: nextPosts,
                    postsInChannel: postsInChannel,
                    postsInThread: postsInThread
                };
            }
        case _action_types.PostTypes.RECEIVED_NEW_POST:
            return handleReceivedPost(posts, postsInChannel, postsInThread, action);
        case _action_types.PostTypes.REMOVE_PENDING_POST:
            {
                return handleRemovePendingPost(posts, postsInChannel, postsInThread, action);
            }
        case _action_types.PostTypes.RECEIVED_POSTS:
            return handleReceivedPosts(posts, postsInChannel, postsInThread, action);
        case _action_types.PostTypes.POST_DELETED:
            if (action.data) {
                return handlePostDeleted(posts, postsInChannel, postsInThread, action);
            }
            return { posts: posts, postsInChannel: postsInChannel, postsInThread: postsInThread };
        case _action_types.PostTypes.REMOVE_POST:
            return handleRemovePost(posts, postsInChannel, postsInThread, action);

        case _action_types.SearchTypes.RECEIVED_SEARCH_POSTS:
        case _action_types.SearchTypes.RECEIVED_SEARCH_FLAGGED_POSTS:
            return handlePostsFromSearch(posts, postsInChannel, postsInThread, action);

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {
                posts: {},
                postsInChannel: {},
                postsInThread: {}
            };
        default:
            return {
                posts: posts,
                postsInChannel: postsInChannel,
                postsInThread: postsInThread
            };
    }
}

function selectedPostId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_POST_SELECTED:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}

function currentFocusedPostId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_FOCUSED_POST:
            return action.data;
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return '';
        default:
            return state;
    }
}

function reactions() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_REACTIONS:
            {
                var reactionsList = action.data;
                var nextReactions = {};
                reactionsList.forEach(function (reaction) {
                    nextReactions[reaction.user_id + '-' + reaction.emoji_name] = reaction;
                });

                return _extends({}, state, _defineProperty({}, action.postId, nextReactions));
            }
        case _action_types.PostTypes.RECEIVED_REACTION:
            {
                var reaction = action.data;
                var _nextReactions = _extends({}, state[reaction.post_id] || {});
                _nextReactions[reaction.user_id + '-' + reaction.emoji_name] = reaction;

                return _extends({}, state, _defineProperty({}, reaction.post_id, _nextReactions));
            }
        case _action_types.PostTypes.REACTION_DELETED:
            {
                var _reaction = action.data;
                var _nextReactions2 = _extends({}, state[_reaction.post_id] || {});
                if (!_nextReactions2[_reaction.user_id + '-' + _reaction.emoji_name]) {
                    return state;
                }

                Reflect.deleteProperty(_nextReactions2, _reaction.user_id + '-' + _reaction.emoji_name);

                return _extends({}, state, _defineProperty({}, _reaction.post_id, _nextReactions2));
            }
        case _action_types.PostTypes.POST_DELETED:
        case _action_types.PostTypes.REMOVE_POST:
            {
                var post = action.data;

                if (post && state[post.id]) {
                    var nextState = _extends({}, state);
                    Reflect.deleteProperty(nextState, post.id);

                    return nextState;
                }

                return state;
            }

        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function openGraph() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.RECEIVED_OPEN_GRAPH_METADATA:
            {
                var nextState = _extends({}, state);
                nextState[action.url] = action.data;

                return nextState;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function messagesHistory() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.ADD_MESSAGE_INTO_HISTORY:
            {
                var nextIndex = {};
                var nextMessages = state.messages ? [].concat(_toConsumableArray(state.messages)) : [];
                nextMessages.push(action.data);
                nextIndex[_constants.Posts.MESSAGE_TYPES.POST] = nextMessages.length;
                nextIndex[_constants.Posts.MESSAGE_TYPES.COMMENT] = nextMessages.length;

                if (nextMessages.length > _constants.Posts.MAX_PREV_MSGS) {
                    nextMessages = nextMessages.slice(1, _constants.Posts.MAX_PREV_MSGS + 1);
                }

                return {
                    messages: nextMessages,
                    index: nextIndex
                };
            }
        case _action_types.PostTypes.RESET_HISTORY_INDEX:
            {
                var index = {};
                index[_constants.Posts.MESSAGE_TYPES.POST] = -1;
                index[_constants.Posts.MESSAGE_TYPES.COMMENT] = -1;

                var messages = state.messages || [];
                var _nextIndex = state.index ? _extends({}, state.index) : index;
                _nextIndex[action.data] = messages.length;
                return {
                    messages: state.messages,
                    index: _nextIndex
                };
            }
        case _action_types.PostTypes.MOVE_HISTORY_INDEX_BACK:
            {
                var _index2 = {};
                _index2[_constants.Posts.MESSAGE_TYPES.POST] = -1;
                _index2[_constants.Posts.MESSAGE_TYPES.COMMENT] = -1;

                var _nextIndex2 = state.index ? _extends({}, state.index) : _index2;
                if (_nextIndex2[action.data] > 0) {
                    _nextIndex2[action.data]--;
                }
                return {
                    messages: state.messages,
                    index: _nextIndex2
                };
            }
        case _action_types.PostTypes.MOVE_HISTORY_INDEX_FORWARD:
            {
                var _index3 = {};
                _index3[_constants.Posts.MESSAGE_TYPES.POST] = -1;
                _index3[_constants.Posts.MESSAGE_TYPES.COMMENT] = -1;

                var _messages = state.messages || [];
                var _nextIndex3 = state.index ? _extends({}, state.index) : _index3;
                if (_nextIndex3[action.data] < _messages.length) {
                    _nextIndex3[action.data]++;
                }
                return {
                    messages: state.messages,
                    index: _nextIndex3
                };
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            {
                var _index4 = {};
                _index4[_constants.Posts.MESSAGE_TYPES.POST] = -1;
                _index4[_constants.Posts.MESSAGE_TYPES.COMMENT] = -1;

                return {
                    messages: [],
                    index: _index4
                };
            }
        default:
            return state;
    }
}