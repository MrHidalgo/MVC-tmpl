"use strict";

(function () {

    angular.module("Eportfolio", []).controller("confirmCtrl", confirmCtrl);

    confirmCtrl.$inject = ["$scope"];

    function confirmCtrl($scope) {
        var scope = $scope;
        var vm = this;

        console.log("scope: ", scope);
        console.log("vm: ", vm);

        console.log("confirmCtrl");
    }
})();