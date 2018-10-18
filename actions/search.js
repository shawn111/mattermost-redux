'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchPostsWithParams = searchPostsWithParams;
exports.searchPosts = searchPosts;
exports.getMorePostsForSearch = getMorePostsForSearch;
exports.clearSearch = clearSearch;
exports.getFlaggedPosts = getFlaggedPosts;
exports.getRecentMentions = getRecentMentions;
exports.removeSearchTerms = removeSearchTerms;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _action_types = require('../action_types');

var _teams = require('../selectors/entities/teams');

var _users = require('../selectors/entities/users');

var _channels = require('./channels');

var _helpers = require('./helpers');

var _errors = require('./errors');

var _posts = require('./posts');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var WEBAPP_SEARCH_PER_PAGE = 20;

function getMissingChannelsFromPosts(posts) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var _getState$entities$ch, channels, membersInChannel, myMembers, promises;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _getState$entities$ch = getState().entities.channels, channels = _getState$entities$ch.channels, membersInChannel = _getState$entities$ch.membersInChannel, myMembers = _getState$entities$ch.myMembers;
                            promises = [];


                            Object.values(posts).forEach(function (post) {
                                var id = post.channel_id;
                                if (!channels[id] || !myMembers[id]) {
                                    promises.push((0, _channels.getChannelAndMyMember)(id)(dispatch, getState));
                                }

                                if (!membersInChannel[id]) {
                                    promises.push((0, _channels.getChannelMembers)(id)(dispatch, getState));
                                }
                            });

                            return _context.abrupt('return', Promise.all(promises));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function searchPostsWithParams(teamId, params) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var isGettingMore, posts;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            isGettingMore = params.page > 0;

                            dispatch({
                                type: _action_types.SearchTypes.SEARCH_POSTS_REQUEST,
                                isGettingMore: isGettingMore
                            }, getState);

                            posts = void 0;
                            _context2.prev = 3;
                            _context2.next = 6;
                            return _client.Client4.searchPostsWithParams(teamId, params);

                        case 6:
                            posts = _context2.sent;
                            _context2.next = 9;
                            return Promise.all([(0, _posts.getProfilesAndStatusesForPosts)(posts.posts, dispatch, getState), getMissingChannelsFromPosts(posts.posts)(dispatch, getState)]);

                        case 9:
                            _context2.next = 16;
                            break;

                        case 11:
                            _context2.prev = 11;
                            _context2.t0 = _context2['catch'](3);

                            (0, _helpers.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.SearchTypes.SEARCH_POSTS_FAILURE, error: _context2.t0 }, (0, _errors.logError)(_context2.t0)]), getState);
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 16:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_POSTS,
                                data: posts,
                                isGettingMore: isGettingMore
                            }, {
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_TERM,
                                data: {
                                    teamId: teamId,
                                    params: params,
                                    isEnd: posts.order.length === 0
                                }
                            }, {
                                type: _action_types.SearchTypes.SEARCH_POSTS_SUCCESS
                            }], 'SEARCH_POST_BATCH'), getState);

                            return _context2.abrupt('return', { data: posts });

                        case 18:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[3, 11]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function searchPosts(teamId, terms, isOrSearch, includeDeletedChannels) {
    return searchPostsWithParams(teamId, { terms: terms, is_or_search: isOrSearch, include_deleted_channels: includeDeletedChannels, page: 0, per_page: WEBAPP_SEARCH_PER_PAGE });
}

