/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, Option */

define(function (require, exports, module) {
    "use strict";

    function _initOffresTelFixeCentrex() {
        var $ajouterOffresTelFixeCentrex   = $("#ajouterOffresTelFixeCentrex"),
            $supprimerOffresTelFixeCentrex = $("#supprimerOffresTelFixeCentrex"),
            $tableOffresTelFixeCentrexBody = $("#tableOffresTelFixeCentrex tbody"),
            offresTelFixeCentrex           = JSON.parse(require("text!data/offresTelFixeCentrex.json")),
            offresTelFixeCentrexTemplate   = require("text!templates/offresTelFixeCentrex.html");

        $ajouterOffresTelFixeCentrex.on("click", function (event) {
            var count = $tableOffresTelFixeCentrexBody.find("tr").length;

            if (count === 1) {
                $supprimerOffresTelFixeCentrex.removeClass("disabled");
            }

            $tableOffresTelFixeCentrexBody.append(offresTelFixeCentrexTemplate.replace(/@id/g, count));

            var $inputOffresTelFixeCentrex         = $("#inputOffresTelFixeCentrex" + count),
                $offresTelFixeCentrexEngagement    = $("#offresTelFixeCentrexEngagement" + count),
                $inputOffresTelFixeCentrexQuantite = $("#inputOffresTelFixeCentrexQuantite" + count),
                $offresTelFixeCentrexPrixBrut      = $("#offresTelFixeCentrexPrixBrut" + count),
                $offresTelFixeCentrexPrixNet       = $("#offresTelFixeCentrexPrixNet" + count),
                $offresTelFixeCentrexMontantBrut   = $("#offresTelFixeCentrexMontantBrut" + count),
                $offresTelFixeCentrexMontantNet    = $("#offresTelFixeCentrexMontantNet" + count);

            $.each(offresTelFixeCentrex, function (key, value) {
                $inputOffresTelFixeCentrex.append(new Option(key, key));
            });

            $inputOffresTelFixeCentrex.on("change", function (event) {
                $offresTelFixeCentrexEngagement.text(offresTelFixeCentrex[event.target.value].engagement);
                $offresTelFixeCentrexPrixBrut.text(offresTelFixeCentrex[event.target.value].prixBrut + " €");
                $offresTelFixeCentrexPrixNet.text(offresTelFixeCentrex[event.target.value].prixNet + " €");

                $inputOffresTelFixeCentrexQuantite.trigger("change");
            });

            $inputOffresTelFixeCentrexQuantite.on("change", function (event) {
                $offresTelFixeCentrexMontantBrut.text(parseFloat(event.target.value) * parseFloat($offresTelFixeCentrexPrixBrut.text()) + " €");
                $offresTelFixeCentrexMontantNet.text(parseFloat(event.target.value) * parseFloat($offresTelFixeCentrexPrixNet.text()) + " €");
            });

            $inputOffresTelFixeCentrex.trigger("change");
        });

        $supprimerOffresTelFixeCentrex.on("click", function (event) {
            var count = $tableOffresTelFixeCentrexBody.find("tr").length;

            if (count > 1) {
                if (count === 2) {
                    $supprimerOffresTelFixeCentrex.addClass("disabled");
                }

                $tableOffresTelFixeCentrexBody.find("tr:last").remove();
            }
        });

        $ajouterOffresTelFixeCentrex.trigger("click");
    }

    _initOffresTelFixeCentrex();

});
