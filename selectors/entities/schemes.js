'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


exports.getSchemes = getSchemes;
exports.getScheme = getScheme;
exports.makeGetSchemeChannels = makeGetSchemeChannels;
exports.makeGetSchemeTeams = makeGetSchemeTeams;

var _reselect = require('reselect');

var _channels = require('./channels');

var _teams = require('./teams');

var _schemes = require('../../constants/schemes');

function getSchemes(state) {
    return state.entities.schemes.schemes;
}

function getScheme(state, id) {
    var schemes = getSchemes(state);
    return schemes[id];
}

function makeGetSchemeChannels() {
    return (0, _reselect.createSelector)(_channels.getAllChannels, function (state, props) {
        return getScheme(state, props.schemeId);
    }, function (allChannels, scheme) {
        if (!scheme) {
            return [];
        }

        if (scheme.scope === _schemes.ScopeTypes.TEAM) {
            var msg = 'Not implemented: scheme \'' + scheme.id + '\' is team-scope but \'getSchemeChannels\' only accepts channel-scoped schemes.';
            console.warn(msg); // eslint-disable-line no-console
            return [];
        }

        var schemeChannels = [];

        // $FlowFixMe
        Object.entries(allChannels).forEach(function (item) {
            var _item = _slicedToArray(item, 2),
                channel = _item[1];

            if (channel.scheme_id === scheme.id) {
                schemeChannels.push(channel);
            }
        });

        return schemeChannels;
    });
}

function makeGetSchemeTeams() {
    return (0, _reselect.createSelector)(_teams.getTeams, function (state, props) {
        return getScheme(state, props.schemeId);
    }, function (allTeams, scheme) {
        if (!scheme) {
            return [];
        }

        if (scheme.scope === _schemes.ScopeTypes.CHANNEL) {
            var msg = 'Error: scheme \'' + scheme.id + '\' is channel-scoped but \'getSchemeChannels\' only accepts team-scoped schemes.';
            console.warn(msg); // eslint-disable-line no-console
            return [];
        }

        var schemeTeams = [];

        // $FlowFixMe
        Object.entries(allTeams).forEach(function (item) {
            var _item2 = _slicedToArray(item, 2),
                team = _item2[1];

            if (team.scheme_id === scheme.id) {
                schemeTeams.push(team);
            }
        });

        return schemeTeams;
    });
}