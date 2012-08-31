/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

/* FIXME : Datepicker language is only english */
define(function (require, exports, module) {
    "use strict";

    require("thirdparty/moment.min");

    function _initDatepicker() {
        var $datePickable = $(".date-pickable");

        $datePickable.each(function (index, element) {
            var now   = moment(new Date()),
                today = now.format("YYYY/MM/DD");

            $(element).attr("data-date", today);
            $(element).val(today);
            $(element).datepicker({
                format: "yyyy/mm/dd"
            });
        });
    }

    _initDatepicker();

});
