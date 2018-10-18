'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeStyleFromTheme = makeStyleFromTheme;
exports.getComponents = getComponents;
exports.changeOpacity = changeOpacity;
exports.blendColors = blendColors;
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
function makeStyleFromTheme(getStyleFromTheme) {
    var lastTheme = null;
    var style = null;

    return function (theme) {
        if (!style || theme !== lastTheme) {
            style = getStyleFromTheme(theme);
            lastTheme = theme;
        }

        return style;
    };
}

var rgbPattern = /^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/;

function getComponents(inColor) {
    var color = inColor;

    // RGB color
    var match = rgbPattern.exec(color);
    if (match) {
        return {
            red: parseInt(match[1], 10),
            green: parseInt(match[2], 10),
            blue: parseInt(match[3], 10),
            alpha: match[4] ? parseFloat(match[4]) : 1
        };
    }

    // Hex color
    if (color[0] === '#') {
        color = color.slice(1);
    }

    if (color.length === 3) {
        var tempColor = color;
        color = '';

        color += tempColor[0] + tempColor[0];
        color += tempColor[1] + tempColor[1];
        color += tempColor[2] + tempColor[2];
    }

    return {
        red: parseInt(color.substring(0, 2), 16),
        green: parseInt(color.substring(2, 4), 16),
        blue: parseInt(color.substring(4, 6), 16),
        alpha: 1
    };
}

function changeOpacity(oldColor, opacity) {
    var _getComponents = getComponents(oldColor),
        red = _getComponents.red,
        green = _getComponents.green,
        blue = _getComponents.blue,
        alpha = _getComponents.alpha;

    return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha * opacity + ')';
}

function blendComponent(background, foreground, opacity) {
    return (1 - opacity) * background + opacity * foreground;
}

function blendColors(background, foreground, opacity) {
    var backgroundComponents = getComponents(background);
    var foregroundComponents = getComponents(foreground);

    var red = Math.floor(blendComponent(backgroundComponents.red, foregroundComponents.red, opacity));
    var green = Math.floor(blendComponent(backgroundComponents.green, foregroundComponents.green, opacity));
    var blue = Math.floor(blendComponent(backgroundComponents.blue, foregroundComponents.blue, opacity));
    var alpha = blendComponent(backgroundComponents.alpha, foregroundComponents.alpha, opacity);

    return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
}