'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

exports.saveAppPropsRequest = saveAppPropsRequest;
exports.saveAppProps = saveAppProps;
exports.selectSearchText = selectSearchText;
exports.updateSearchText = updateSearchText;
exports.searchBarTextSave = searchBarTextSave;
exports.invalidateSearchText = invalidateSearchText;
exports.requestSearch = requestSearch;
exports.receiveSearch = receiveSearch;
exports.receiveSearchEnd = receiveSearchEnd;
exports.errorSearching = errorSearching;
exports.receiveCategorySearch = receiveCategorySearch;
exports.clearSearchResults = clearSearchResults;
exports.requestSearchById = requestSearchById;
exports.receiveSearchById = receiveSearchById;
exports.errorSearchById = errorSearchById;
exports.searchScrollPosition = searchScrollPosition;
exports.searchPriorLocation = searchPriorLocation;
exports.searchGfycat = searchGfycat;
exports.searchCategory = searchCategory;
exports.shouldSearch = shouldSearch;
exports.searchIfNeeded = searchIfNeeded;
exports.searchIfNeededInitial = searchIfNeededInitial;
exports.shouldSearchInitial = shouldSearchInitial;
exports.searchById = searchById;
exports.shouldSearchById = shouldSearchById;
exports.searchByIdIfNeeded = searchByIdIfNeeded;
exports.saveSearchScrollPosition = saveSearchScrollPosition;
exports.saveSearchPriorLocation = saveSearchPriorLocation;
exports.searchTextUpdate = searchTextUpdate;
exports.saveSearchBarText = saveSearchBarText;
exports.categoriesListRequest = categoriesListRequest;
exports.categoriesListReceived = categoriesListReceived;
exports.categoriesListFailure = categoriesListFailure;
exports.requestCategoriesList = requestCategoriesList;
exports.requestCategoriesListIfNeeded = requestCategoriesListIfNeeded;
exports.shouldRequestCategoriesList = shouldRequestCategoriesList;
exports.cacheRequest = cacheRequest;
exports.cacheGifs = cacheGifs;
exports.cacheGifsRequest = cacheGifsRequest;

var _action_types = require('../action_types');

var _client = require('../client');

var _gfycat_sdk = require('../utils/gfycat_sdk');

