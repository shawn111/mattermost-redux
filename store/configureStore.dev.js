'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureServiceStore;

var _redux = require('redux');

var _remoteReduxDevtools = require('remote-redux-devtools');

var _remoteReduxDevtools2 = _interopRequireDefault(_remoteReduxDevtools);

var _reduxOffline = require('redux-offline');

var _defaults = require('redux-offline/lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _reducer_registry = require('./reducer_registry');

var _reducer_registry2 = _interopRequireDefault(_reducer_registry);

var _client = require('../client');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _deep_freeze = require('../utils/deep_freeze');

var _deep_freeze2 = _interopRequireDefault(_deep_freeze);

var _initial_state = require('./initial_state');

var _initial_state2 = _interopRequireDefault(_initial_state);

var _helpers = require('./helpers');

var _middleware = require('./middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable no-undefined */

var devToolsEnhancer = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? // eslint-disable-line no-underscore-dangle
window.__REDUX_DEVTOOLS_EXTENSION__ : // eslint-disable-line no-underscore-dangle
function () {
    return (0, _remoteReduxDevtools2.default)({
        name: 'Mattermost',
        hostname: 'localhost',
        port: 5678,
        realtime: true
    });
};

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
function configureServiceStore(preloadedState, appReducer, userOfflineConfig, getAppReducer, clientOptions) {
    var baseOfflineConfig = Object.assign({}, _defaults2.default, _helpers.offlineConfig, userOfflineConfig);
    var baseState = Object.assign({}, _initial_state2.default, preloadedState);

    var loadReduxDevtools = process.env.NODE_ENV !== 'test'; //eslint-disable-line no-process-env

    var store = (0, _redux.createStore)((0, _reduxOffline.createOfflineReducer)(createDevReducer(baseState, _reducers2.default, appReducer)), baseState,
    // eslint-disable-line - offlineCompose(config)(middleware, other funcs)
    (0, _reduxOffline.offlineCompose)(baseOfflineConfig)((0, _middleware.createMiddleware)(clientOptions), loadReduxDevtools ? [devToolsEnhancer()] : []));

    _reducer_registry2.default.setChangeListener(function (reducers) {
        store.replaceReducer((0, _reduxOffline.createOfflineReducer)(createDevReducer(baseState, reducers)));
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

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(function () {
            var nextServiceReducer = require('../reducers').default; // eslint-disable-line global-require
            var nextAppReducer = void 0;
            if (getAppReducer) {
                nextAppReducer = getAppReducer(); // eslint-disable-line global-require
            }
            store.replaceReducer(createDevReducer(baseState, _reducer_registry2.default.getReducers(), nextServiceReducer, nextAppReducer));
        });
    }

    return store;
}

function createDevReducer(baseState) {
    for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        reducers[_key - 1] = arguments[_key];
    }

    return enableFreezing(_helpers.createReducer.apply(undefined, [baseState].concat(reducers)));
}

function enableFreezing(reducer) {
    return function (state, action) {
        var nextState = reducer(state, action);

        if (nextState !== state) {
            (0, _deep_freeze2.default)(nextState);
        }

        return nextState;
    };
}