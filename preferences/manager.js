
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, localStorage */

define(function (require, exports, module) {
    'use strict';

    var Storage = require("preferences/storage").Storage;
    
    var PREFERENCES_KEY = "com.bouygtel.sie.cf.preferences";

    var preferencesKey,
        prefStorage,
        persistentStorage,
        doLoadPreferences   = false;

    function getStorage(clientID, defaults) {
        if ((clientID === undefined) || (clientID === null)) {
            throw new Error("Invalid clientID");
        }

        var prefs = prefStorage[clientID];

        if (prefs === undefined) {
            prefs = (defaults && JSON.stringify(defaults)) ? defaults : {};
            prefStorage[clientID] = prefs;
        }

        return new Storage(clientID, prefs);
    }

    function savePreferences() {
        persistentStorage.setItem(preferencesKey, JSON.stringify(prefStorage));
    }

    function _initStorage(storage) {
        persistentStorage = storage;

        if (doLoadPreferences) {
            prefStorage = JSON.parse(persistentStorage.getItem(preferencesKey));
        }

        if (!prefStorage) {
            prefStorage = {};
            persistentStorage.setItem(preferencesKey, JSON.stringify(prefStorage));
        }
    }

    preferencesKey = localStorage.getItem("preferencesKey");

    if (!preferencesKey) {
        preferencesKey = PREFERENCES_KEY;
        doLoadPreferences = true;
    } else {
        doLoadPreferences = !!(localStorage.getItem("doLoadPreferences"));
    }

    _initStorage(localStorage);

    exports.getStorage      = getStorage;
    exports.savePreferences = savePreferences;
});
