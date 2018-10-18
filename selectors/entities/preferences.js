'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTheme = exports.getTeammateNameDisplaySetting = exports.getVisibleGroupIds = exports.getVisibleTeammate = undefined;
exports.getMyPreferences = getMyPreferences;
exports.get = get;
exports.getBool = getBool;
exports.getInt = getInt;
exports.makeGetCategory = makeGetCategory;
exports.getDirectShowPreferences = getDirectShowPreferences;
exports.getGroupShowPreferences = getGroupShowPreferences;
exports.getFavoritesPreferences = getFavoritesPreferences;
exports.makeGetStyleFromTheme = makeGetStyleFromTheme;

var _reselect = require('reselect');

var _constants = require('../../constants');

var _general = require('./general');

var _teams = require('./teams');

var _helpers = require('../../utils/helpers');

var _preference_utils = require('../../utils/preference_utils');

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function getMyPreferences(state) {
    return state.entities.preferences.myPreferences;
}

function get(state, category, name) {
    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var key = (0, _preference_utils.getPreferenceKey)(category, name);
    var prefs = getMyPreferences(state);

    if (!(key in prefs)) {
        return defaultValue;
    }

    return prefs[key].value;
}

function getBool(state, category, name) {
    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var value = get(state, category, name, String(defaultValue));

    return value !== 'false';
}

function getInt(state, category, name) {
    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var value = get(state, category, name, defaultValue);

    return parseInt(value, 10);
}

function makeGetCategory() {
    return (0, _reselect.createSelector)(getMyPreferences, function (state, category) {
        return category;
    }, function (preferences, category) {
        var prefix = category + '--';
        var prefsInCategory = [];

        for (var key in preferences) {
            if (key.startsWith(prefix)) {
                prefsInCategory.push(preferences[key]);
            }
        }

        return prefsInCategory;
    });
}

var getDirectShowCategory = makeGetCategory();

function getDirectShowPreferences(state) {
    return getDirectShowCategory(state, _constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW);
}

var getGroupShowCategory = makeGetCategory();

function getGroupShowPreferences(state) {
    return getGroupShowCategory(state, _constants.Preferences.CATEGORY_GROUP_CHANNEL_SHOW);
}

var getFavoritesCategory = makeGetCategory();

function getFavoritesPreferences(state) {
    var favorites = getFavoritesCategory(state, _constants.Preferences.CATEGORY_FAVORITE_CHANNEL);
    return favorites.filter(function (f) {
        return f.value === 'true';
    }).map(function (f) {
        return f.name;
    });
}

var getVisibleTeammate = exports.getVisibleTeammate = (0, _reselect.createSelector)(getDirectShowPreferences, function (direct) {
    return direct.filter(function (dm) {
        return dm.value === 'true' && dm.name;
    }).map(function (dm) {
        return dm.name;
    });
});

var getVisibleGroupIds = exports.getVisibleGroupIds = (0, _reselect.createSelector)(getGroupShowPreferences, function (groups) {
    return groups.filter(function (dm) {
        return dm.value === 'true' && dm.name;
    }).map(function (dm) {
        return dm.name;
    });
});

var getTeammateNameDisplaySetting = exports.getTeammateNameDisplaySetting = (0, _reselect.createSelector)(_general.getConfig, getMyPreferences, function (config, preferences) {
    var key = (0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_DISPLAY_SETTINGS, _constants.Preferences.NAME_NAME_FORMAT);
    if (preferences[key]) {
        return preferences[key].value;
    } else if (config.TeammateNameDisplay) {
        return config.TeammateNameDisplay;
    }
    return _constants.General.TEAMMATE_NAME_DISPLAY.SHOW_USERNAME;
});

var getThemePreference = (0, _reselect.createSelector)(getMyPreferences, _teams.getCurrentTeamId, function (myPreferences, currentTeamId) {
    // Prefer the user's current team-specific theme over the user's current global theme
    var themePreference = void 0;

    if (currentTeamId) {
        themePreference = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_THEME, currentTeamId)];
    }

    if (!themePreference) {
        themePreference = myPreferences[(0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_THEME, '')];
    }

    return themePreference;
});

var getDefaultTheme = (0, _reselect.createSelector)(_general.getConfig, function (config) {
    if (config.DefaultTheme) {
        var theme = _constants.Preferences.THEMES[config.DefaultTheme];
        if (theme) {
            return theme;
        }
    }

    // If no config.DefaultTheme or value doesn't refer to a valid theme name...
    return _constants.Preferences.THEMES.default;
});

var getTheme = exports.getTheme = (0, _helpers.createShallowSelector)(getThemePreference, getDefaultTheme, function (themePreference, defaultTheme) {
    var theme = void 0;
    if (themePreference) {
        theme = themePreference.value;
    } else {
        theme = defaultTheme;
    }

    if (typeof theme === 'string') {
        // A custom theme will be a JSON-serialized object stored in a preference
        theme = JSON.parse(theme);
    }

    // At this point, the theme should be a plain object

    // If this is a system theme, find it in case the user's theme is missing any fields
    if (theme.type && theme.type !== 'custom') {
        var match = Object.values(_constants.Preferences.THEMES).find(function (v) {
            return v.type === theme.type;
        });
        if (match) {
            if (!match.mentionBg) {
                match.mentionBg = match.mentionBj;
            }

            return match;
        }
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(defaultTheme)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (theme[key]) {
                // Fix a case where upper case theme colours are rendered as black
                theme[key] = theme[key].toLowerCase();
            }
        }

        // Backwards compatability with old name
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

    if (!theme.mentionBg) {
        theme.mentionBg = theme.mentionBj;
    }

    return Object.assign({}, defaultTheme, theme);
});

function makeGetStyleFromTheme() {
    return (0, _reselect.createSelector)(getTheme, function (state, getStyleFromTheme) {
        return getStyleFromTheme;
    }, function (theme, getStyleFromTheme) {
        return getStyleFromTheme(theme);
    });
}