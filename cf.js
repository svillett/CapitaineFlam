/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, define, cf, $, window */

require.config({
    paths: {
        "text" : "thirdparty/text"
    }
});

define(function (require, exports, module) {
    "use strict";

    var view      = require("javascript/view"),
        validator = require("javascript/validator");

    function _initCf() {
        var Fn = Function, global = (new Fn('return this'))();
        if (!global.cf) {
            global.cf = {};
        }

        cf.platform   = (global.navigator.platform === "MacIntel" || global.navigator.platform === "MacPPC") ? "mac" : "win";
        cf.libRequire = global.require;
        cf.getModule  = require;
    }

    function _onReady() {
        console.log("Capitaine Flam is ready !")
    }

    _initCf();

    $(window.document).ready(_onReady);
});
