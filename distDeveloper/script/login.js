"use strict";

(function () {

    angular.module("Eportfolio", []).controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ["$scope"];

    function loginCtrl($scope) {
        var scope = $scope;
        var vm = this;

        console.log("scope: ", scope);
        console.log("vm: ", vm);

        console.log("loginCtrl");

        /**
         * Flip OUT login container -> flip IN forgot container
         *
         * @name animationLoginForgotForms
         * @function
         *
         * @return {string}
         */
        function animationLoginForgotForms() {
            var forgotBtn = document.querySelectorAll(".btn__forgot-js")[0],
                loginWrap = document.querySelectorAll(".login")[0],
                forgotWrap = document.querySelectorAll(".forgot")[0];

            forgotBtn.addEventListener("click", function () {
                loginWrap.classList.remove("flipInY");
                forgotWrap.classList.remove("flipOutY");

                loginWrap.classList.add("flipOutY");
                forgotWrap.classList.add("flipInY");
            });
        }

        /**
         * Flip OUT forgot container -> flip IN login container
         *
         * @name animationForgotLoginForms
         * @function
         *
         * @return {string}
         */
        function animationForgotLoginForms() {
            var forgotBtn = document.querySelectorAll(".btn__goToLogin-js")[0],
                loginWrap = document.querySelectorAll(".login")[0],
                forgotWrap = document.querySelectorAll(".forgot")[0];

            forgotBtn.addEventListener("click", function () {
                loginWrap.classList.remove("flipOutY");
                forgotWrap.classList.remove("flipInY");

                loginWrap.classList.add("flipInY");
                forgotWrap.classList.add("flipOutY");
            });
        }

        /**
         * Call animation function
         */
        animationLoginForgotForms();
        animationForgotLoginForms();
    }
})();