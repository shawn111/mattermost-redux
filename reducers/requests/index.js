'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _channels = require('./channels');

var _channels2 = _interopRequireDefault(_channels);

var _files = require('./files');

var _files2 = _interopRequireDefault(_files);

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

var _teams = require('./teams');

var _teams2 = _interopRequireDefault(_teams);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _preferences = require('./preferences');

var _preferences2 = _interopRequireDefault(_preferences);

var _integrations = require('./integrations');

var _integrations2 = _interopRequireDefault(_integrations);

var _emojis = require('./emojis');

var _emojis2 = _interopRequireDefault(_emojis);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _jobs = require('./jobs');

var _jobs2 = _interopRequireDefault(_jobs);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _roles = require('./roles');

var _roles2 = _interopRequireDefault(_roles);

var _schemes = require('./schemes');

var _schemes2 = _interopRequireDefault(_schemes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    channels: _channels2.default,
    files: _files2.default,
    general: _general2.default,
    posts: _posts2.default,
    teams: _teams2.default,
    users: _users2.default,
    preferences: _preferences2.default,
    integrations: _integrations2.default,
    emojis: _emojis2.default,
    admin: _admin2.default,
    jobs: _jobs2.default,
    search: _search2.default,
    roles: _roles2.default,
    schemes: _schemes2.default
}); // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.