function getMorePostsForSearch() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var teamId, _getState$entities$se, params, isEnd, newParams;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            teamId = (0, _teams.getCurrentTeamId)(getState());
                            _getState$entities$se = getState().entities.search.current[teamId], params = _getState$entities$se.params, isEnd = _getState$entities$se.isEnd;

                            if (isEnd) {
                                _context3.next = 6;
                                break;
                            }

                            newParams = Object.assign({}, params);

                            newParams.page += 1;
                            return _context3.abrupt('return', searchPostsWithParams(teamId, newParams)(dispatch, getState));

                        case 6:
                            return _context3.abrupt('return', {});

                        case 7:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function clearSearch() {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.SearchTypes.REMOVE_SEARCH_POSTS }, getState);

                            return _context4.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }));

        return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function getFlaggedPosts() {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var state, userId, teamId, posts;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            state = getState();
                            userId = (0, _users.getCurrentUserId)(state);
                            teamId = (0, _teams.getCurrentTeamId)(state);


                            dispatch({ type: _action_types.SearchTypes.SEARCH_FLAGGED_POSTS_REQUEST }, getState);

                            posts = void 0;
                            _context5.prev = 5;
                            _context5.next = 8;
                            return _client.Client4.getFlaggedPosts(userId, '', teamId);

                        case 8:
                            posts = _context5.sent;
                            _context5.next = 11;
                            return Promise.all([(0, _posts.getProfilesAndStatusesForPosts)(posts.posts, dispatch, getState), getMissingChannelsFromPosts(posts.posts)(dispatch, getState)]);

                        case 11:
                            _context5.next = 18;
                            break;

                        case 13:
                            _context5.prev = 13;
                            _context5.t0 = _context5['catch'](5);

                            (0, _helpers.forceLogoutIfNecessary)(_context5.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.SearchTypes.SEARCH_FLAGGED_POSTS_FAILURE, error: _context5.t0 }, (0, _errors.logError)(_context5.t0)]), getState);
                            return _context5.abrupt('return', { error: _context5.t0 });

                        case 18:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_FLAGGED_POSTS,
                                data: posts
                            }, {
                                type: _action_types.SearchTypes.SEARCH_FLAGGED_POSTS_SUCCESS
                            }], 'SEARCH_FLAGGED_POSTS_BATCH'), getState);

                            return _context5.abrupt('return', { data: posts });

                        case 20:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[5, 13]]);
        }));

        return function (_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function getRecentMentions() {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            var state, teamId, posts, termKeys, terms;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            state = getState();
                            teamId = (0, _teams.getCurrentTeamId)(state);


                            dispatch({ type: _action_types.SearchTypes.SEARCH_RECENT_MENTIONS_REQUEST }, getState);

                            posts = void 0;
                            _context6.prev = 4;
                            termKeys = (0, _users.getCurrentUserMentionKeys)(state).filter(function (_ref7) {
                                var key = _ref7.key;

                                return key !== '@channel' && key !== '@all' && key !== '@here';
                            });
                            terms = termKeys.map(function (_ref8) {
                                var key = _ref8.key;
                                return key;
                            }).join(' ').trim() + ' ';


                            _client.Client4.trackEvent('api', 'api_posts_search_mention');
                            _context6.next = 10;
                            return _client.Client4.searchPosts(teamId, terms, true);

                        case 10:
                            posts = _context6.sent;
                            _context6.next = 13;
                            return Promise.all([(0, _posts.getProfilesAndStatusesForPosts)(posts.posts, dispatch, getState), getMissingChannelsFromPosts(posts.posts)(dispatch, getState)]);

                        case 13:
                            _context6.next = 20;
                            break;

                        case 15:
                            _context6.prev = 15;
                            _context6.t0 = _context6['catch'](4);

                            (0, _helpers.forceLogoutIfNecessary)(_context6.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.SearchTypes.SEARCH_RECENT_MENTIONS_FAILURE, error: _context6.t0 }, (0, _errors.logError)(_context6.t0)]), getState);
                            return _context6.abrupt('return', { error: _context6.t0 });

                        case 20:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_POSTS,
                                data: posts
                            }, {
                                type: _action_types.SearchTypes.SEARCH_RECENT_MENTIONS_SUCCESS
                            }], 'SEARCH_RECENT_MENTIONS_BATCH'), getState);

                            return _context6.abrupt('return', { data: posts });

                        case 22:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6, [[4, 15]]);
        }));

        return function (_x11, _x12) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function removeSearchTerms(teamId, terms) {
    var _this7 = this;

    return function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({
                                type: _action_types.SearchTypes.REMOVE_SEARCH_TERM,
                                data: {
                                    teamId: teamId,
                                    terms: terms
                                }
                            }, getState);

                            return _context7.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }));

        return function (_x13, _x14) {
            return _ref9.apply(this, arguments);
        };
    }();
}

exports.default = {
    clearSearch: clearSearch,
    removeSearchTerms: removeSearchTerms,
    searchPosts: searchPosts
};