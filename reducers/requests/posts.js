'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function createPost() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.PostTypes.CREATE_POST_RESET_REQUEST) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.PostTypes.CREATE_POST_REQUEST, _action_types.PostTypes.CREATE_POST_SUCCESS, _action_types.PostTypes.CREATE_POST_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function editPost() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.EDIT_POST_REQUEST, _action_types.PostTypes.EDIT_POST_SUCCESS, _action_types.PostTypes.EDIT_POST_FAILURE, state, action);
}

function deletePost() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.DELETE_POST_REQUEST, _action_types.PostTypes.DELETE_POST_SUCCESS, _action_types.PostTypes.DELETE_POST_FAILURE, state, action);
}

function getPostThread() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.GET_POST_THREAD_REQUEST, _action_types.PostTypes.GET_POST_THREAD_SUCCESS, _action_types.PostTypes.GET_POST_THREAD_FAILURE, state, action);
}

function getPostThreadWithRetryAttempt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.GET_POST_THREAD_WITH_RETRY_ATTEMPT:
            return state + 1;
        case _action_types.PostTypes.GET_POST_THREAD_REQUEST:
        case _action_types.PostTypes.GET_POST_THREAD_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function getPosts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.GET_POSTS_REQUEST, _action_types.PostTypes.GET_POSTS_SUCCESS, _action_types.PostTypes.GET_POSTS_FAILURE, state, action);
}

function getPostsWithRetryAttempt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.GET_POSTS_WITH_RETRY_ATTEMPT:
            return state + 1;
        case _action_types.PostTypes.GET_POSTS_REQUEST:
        case _action_types.PostTypes.GET_POSTS_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function getPostsSince() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.GET_POSTS_SINCE_REQUEST, _action_types.PostTypes.GET_POSTS_SINCE_SUCCESS, _action_types.PostTypes.GET_POSTS_SINCE_FAILURE, state, action);
}

function getPostsSinceWithRetryAttempt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.GET_POSTS_SINCE_WITH_RETRY_ATTEMPT:
            return state + 1;
        case _action_types.PostTypes.GET_POSTS_REQUEST:
        case _action_types.PostTypes.GET_POSTS_SINCE_REQUEST:
        case _action_types.PostTypes.GET_POSTS_SINCE_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function getPostsBefore() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.GET_POSTS_BEFORE_REQUEST, _action_types.PostTypes.GET_POSTS_BEFORE_SUCCESS, _action_types.PostTypes.GET_POSTS_BEFORE_FAILURE, state, action);
}

function getPostsBeforeWithRetryAttempt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.GET_POSTS_BEFORE_WITH_RETRY_ATTEMPT:
            return state + 1;
        case _action_types.PostTypes.GET_POSTS_REQUEST:
        case _action_types.PostTypes.GET_POSTS_BEFORE_REQUEST:
        case _action_types.PostTypes.GET_POSTS_BEFORE_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function getPostsAfter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.GET_POSTS_AFTER_REQUEST, _action_types.PostTypes.GET_POSTS_AFTER_SUCCESS, _action_types.PostTypes.GET_POSTS_AFTER_FAILURE, state, action);
}

function getPostsAfterWithRetryAttempt() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.PostTypes.GET_POSTS_AFTER_WITH_RETRY_ATTEMPT:
            return state + 1;
        case _action_types.PostTypes.GET_POSTS_REQUEST:
        case _action_types.PostTypes.GET_POSTS_AFTER_REQUEST:
        case _action_types.PostTypes.GET_POSTS_AFTER_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function reaction() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.REACTION_REQUEST, _action_types.PostTypes.REACTION_SUCCESS, _action_types.PostTypes.REACTION_FAILURE, state, action);
}

function openGraph() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.OPEN_GRAPH_REQUEST, _action_types.PostTypes.OPEN_GRAPH_SUCCESS, _action_types.PostTypes.OPEN_GRAPH_FAILURE, state, action);
}

function doPostAction() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    return (0, _helpers.handleRequest)(_action_types.PostTypes.DO_POST_ACTION_REQUEST, _action_types.PostTypes.DO_POST_ACTION_SUCCESS, _action_types.PostTypes.DO_POST_ACTION_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost,
    getPostThread: getPostThread,
    getPostThreadRetryAttempts: getPostThreadWithRetryAttempt,
    getPosts: getPosts,
    getPostsRetryAttempts: getPostsWithRetryAttempt,
    getPostsSince: getPostsSince,
    getPostsSinceRetryAttempts: getPostsSinceWithRetryAttempt,
    getPostsBefore: getPostsBefore,
    getPostsBeforeRetryAttempts: getPostsBeforeWithRetryAttempt,
    getPostsAfter: getPostsAfter,
    getPostsAfterRetryAttempts: getPostsAfterWithRetryAttempt,
    reaction: reaction,
    openGraph: openGraph,
    doPostAction: doPostAction
});