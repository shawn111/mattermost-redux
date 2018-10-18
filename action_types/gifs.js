'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _key_mirror = require('../utils/key_mirror');

var _key_mirror2 = _interopRequireDefault(_key_mirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _key_mirror2.default)({

    // General.

    SAVE_APP_PROPS: null,

    // Search.

    SEARCH_REQUEST: null,
    SEARCH_FAILURE: null,
    SEARCH_SUCCESS: null,

    SEARCH_BY_ID_REQUEST: null,
    SEARCH_BY_ID_FAILURE: null,
    SEARCH_BY_ID_SUCCESS: null,

    SELECT_SEARCH_TEXT: null,
    INVALIDATE_SEARCH_TEXT: null,

    REQUEST_SEARCH: null,
    RECEIVE_SEARCH: null,
    RECEIVE_SEARCH_END: null,

    RECEIVE_CATEGORY_SEARCH: null,

    CLEAR_SEARCH_RESULTS: null,

    SAVE_SEARCH_SCROLL_POSITION: null,
    SAVE_SEARCH_PRIOR_LOCATION: null,

    UPDATE_SEARCH_TEXT: null,
    SAVE_SEARCH_BAR_TEXT: null,

    // Categories.

    REQUEST_CATEGORIES_LIST: null,
    CATEGORIES_LIST_RECEIVED: null,
    CATEGORIES_LIST_FAILURE: null,

    // Cache.

    CACHE_GIFS: null,
    CACHE_REQUEST: null
}); // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.