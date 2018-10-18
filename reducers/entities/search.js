'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _action_types = require('../../action_types');

var _constants = require('../../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function results() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_POSTS:
            {
                if (action.isGettingMore) {
                    return [].concat(_toConsumableArray(new Set(state.concat(action.data.order))));
                }
                return action.data.order;
            }
        case _action_types.PostTypes.REMOVE_POST:
            {
                var postId = action.data ? action.data.id : null;
                var index = state.indexOf(postId);
                if (index !== -1) {
                    var newState = [].concat(_toConsumableArray(state));
                    newState.splice(index, 1);
                    return newState;
                }
                return state;
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_POSTS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function matches() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_POSTS:
            if (action.isGettingMore) {
                return Object.assign({}, state, action.data.matches);
            }
            return action.data.matches || {};
        case _action_types.PostTypes.REMOVE_POST:
            {
                if (!state[action.data.id]) {
                    return state;
                }

                var newState = _extends({}, state);
                Reflect.deleteProperty(newState, action.data.id);
                return newState;
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_POSTS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function flagged() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_FLAGGED_POSTS:
            {
                return action.data.order;
            }
        case _action_types.PostTypes.REMOVE_POST:
            {
                var postId = action.data ? action.data.id : null;
                var index = state.indexOf(postId);
                if (index !== -1) {
                    var newState = [].concat(_toConsumableArray(state));
                    newState.splice(index, 1);
                    return newState;
                }
                return state;
            }
        case _action_types.PreferenceTypes.RECEIVED_PREFERENCES:
            {
                if (action.data) {
                    var nextState = [].concat(_toConsumableArray(state));
                    var hasNewFlaggedPosts = false;
                    action.data.forEach(function (pref) {
                        if (pref.category === _constants.Preferences.CATEGORY_FLAGGED_POST) {
                            var exists = nextState.find(function (p) {
                                return p === pref.name;
                            });
                            if (!exists) {
                                hasNewFlaggedPosts = true;
                                nextState.unshift(pref.name);
                            }
                        }
                    });

                    return hasNewFlaggedPosts ? nextState : state;
                }

                return state;
            }
        case _action_types.PreferenceTypes.DELETED_PREFERENCES:
            {
                if (action.data) {
                    var _nextState = [].concat(_toConsumableArray(state));
                    var flaggedPostsRemoved = false;
                    action.data.forEach(function (pref) {
                        if (pref.category === _constants.Preferences.CATEGORY_FLAGGED_POST) {
                            var _index = state.indexOf(pref.name);
                            if (_index !== -1) {
                                flaggedPostsRemoved = true;
                                _nextState.splice(_index, 1);
                            }
                        }
                    });

                    return flaggedPostsRemoved ? _nextState : state;
                }

                return state;
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_POSTS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function recent() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var data = action.data,
        type = action.type;


    switch (type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_TERM:
            {
                var nextState = _extends({}, state);
                var teamId = data.teamId,
                    params = data.params;

                var _ref = params || {},
                    terms = _ref.terms,
                    isOrSearch = _ref.isOrSearch;

                var team = [].concat(_toConsumableArray(nextState[teamId] || []));
                var index = team.findIndex(function (r) {
                    return r.terms === terms;
                });
                if (index === -1) {
                    team.push({ terms: terms, isOrSearch: isOrSearch });
                } else {
                    team[index] = { terms: terms, isOrSearch: isOrSearch };
                }
                return _extends({}, nextState, _defineProperty({}, teamId, team));
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_TERM:
            {
                var _nextState2 = _extends({}, state);
                var _teamId = data.teamId,
                    _terms = data.terms;

                var _team = [].concat(_toConsumableArray(_nextState2[_teamId] || []));
                var _index2 = _team.findIndex(function (r) {
                    return r.terms === _terms;
                });

                if (_index2 !== -1) {
                    _team.splice(_index2, 1);

                    return _extends({}, _nextState2, _defineProperty({}, _teamId, _team));
                }

                return _nextState2;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function current() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var data = action.data,
        type = action.type;

    switch (type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_TERM:
            {
                var nextState = _extends({}, state);
                var teamId = data.teamId,
                    params = data.params,
                    isEnd = data.isEnd;

                return _extends({}, nextState, _defineProperty({}, teamId, {
                    params: params,
                    isEnd: isEnd
                }));
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

function isSearchingTerm() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.SEARCH_POSTS_REQUEST:
            return !action.isGettingMore;
        case _action_types.SearchTypes.SEARCH_POSTS_FAILURE:
        case _action_types.SearchTypes.SEARCH_POSTS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function isSearchGettingMore() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.SEARCH_POSTS_REQUEST:
            return action.isGettingMore;
        case _action_types.SearchTypes.SEARCH_POSTS_FAILURE:
        case _action_types.SearchTypes.SEARCH_POSTS_SUCCESS:
            return false;
        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // An ordered array with posts ids of flagged posts
    flagged: flagged,

    // An ordered array with posts ids from the search results
    results: results,

    // Object where every key is a post id mapping to an array of matched words in that post
    matches: matches,

    // Object where every key is a team composed with
    // an object where the key is the term and the value indicates is "or" search
    recent: recent,

    // Object holding the current searches for every team
    current: current,

    // Boolean true if we are are searching initally
    isSearchingTerm: isSearchingTerm,

    // Boolean true if we are getting more search results
    isSearchGettingMore: isSearchGettingMore
});