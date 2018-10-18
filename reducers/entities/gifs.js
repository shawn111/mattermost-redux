'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SEARCH_SELECTORS, _CATEGORIES_SELECTORS, _TERM_SELECTOR, _PAGE_SELECTOR, _CACHE_SELECTORS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var _redux = require('redux');

var _action_types = require('../../action_types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SEARCH_SELECTORS = (_SEARCH_SELECTORS = {}, _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.SELECT_SEARCH_TEXT, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.INVALIDATE_SEARCH_TEXT, function (state, action) {
    return _extends({}, state, {
        resultsByTerm: _extends({}, state.resultsByTerm[action.searchText], {
            didInvalidate: true
        })
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.REQUEST_SEARCH, function (state, action) {
    return _extends({}, state, {
        resultsByTerm: TERM_SELECTOR[action.type](state.resultsByTerm, action)
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.RECEIVE_SEARCH, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText,
        resultsByTerm: TERM_SELECTOR[action.type](state.resultsByTerm, action)
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.RECEIVE_SEARCH_END, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText,
        resultsByTerm: TERM_SELECTOR[action.type](state.resultsByTerm, action)
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.RECEIVE_CATEGORY_SEARCH, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText,
        resultsByTerm: TERM_SELECTOR[action.type](state.resultsByTerm, action)
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.SEARCH_FAILURE, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText,
        resultsByTerm: TERM_SELECTOR[action.type](state.resultsByTerm, action)
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.CLEAR_SEARCH_RESULTS, function (state) {
    return _extends({}, state, {
        searchText: '',
        resultsByTerm: {}
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.SAVE_SEARCH_SCROLL_POSITION, function (state, action) {
    return _extends({}, state, {
        scrollPosition: action.scrollPosition
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.SAVE_SEARCH_PRIOR_LOCATION, function (state, action) {
    return _extends({}, state, {
        priorLocation: action.priorLocation
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.UPDATE_SEARCH_TEXT, function (state, action) {
    return _extends({}, state, {
        searchText: action.searchText
    });
}), _defineProperty(_SEARCH_SELECTORS, _action_types.GifTypes.SAVE_SEARCH_BAR_TEXT, function (state, action) {
    return _extends({}, state, {
        searchBarText: action.searchBarText
    });
}), _SEARCH_SELECTORS);

var CATEGORIES_SELECTORS = (_CATEGORIES_SELECTORS = {}, _defineProperty(_CATEGORIES_SELECTORS, _action_types.GifTypes.REQUEST_CATEGORIES_LIST, function (state) {
    return _extends({}, state, {
        isFetching: true
    });
}), _defineProperty(_CATEGORIES_SELECTORS, _action_types.GifTypes.CATEGORIES_LIST_RECEIVED, function (state, action) {
    var cursor = action.cursor,
        tags = action.tags;
    var _state$tagsList = state.tagsList,
        oldTagsList = _state$tagsList === undefined ? [] : _state$tagsList;

    var tagsDict = {};
    var newTagsList = tags.filter(function (item) {
        return Boolean(item && item.gfycats[0] && item.gfycats[0].width);
    }).map(function (item) {
        tagsDict[item.tag] = true;
        return {
            tagName: item.tag,
            gfyId: item.gfycats[0].gfyId
        };
    });
    var tagsList = [].concat(_toConsumableArray(oldTagsList), _toConsumableArray(newTagsList));
    return _extends({}, state, {
        cursor: cursor,
        hasMore: Boolean(cursor),
        isFetching: false,
        tagsList: tagsList,
        tagsDict: tagsDict
    });
}), _defineProperty(_CATEGORIES_SELECTORS, _action_types.GifTypes.CATEGORIES_LIST_FAILURE, function (state) {
    return _extends({}, state, {
        isFetching: false
    });
}), _CATEGORIES_SELECTORS);

var TERM_SELECTOR = (_TERM_SELECTOR = {}, _defineProperty(_TERM_SELECTOR, _action_types.GifTypes.REQUEST_SEARCH, function (state, action) {
    return _extends({}, state, _defineProperty({}, action.searchText, _extends({}, state[action.searchText], {
        isFetching: true,
        didInvalidate: false,
        pages: PAGE_SELECTOR[action.type](state[action.searchText], action)
    })));
}), _defineProperty(_TERM_SELECTOR, _action_types.GifTypes.RECEIVE_SEARCH, function (state, action) {
    var gfycats = action.gfycats.filter(function (item) {
        return Boolean(item.gfyId && item.width && item.height);
    });
    var newItems = gfycats.map(function (gfycat) {
        return gfycat.gfyId;
    });
    return _extends({}, state, _defineProperty({}, action.searchText, _extends({}, state[action.searchText], {
        isFetching: false,
        items: typeof state[action.searchText] !== 'undefined' && state[action.searchText].items ? [].concat(_toConsumableArray(state[action.searchText].items), _toConsumableArray(newItems)) : newItems,
        moreRemaining: typeof state[action.searchText] !== 'undefined' && state[action.searchText].items ? [].concat(_toConsumableArray(state[action.searchText].items), _toConsumableArray(action.gfycats)).length < action.found : action.gfycats.length < action.found,
        count: action.count,
        found: action.found,
        start: action.start,
        currentPage: action.currentPage,
        pages: PAGE_SELECTOR[action.type](state[action.searchText], action),
        cursor: action.cursor
    })));
}), _defineProperty(_TERM_SELECTOR, _action_types.GifTypes.RECEIVE_CATEGORY_SEARCH, function (state, action) {
    var gfycats = action.gfycats.filter(function (item) {
        return Boolean(item.gfyId && item.width && item.height);
    });
    var newItems = gfycats.map(function (gfycat) {
        return gfycat.gfyId;
    });
    return _extends({}, state, _defineProperty({}, action.searchText, _extends({}, state[action.searchText], {
        isFetching: false,
        items: typeof state[action.searchText] !== 'undefined' && state[action.searchText].items ? [].concat(_toConsumableArray(state[action.searchText].items), _toConsumableArray(newItems)) : newItems,
        cursor: action.cursor,
        moreRemaining: Boolean(action.cursor)
    })));
}), _defineProperty(_TERM_SELECTOR, _action_types.GifTypes.RECEIVE_SEARCH_END, function (state, action) {
    return _extends({}, state, _defineProperty({}, action.searchText, _extends({}, state[action.searchText], {
        isFetching: false,
        moreRemaining: false
    })));
}), _defineProperty(_TERM_SELECTOR, _action_types.GifTypes.SEARCH_FAILURE, function (state, action) {
    return _extends({}, state, _defineProperty({}, action.searchText, _extends({}, state[action.searchText], {
        isFetching: false,
        items: [],
        moreRemaining: false,
        count: 0,
        found: 0,
        start: 0,
        isEmpty: true
    })));
}), _TERM_SELECTOR);

var PAGE_SELECTOR = (_PAGE_SELECTOR = {}, _defineProperty(_PAGE_SELECTOR, _action_types.GifTypes.REQUEST_SEARCH, function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof state.pages == 'undefined') {
        return {};
    }
    return _extends({}, state.pages);
}), _defineProperty(_PAGE_SELECTOR, _action_types.GifTypes.RECEIVE_SEARCH, function (state, action) {
    return _extends({}, state.pages, _defineProperty({}, action.currentPage, action.gfycats.map(function (gfycat) {
        return gfycat.gfyId;
    })));
}), _PAGE_SELECTOR);

var CACHE_SELECTORS = (_CACHE_SELECTORS = {}, _defineProperty(_CACHE_SELECTORS, _action_types.GifTypes.CACHE_GIFS, function (state, action) {
    return _extends({}, state, {
        gifs: CACHE_GIF_SELECTOR[action.type](state.gifs, action),
        updating: false
    });
}), _defineProperty(_CACHE_SELECTORS, _action_types.GifTypes.CACHE_REQUEST, function (state, action) {
    return _extends({}, state, action.payload);
}), _CACHE_SELECTORS);

var CACHE_GIF_SELECTOR = _defineProperty({}, _action_types.GifTypes.CACHE_GIFS, function (state, action) {
    return _extends({}, state, action.gifs.reduce(function (map, obj) {
        map[obj.gfyId] = obj;
        return map;
    }, {}));
});

function appReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var nextState = _extends({}, state);
    switch (action.type) {
        case _action_types.GifTypes.SAVE_APP_PROPS:
            return _extends({}, nextState, action.props);
        default:
            return state;
    }
}

function categoriesReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var selector = CATEGORIES_SELECTORS[action.type];
    return selector ? selector(state, action) : state;
}

function searchReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var selector = SEARCH_SELECTORS[action.type];
    return selector ? selector(state, action) : state;
}

function cacheReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var selector = CACHE_SELECTORS[action.type];
    return selector ? selector(state, action) : state;
}

exports.default = (0, _redux.combineReducers)({
    app: appReducer,
    categories: categoriesReducer,
    search: searchReducer,
    cache: cacheReducer
});