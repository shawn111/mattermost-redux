'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function searchPosts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.SearchTypes.REMOVE_SEARCH_POSTS) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.SearchTypes.SEARCH_POSTS_REQUEST, _action_types.SearchTypes.SEARCH_POSTS_SUCCESS, _action_types.SearchTypes.SEARCH_POSTS_FAILURE, state, action);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function flaggedPosts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.SearchTypes.REMOVE_SEARCH_POSTS) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.SearchTypes.SEARCH_FLAGGED_POSTS_REQUEST, _action_types.SearchTypes.SEARCH_FLAGGED_POSTS_SUCCESS, _action_types.SearchTypes.SEARCH_FLAGGED_POSTS_FAILURE, state, action);
}

function recentMentions() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.SearchTypes.REMOVE_SEARCH_POSTS) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.SearchTypes.SEARCH_RECENT_MENTIONS_REQUEST, _action_types.SearchTypes.SEARCH_RECENT_MENTIONS_SUCCESS, _action_types.SearchTypes.SEARCH_RECENT_MENTIONS_FAILURE, state, action);
}

exports.default = (0, _redux.combineReducers)({
    flaggedPosts: flaggedPosts,
    recentMentions: recentMentions,
    searchPosts: searchPosts
});