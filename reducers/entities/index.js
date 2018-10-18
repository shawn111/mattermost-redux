'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _channels = require('./channels');

var _channels2 = _interopRequireDefault(_channels);

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _teams = require('./teams');

var _teams2 = _interopRequireDefault(_teams);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

var _files = require('./files');

var _files2 = _interopRequireDefault(_files);

var _preferences = require('./preferences');

var _preferences2 = _interopRequireDefault(_preferences);

var _typing = require('./typing');

var _typing2 = _interopRequireDefault(_typing);

var _integrations = require('./integrations');

var _integrations2 = _interopRequireDefault(_integrations);

var _emojis = require('./emojis');

var _emojis2 = _interopRequireDefault(_emojis);

var _gifs = require('./gifs');

var _gifs2 = _interopRequireDefault(_gifs);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _alerts = require('./alerts');

var _alerts2 = _interopRequireDefault(_alerts);

var _jobs = require('./jobs');

var _jobs2 = _interopRequireDefault(_jobs);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _roles = require('./roles');

var _roles2 = _interopRequireDefault(_roles);

var _schemes = require('./schemes');

var _schemes2 = _interopRequireDefault(_schemes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = (0, _redux.combineReducers)({
    general: _general2.default,
    users: _users2.default,
    teams: _teams2.default,
    channels: _channels2.default,
    posts: _posts2.default,
    files: _files2.default,
    preferences: _preferences2.default,
    typing: _typing2.default,
    integrations: _integrations2.default,
    emojis: _emojis2.default,
    gifs: _gifs2.default,
    admin: _admin2.default,
    alerts: _alerts2.default,
    jobs: _jobs2.default,
    search: _search2.default,
    roles: _roles2.default,
    schemes: _schemes2.default
});