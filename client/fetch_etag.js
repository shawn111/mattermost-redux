'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

var data = {};
var etags = {};

exports.default = function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { headers: {} };

    url = url || options.url; // eslint-disable-line no-param-reassign

    if (options.method === 'GET' || !options.method) {
        var etag = etags[url];
        var cachedResponse = data['' + url + etag]; // ensure etag is for url
        if (etag) {
            options.headers['If-None-Match'] = etag;
        }

        return fetch(url, options).then(function (response) {
            if (response.status === 304) {
                return cachedResponse.clone();
            }

            if (response.status === 200) {
                var responseEtag = response.headers.get('Etag');

                if (responseEtag) {
                    data['' + url + responseEtag] = response.clone();
                    etags[url] = responseEtag;
                }
            }

            return response;
        });
    }

    // all other requests go straight to fetch
    return Reflect.apply(fetch, undefined, [url, options]); //eslint-disable-line no-undefined
};