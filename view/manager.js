
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, Option */

define(function (require, exports, module) {
    'use strict';

    var CodeNAFs = JSON.parse(require("text!data/codeNAFs.json"));
    var OffresTelFixeCentrex = JSON.parse(require("text!data/offresTelFixeCentrex.json"));

    function _initView() {

        /* Date */
        var $inputDate = $("#inputDate");

        var now = new Date(),
            month = now.getMonth() + 1,
            today = now.getDate() + '/' + month + '/' + now.getFullYear();

        $inputDate.attr("data-date", today);
        $inputDate.attr("value", today);
        $inputDate.datepicker({
            format: "d/m/yyyy"
        });


        /* Gamme proposée au client */
        $('#navGammes a').click(function (event) {
            event.preventDefault();
            $(this).tab('show');
        });


        /* Nature */
        $("#optionsRadiosNature1").on("click", function (event) {
            $("#rowNature").addClass("hidden");
        });

        $("#optionsRadiosNature2").on("click", function (event) {
            $("#rowNature").removeClass("hidden");
        });

        /* Code NAF */
        var $inputCodeNAF = $("#inputCodeNAF"),
            $inputCodeNAFDesc = $("#inputCodeNAFDesc");

        $.each(CodeNAFs, function (code, desc) {
            $inputCodeNAF.append(new Option(code, code));
        });

        $inputCodeNAFDesc.text(CodeNAFs[$inputCodeNAF.val()]);

        $inputCodeNAF.on("change", function (event) {
            $inputCodeNAFDesc.text(CodeNAFs[event.target.value]);
        });

        /* offresTelFixeCentrex */
        var $inputOffresTelFixeCentrex = $("#inputOffresTelFixeCentrex"), 
            $inputOffresTelFixeCentrexEngagement = $("#inputOffresTelFixeCentrexEngagement");

        $.each(OffresTelFixeCentrex, function (key, value) {
            $inputOffresTelFixeCentrex.append(new Option(key, key));
        });

        //FIXME
        // $inputOffresTelFixeCentrexEngagement.text(OffresTelFixeCentrex[$inputOffresTelFixeCentrex.val()]);

        //FIXME
        // $inputOffresTelFixeCentrex.on("change", function (event) {
            // $inputOffresTelFixeCentrexEngagement.text(OffresTelFixeCentrex[event.target.value]);
        // });
    }

    _initView();

});
