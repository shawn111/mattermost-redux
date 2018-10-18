"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLogs = getLogs;
exports.getAudits = getAudits;
exports.getConfig = getConfig;
exports.getEnvironmentConfig = getEnvironmentConfig;
exports.getComplianceReports = getComplianceReports;
exports.getClusterInfo = getClusterInfo;
exports.getUserAccessTokens = getUserAccessTokens;
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function getLogs(state) {
    return state.entities.admin.logs;
}

function getAudits(state) {
    return state.entities.admin.audits;
}

function getConfig(state) {
    return state.entities.admin.config;
}

function getEnvironmentConfig(state) {
    return state.entities.admin.environmentConfig;
}

function getComplianceReports(state) {
    return state.entities.admin.complianceReports;
}

function getClusterInfo(state) {
    return state.entities.admin.clusterInfo;
}

function getUserAccessTokens(state) {
    return state.entities.admin.userAccessTokens;
}