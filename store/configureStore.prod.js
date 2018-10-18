'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureOfflineServiceStore;

var _redux = require('redux');

var _reduxOffline = require('redux-offline');

var _defaults = require('redux-offline/lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _reducer_registry = require('./reducer_registry');

var _reducer_registry2 = _interopRequireDefault(_reducer_registry);

var _client = require('../client');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _helpers = require('./helpers');

var _initial_state = require('./initial_state');

var _initial_state2 = _interopRequireDefault(_initial_state);

var _middleware = require('./middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configures and constructs the redux store. Accepts the following parameters:
 * preloadedState - Any preloaded state to be applied to the store after it is initially configured.
 * appReducer - An object containing any app-specific reducer functions that the client needs.
 * userOfflineConfig - Any additional configuration data to be passed into redux-offline aside from the default values.
 * getAppReducer - A function that returns the appReducer as defined above. Only used in development to enable hot reloading.
 * clientOptions - An object containing additional options used when configuring the redux store. The following options are available:
 *     additionalMiddleware - func | array - Allows for single or multiple additional middleware functions to be passed in from the client side.
 *     enableBuffer - bool - default = true - If true, the store will buffer all actions until offline state rehydration occurs.
 *     enableThunk - bool - default = true - If true, include the thunk middleware automatically. If false, thunk must be provided as part of additionalMiddleware.
 */
function configureOfflineServiceStore(preloadedState, appReducer, userOfflineConfig, getAppReducer) {
    var clientOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var baseState = Object.assign({}, _initial_state2.default, preloadedState);

    var baseOfflineConfig = Object.assign({}, _defaults2.default, _helpers.offlineConfig, userOfflineConfig);

    var store = (0, _redux.createStore)((0, _reduxOffline.createOfflineReducer)((0, _helpers.createReducer)(baseState, _reducers2.default, appReducer)), baseState, (0, _reduxOffline.offlineCompose)(baseOfflineConfig)((0, _middleware.createMiddleware)(clientOptions), []));

    _reducer_registry2.default.setChangeListener(function (reducers) {
        store.replaceReducer((0, _reduxOffline.createOfflineReducer)((0, _helpers.createReducer)(baseState, reducers)));
    });

    // launch store persistor
    if (baseOfflineConfig.persist) {
        baseOfflineConfig.persist(store, baseOfflineConfig.persistOptions, baseOfflineConfig.persistCallback);
    }

    if (baseOfflineConfig.detectNetwork) {
        baseOfflineConfig.detectNetwork(function (online) {
            _client.Client4.setOnline(online);
            store.dispatch((0, _reduxOffline.networkStatusChangedAction)(online));
        });
    }

    return store;
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.