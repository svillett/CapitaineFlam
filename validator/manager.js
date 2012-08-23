
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

define(function (require, exports, module) {
    'use strict';

    function _initValidator() {
        $("#generateButton").on("click", function (event) {
            var required_fields = $(".required");
            required_fields.toggleClass("error");
        });
    }

    _initValidator();

});
