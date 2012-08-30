/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, Option */

define(function (require, exports, module) {
    "use strict";

    var nomsAgence           = JSON.parse(require("text!data/nomsAgence.json")),
        codesNAF             = JSON.parse(require("text!data/codesNAF.json")),
        offresTelFixeCentrex = JSON.parse(require("text!data/offresTelFixeCentrex.json"));

    var offresTelFixeCentrexTemplate = require("text!templates/offresTelFixeCentrex.html");

    function _initBtnCollapse() {
        var $btnCollapse = $(".btn-collapse");

        $btnCollapse.each(function (index, btn) {
            $(btn).on("click", function (event) {
                if ($(btn).text() === "Réduire") {
                    $(btn).text("Déplier");
                } else {
                    $(btn).text("Réduire");
                }
            });
        });
    }

    function _inputDate() {
        var $inputDate = $("#inputDate");

        var now = new Date(),
            month = now.getMonth() + 1,
            today = now.getDate() + '/' + month + '/' + now.getFullYear();

        $inputDate.attr("data-date", today);
        $inputDate.attr("value", today);
        $inputDate.datepicker({
            format: "d/m/yyyy"
        });
    }

    function _initNomAgence() {
        var $inputNomAgence = $("#inputNomAgence");

        $.each(nomsAgence, function (index, nom) {
            $inputNomAgence.append(new Option(nom, nom));
        });
    }

    function _initGamme() {
    }

    function _initCodeNAF() {
        var $inputCodeNAF     = $("#inputCodeNAF"),
            $inputCodeNAFDesc = $("#inputCodeNAFDesc");

        $.each(codesNAF, function (code, desc) {
            $inputCodeNAF.append(new Option(code, code));
        });

        $inputCodeNAFDesc.text(codesNAF[$inputCodeNAF.val()]);

        $inputCodeNAF.on("change", function (event) {
            $inputCodeNAFDesc.text(codesNAF[event.target.value]);
        });
    }

    function _initNature() {
        $("#natureCreation").on("click", function (event) {
            $("#rowNature").addClass("hidden");
        });

        $("#natureRevision").on("click", function (event) {
            $("#rowNature").removeClass("hidden");
        });
    }

    function _initOffresTelFixeCentrexRow(id) {
        var $tabTelFixeCentrex = $("#tableOffresTelFixeCentrex tbody");

        $tabTelFixeCentrex.append(offresTelFixeCentrexTemplate.replace(/@id/g, id));

        var $inputOffresTelFixeCentrex         = $("#inputOffresTelFixeCentrex" + id),
            $offresTelFixeCentrexEngagement    = $("#offresTelFixeCentrexEngagement" + id),
            $inputOffresTelFixeCentrexQuantite = $("#inputOffresTelFixeCentrexQuantite" + id),
            $offresTelFixeCentrexPrixBrut      = $("#offresTelFixeCentrexPrixBrut" + id),
            $offresTelFixeCentrexPrixNet       = $("#offresTelFixeCentrexPrixNet" + id),
            $offresTelFixeCentrexMontantBrut   = $("#offresTelFixeCentrexMontantBrut" + id),
            $offresTelFixeCentrexMontantNet    = $("#offresTelFixeCentrexMontantNet" + id);

        $.each(offresTelFixeCentrex, function (key, value) {
            $inputOffresTelFixeCentrex.append(new Option(key, key));
        });

        $offresTelFixeCentrexEngagement.text(offresTelFixeCentrex[$inputOffresTelFixeCentrex.val()].engagement);
        $offresTelFixeCentrexPrixBrut.text(offresTelFixeCentrex[$inputOffresTelFixeCentrex.val()].prixBrut + " €");
        $offresTelFixeCentrexPrixNet.text(offresTelFixeCentrex[$inputOffresTelFixeCentrex.val()].prixNet + " €");
        $offresTelFixeCentrexMontantBrut.text(parseFloat($inputOffresTelFixeCentrexQuantite.val()) * parseFloat($offresTelFixeCentrexPrixBrut.text()) + " €");
        $offresTelFixeCentrexMontantNet.text(parseFloat($inputOffresTelFixeCentrexQuantite.val()) * parseFloat($offresTelFixeCentrexPrixNet.text()) + " €");

        $inputOffresTelFixeCentrex.on("change", function (event) {
            $offresTelFixeCentrexEngagement.text(offresTelFixeCentrex[event.target.value].engagement);
            $offresTelFixeCentrexPrixBrut.text(offresTelFixeCentrex[event.target.value].prixBrut + " €");
            $offresTelFixeCentrexPrixNet.text(offresTelFixeCentrex[event.target.value].prixNet + " €");
            $offresTelFixeCentrexMontantBrut.text(parseFloat($inputOffresTelFixeCentrexQuantite.val()) * parseFloat($offresTelFixeCentrexPrixBrut.text()) + " €");
            $offresTelFixeCentrexMontantNet.text(parseFloat($inputOffresTelFixeCentrexQuantite.val()) * parseFloat($offresTelFixeCentrexPrixNet.text()) + " €");
        });

        $inputOffresTelFixeCentrexQuantite.on("change", function (event) {
            $offresTelFixeCentrexMontantBrut.text(parseFloat(event.target.value) * parseFloat($offresTelFixeCentrexPrixBrut.text()) + " €");
            $offresTelFixeCentrexMontantNet.text(parseFloat(event.target.value) * parseFloat($offresTelFixeCentrexPrixNet.text()) + " €");
        });
    }

    function _initOffresTelFixeCentrex() {
        $("#ajouterOffresTelFixeCentrex").on("click", function (event) {
            var count = $('#tableOffresTelFixeCentrex tbody tr').length;

            _initOffresTelFixeCentrexRow(count);

            if ($("#supprimerOffresTelFixeCentrex").hasClass("disabled")) {
                $("#supprimerOffresTelFixeCentrex").removeClass("disabled");
            }
        });

        $("#supprimerOffresTelFixeCentrex").on("click", function (event) {
            var count = $('#tableOffresTelFixeCentrex tbody tr').length;

            if ($("#supprimerOffresTelFixeCentrex").hasClass("disabled") === false) {
                if (count === 2) {
                    $("#supprimerOffresTelFixeCentrex").toggleClass("disabled");
                }

                $('#tableOffresTelFixeCentrex tbody tr:last').remove();
            }
        });

        _initOffresTelFixeCentrexRow(0);
    }

    function _initView() {
        _initBtnCollapse();
        _inputDate();
        _initNomAgence();
        _initGamme();
        _initCodeNAF();
        _initNature();
        _initOffresTelFixeCentrex();
    }

    _initView();

});
