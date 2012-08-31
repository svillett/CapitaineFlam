/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, Option */

define(function (require, exports, module) {
    "use strict";

    require("javascript/collapse");
    require("javascript/datepicker");
    require("javascript/tables");

    function _initNomAgence() {
        var $inputNomAgence = $("#inputNomAgence"),
            nomsAgence      = JSON.parse(require("text!data/nomsAgence.json"));

        $.each(nomsAgence, function (index, nom) {
            $inputNomAgence.append(new Option(nom, nom));
        });
    }

    function _initCodeNAF() {
        var $inputCodeNAF     = $("#inputCodeNAF"),
            $inputCodeNAFDesc = $("#inputCodeNAFDesc"),
            codesNAF          = JSON.parse(require("text!data/codesNAF.json"));

        $.each(codesNAF, function (code, desc) {
            $inputCodeNAF.append(new Option(code, code));
        });

        $inputCodeNAF.on("change", function (event) {
            $inputCodeNAFDesc.text(codesNAF[event.target.value]);
        });

        $inputCodeNAF.trigger("change");
    }

    function _initNature() {
        var $rowNature = $("#rowNature");

        $("#natureCreation").on("click", function (event) {
            $rowNature.addClass("hidden");
        });

        $("#natureRevision").on("click", function (event) {
            $rowNature.removeClass("hidden");
        });
    }

    _initNomAgence();
    _initCodeNAF();
    _initNature();

});
