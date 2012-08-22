
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

define(function (require, exports, module) {
    'use strict';

    function _initView() {
        var $inputDate = $("#inputDate");

        var now = new Date();
        var month = now.getMonth() + 1;
        var today = now.getDate() + '/' + month + '/' + now.getFullYear();

        $inputDate.attr("data-date", today);
        $inputDate.attr("value", today);

        $inputDate.datepicker({
            format: "d/m/yyyy"
        });

        $('#gamme a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }

    _initView();

});
