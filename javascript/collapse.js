/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

define(function (require, exports, module) {
    "use strict";

    var collapseLabels = [ "Masquer", "Afficher" ];

    function _initCollapse() {
        var $btnCollapse = $(".btn-collapse");

        $btnCollapse.each(function (index, btn) {
            $(btn).on("click", function (event) {
                if ($(btn).text() === collapseLabels[0]) {
                    $(btn).text(collapseLabels[1]);
                } else {
                    $(btn).text(collapseLabels[0]);
                }
            });
        });
    }

    _initCollapse();

});
