
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $ */

define(function (require, exports, module) {
    'use strict';

    function _initView() {
        $('#gamme a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }

    _initView();

});
