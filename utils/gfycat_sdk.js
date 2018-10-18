'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (key, secret) {
    if (instance && activeKey === key && activeSecret === secret) {
        return instance;
    }

    if (!key || !secret) {
        instance = new _gfycatSdk2.default({ client_id: defaultKey, client_secret: defaultSecret });
        return instance;
    }

    activeKey = key;
    activeSecret = secret;
    instance = new _gfycatSdk2.default({ client_id: key, client_secret: secret });
    return instance;
};

var _gfycatSdk = require('gfycat-sdk');

var _gfycatSdk2 = _interopRequireDefault(_gfycatSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultKey = '2_KtH_W5'; // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var defaultSecret = '3wLVZPiswc3DnaiaFoLkDvB4X0IV6CpMkj4tf2inJRsBY6-FnkT08zGmppWFgeof';

var activeKey = null;
var activeSecret = null;
var instance = null;