var _gfycat_sdk2 = _interopRequireDefault(_gfycat_sdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// APP PROPS

function saveAppPropsRequest(props) {
    return {
        type: _action_types.GifTypes.SAVE_APP_PROPS,
        props: props
    };
}

function saveAppProps(appProps) {
    return function (dispatch, getState) {
        var _getState$entities$ge = getState().entities.general.config,
            GfycatApiKey = _getState$entities$ge.GfycatApiKey,
            GfycatApiSecret = _getState$entities$ge.GfycatApiSecret;

        (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).authenticate();
        dispatch(saveAppPropsRequest(appProps));
    };
}

// SEARCH

function selectSearchText(searchText) {
    return {
        type: _action_types.GifTypes.SELECT_SEARCH_TEXT,
        searchText: searchText
    };
}

function updateSearchText(searchText) {
    return {
        type: _action_types.GifTypes.UPDATE_SEARCH_TEXT,
        searchText: searchText
    };
}

function searchBarTextSave(searchBarText) {
    return {
        type: _action_types.GifTypes.SAVE_SEARCH_BAR_TEXT,
        searchBarText: searchBarText
    };
}

function invalidateSearchText(searchText) {
    return {
        type: _action_types.GifTypes.INVALIDATE_SEARCH_TEXT,
        searchText: searchText
    };
}

function requestSearch(searchText) {
    return {
        type: _action_types.GifTypes.REQUEST_SEARCH,
        searchText: searchText
    };
}

function receiveSearch(_ref) {
    var searchText = _ref.searchText,
        count = _ref.count,
        start = _ref.start,
        json = _ref.json;

    return _extends({
        type: _action_types.GifTypes.RECEIVE_SEARCH,
        searchText: searchText
    }, json, {
        count: count,
        start: start,
        currentPage: start / count,
        receivedAt: Date.now()
    });
}

function receiveSearchEnd(searchText) {
    return {
        type: _action_types.GifTypes.RECEIVE_SEARCH_END,
        searchText: searchText
    };
}

function errorSearching(err, searchText) {
    return {
        type: _action_types.GifTypes.SEARCH_FAILURE,
        searchText: searchText,
        err: err
    };
}

function receiveCategorySearch(_ref2) {
    var tagName = _ref2.tagName,
        json = _ref2.json;

    return _extends({
        type: _action_types.GifTypes.RECEIVE_CATEGORY_SEARCH,
        searchText: tagName
    }, json, {
        receiveAt: Date.now()
    });
}

function clearSearchResults() {
    return {
        type: _action_types.GifTypes.CLEAR_SEARCH_RESULTS
    };
}

function requestSearchById(gfyId) {
    return {
        type: _action_types.GifTypes.SEARCH_BY_ID_REQUEST,
        payload: {
            gfyId: gfyId
        }
    };
}

function receiveSearchById(gfyId, gfyItem) {
    return {
        type: _action_types.GifTypes.SEARCH_BY_ID_SUCCESS,
        payload: {
            gfyId: gfyId,
            gfyItem: gfyItem
        }
    };
}

function errorSearchById(err, gfyId) {
    return {
        type: _action_types.GifTypes.SEARCH_BY_ID_FAILURE,
        err: err,
        gfyId: gfyId
    };
}

function searchScrollPosition(scrollPosition) {
    return {
        type: _action_types.GifTypes.SAVE_SEARCH_SCROLL_POSITION,
        scrollPosition: scrollPosition
    };
}

function searchPriorLocation(priorLocation) {
    return {
        type: _action_types.GifTypes.SAVE_SEARCH_PRIOR_LOCATION,
        priorLocation: priorLocation
    };
}

function searchGfycat(_ref3) {
    var searchText = _ref3.searchText,
        _ref3$count = _ref3.count,
        count = _ref3$count === undefined ? 30 : _ref3$count,
        _ref3$startIndex = _ref3.startIndex,
        startIndex = _ref3$startIndex === undefined ? 0 : _ref3$startIndex;

    var start = startIndex;
    return function (dispatch, getState) {
        var _getState$entities$ge2 = getState().entities.general.config,
            GfycatApiKey = _getState$entities$ge2.GfycatApiKey,
            GfycatApiSecret = _getState$entities$ge2.GfycatApiSecret;
        var resultsByTerm = getState().entities.gifs.search.resultsByTerm;

        if (resultsByTerm[searchText]) {
            start = resultsByTerm[searchText].start + count;
        }
        dispatch(requestSearch(searchText, count, start));
        (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).authenticate();
        return (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).search({ search_text: searchText, count: count, start: start }).then(function (json) {
            if (json.errorMessage) {
                // There was no results before
                if (resultsByTerm[searchText].items) {
                    dispatch(receiveSearchEnd(searchText));
                } else {
                    dispatch(errorSearching(json, searchText));
                }
            } else {
                dispatch(updateSearchText(searchText));
                dispatch(cacheGifsRequest(json.gfycats));
                dispatch(receiveSearch({ searchText: searchText, count: count, start: start, json: json }));

                var context = getState().entities.gifs.categories.tagsDict[searchText] ? 'category' : 'search';
                _client.Client4.trackEvent('gfycat', 'views', { context: context, count: json.gfycats.length, keyword: searchText });
            }
        }).catch(function (err) {
            return dispatch(errorSearching(err, searchText));
        });
    };
}

function searchCategory(_ref4) {
    var _ref4$tagName = _ref4.tagName,
        tagName = _ref4$tagName === undefined ? '' : _ref4$tagName,
        _ref4$gfyCount = _ref4.gfyCount,
        gfyCount = _ref4$gfyCount === undefined ? 30 : _ref4$gfyCount,
        cursorPos = _ref4.cursorPos;

    var cursor = cursorPos;
    return function (dispatch, getState) {
        var _getState$entities$ge3 = getState().entities.general.config,
            GfycatApiKey = _getState$entities$ge3.GfycatApiKey,
            GfycatApiSecret = _getState$entities$ge3.GfycatApiSecret;
        var resultsByTerm = getState().entities.gifs.search.resultsByTerm;

        if (resultsByTerm[tagName]) {
            cursor = resultsByTerm[tagName].cursor;
        }
        dispatch(requestSearch(tagName));
        return (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).getTrendingCategories({ tagName: tagName, gfyCount: gfyCount, cursor: cursor }).then(function (json) {
            if (json.errorMessage) {
                if (resultsByTerm[tagName].gfycats) {
                    dispatch(receiveSearchEnd(tagName));
                } else {
                    dispatch(errorSearching(json, tagName));
                }
            } else {
                dispatch(updateSearchText(tagName));
                dispatch(cacheGifsRequest(json.gfycats));
                dispatch(receiveCategorySearch({ tagName: tagName, json: json }));

                _client.Client4.trackEvent('gfycat', 'views', { context: 'category', count: json.gfycats.length, keyword: tagName });

                // preload categories list
                if (tagName === 'trending') {
                    dispatch(requestCategoriesListIfNeeded());
                }
            }
        }).catch(function (err) {
            return dispatch(errorSearching(err, tagName));
        });
    };
}

function shouldSearch(state, searchText) {
    var resultsByTerm = state.search.resultsByTerm[searchText];
    if (!resultsByTerm) {
        return true;
    } else if (resultsByTerm.isFetching) {
        return false;
    } else if (resultsByTerm.moreRemaining) {
        return true;
    }
    return resultsByTerm.didInvalidate;
}

function searchIfNeeded(searchText) {
    return function (dispatch, getState) {
        if (shouldSearch(getState(), searchText)) {
            if (searchText.toLowerCase() === 'trending') {
                return dispatch(searchCategory({ tagName: searchText }));
            }
            return dispatch(searchGfycat({ searchText: searchText }));
        }
        return Promise.resolve();
    };
}

function searchIfNeededInitial(searchText) {
    return function (dispatch, getState) {
        dispatch(updateSearchText(searchText));
        if (shouldSearchInitial(getState(), searchText)) {
            if (searchText.toLowerCase() === 'trending') {
                return dispatch(searchCategory({ tagName: searchText }));
            }
            return dispatch(searchGfycat({ searchText: searchText }));
        }
        return Promise.resolve();
    };
}

function shouldSearchInitial(state, searchText) {
    var resultsByTerm = state.entities.gifs.search.resultsByTerm[searchText];
    if (!resultsByTerm) {
        return true;
    } else if (resultsByTerm.isFetching) {
        return false;
    }
    return false;
}

function searchById(gfyId) {
    return function (dispatch, getState) {
        var _getState$entities$ge4 = getState().entities.general.config,
            GfycatApiKey = _getState$entities$ge4.GfycatApiKey,
            GfycatApiSecret = _getState$entities$ge4.GfycatApiSecret;

        dispatch(requestSearchById(gfyId));
        return (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).searchById({ id: gfyId }).then(function (response) {
            dispatch(receiveSearchById(gfyId, response.gfyItem));
            dispatch(cacheGifsRequest([response.gfyItem]));
        }).catch(function (err) {
            return dispatch(errorSearchById(err, gfyId));
        });
    };
}

function shouldSearchById(state, gfyId) {
    return !state.cache.gifs[gfyId];
}

function searchByIdIfNeeded(gfyId) {
    return function (dispatch, getState) {
        if (shouldSearchById(getState(), gfyId)) {
            return dispatch(searchById(gfyId));
        }
        return Promise.resolve(getState().cache.gifs[gfyId]);
    };
}

function saveSearchScrollPosition(scrollPosition) {
    return function (dispatch) {
        dispatch(searchScrollPosition(scrollPosition));
    };
}

function saveSearchPriorLocation(priorLocation) {
    return function (dispatch) {
        dispatch(searchPriorLocation(priorLocation));
    };
}

function searchTextUpdate(searchText) {
    return function (dispatch) {
        dispatch(updateSearchText(searchText));
    };
}

function saveSearchBarText(searchBarText) {
    return function (dispatch) {
        dispatch(searchBarTextSave(searchBarText));
    };
}

// CATEGORIES

function categoriesListRequest() {
    return {
        type: _action_types.GifTypes.REQUEST_CATEGORIES_LIST
    };
}

function categoriesListReceived(json) {
    return _extends({
        type: _action_types.GifTypes.CATEGORIES_LIST_RECEIVED
    }, json);
}

function categoriesListFailure(err) {
    return {
        type: _action_types.GifTypes.CATEGORIES_LIST_FAILURE,
        err: err
    };
}

function requestCategoriesList() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$count = _ref5.count,
        count = _ref5$count === undefined ? 60 : _ref5$count;

    return function (dispatch, getState) {
        var _getState$entities$ge5 = getState().entities.general.config,
            GfycatApiKey = _getState$entities$ge5.GfycatApiKey,
            GfycatApiSecret = _getState$entities$ge5.GfycatApiSecret;

        var state = getState().entities.gifs.categories;
        if (!shouldRequestCategoriesList(state)) {
            return Promise.resolve();
        }
        dispatch(categoriesListRequest());
        var cursor = state.cursor;

        var options = _extends({}, count && { count: count }, cursor && { cursor: cursor });
        return (0, _gfycat_sdk2.default)(GfycatApiKey, GfycatApiSecret).getCategories(options).then(function (json) {
            var newGfycats = json.tags.reduce(function (gfycats, tag) {
                if (tag.gfycats[0] && tag.gfycats[0].width) {
                    return [].concat(_toConsumableArray(gfycats), _toConsumableArray(tag.gfycats));
                }
                return gfycats;
            }, []);
            dispatch(cacheGifsRequest(newGfycats));
            dispatch(categoriesListReceived(json));
        }).catch(function (err) {
            dispatch(categoriesListFailure(err));
        });
    };
}

function requestCategoriesListIfNeeded() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        count = _ref6.count;

    return function (dispatch, getState) {
        var state = getState().entities.gifs.categories;
        if (state.tagsList && state.tagsList.length) {
            return Promise.resolve();
        }
        return dispatch(requestCategoriesList({ count: count }));
    };
}

function shouldRequestCategoriesList(state) {
    var hasMore = state.hasMore,
        isFetching = state.isFetching,
        tagsList = state.tagsList;

    if (!tagsList || !tagsList.length) {
        return true;
    } else if (isFetching) {
        return false;
    } else if (hasMore) {
        return true;
    }
    return false;
}

// CACHE

function cacheRequest() {
    return {
        type: _action_types.GifTypes.CACHE_REQUEST,
        payload: {
            updating: true
        }
    };
}

function cacheGifs(gifs) {
    return {
        type: _action_types.GifTypes.CACHE_GIFS,
        gifs: gifs
    };
}

function cacheGifsRequest(gifs) {
    return function (dispatch) {
        dispatch(cacheRequest());
        dispatch(cacheGifs(gifs));
    };
}