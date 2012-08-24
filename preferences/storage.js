/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

define(function (require, exports, module) {
    'use strict';

    var Manager = require("preferences/manager");

    function _validateJSONPair(key, value) {
        if (typeof key === "string") {
            var temp = {}, error = null;
            temp[key] = value;

            try {
                temp = JSON.parse(JSON.stringify(temp));
            } catch (err) {
                error = err;
            }

            if (!error && (temp[key] !== undefined)) {
                return true;
            } else {
                throw new Error("Value '" + value + "' for key '" + key + "' must be a valid JSON value");
            }
        } else {
            throw new Error("Preference key '" + key + "' must be a string");
        }
    }

    function _commit() {
        Manager.savePreferences();
    }

    function Storage(clientID, json) {
        this._clientID = clientID;
        this._json = json;
    }

    Storage.prototype.getClientID = function () {
        return this._clientID;
    };

    Storage.prototype.remove = function (key) {
        delete this._json[key];
        _commit();
    };

    Storage.prototype.setValue = function (key, value) {
        if (_validateJSONPair(key, value)) {
            this._json[key] = value;
            _commit();
        }
    };

    Storage.prototype.getValue = function (key) {
        return this._json[key];
    };

    Storage.prototype.getAllValues = function () {
        return JSON.parse(JSON.stringify(this._json));
    };

    Storage.prototype.setAllValues = function (obj, append) {
        var self = this, error = null;

        $.each(obj, function (key, value) {
            try {
                _validateJSONPair(key, value);
            } catch (err) {
                error = err;
                return false;
            }
        });

        if (error) {
            throw error;
        }

        if (!append) {
            $.each(this._json, function (key, value) {
                delete self._json[key];
            });
        }

        $.each(obj, function (key, value) {
            self._json[key] = value;
        });

        _commit();
    };

    exports.Storage = Storage;
});
