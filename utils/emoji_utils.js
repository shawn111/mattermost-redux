'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEmojiImageUrl = getEmojiImageUrl;
exports.parseNeededCustomEmojisFromText = parseNeededCustomEmojisFromText;

var _client = require('../client');

function getEmojiImageUrl(emoji) {
    if (emoji.id) {
        return _client.Client4.getEmojiRoute(emoji.id) + '/image';
    }

    var systemEmoji = emoji;

    var filename = systemEmoji.filename || systemEmoji.aliases[0];

    return _client.Client4.getSystemEmojiImageUrl(filename);
} // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.


function parseNeededCustomEmojisFromText(text, systemEmojis, customEmojisByName, nonExistentEmoji) {
    if (!text.includes(':')) {
        return new Set();
    }

    var pattern = /:([A-Za-z0-9_-]+):/gi;

    var customEmojis = new Set();

    var match = void 0;
    while ((match = pattern.exec(text)) !== null) {
        if (systemEmojis.has(match[1])) {
            // It's a system emoji, go the next match
            continue;
        }

        if (nonExistentEmoji.has(match[1])) {
            // We've previously confirmed this is not a custom emoji
            continue;
        }

        if (customEmojisByName.has(match[1])) {
            // We have the emoji, go to the next match
            continue;
        }

        customEmojis.add(match[1]);
    }

    return customEmojis;
}