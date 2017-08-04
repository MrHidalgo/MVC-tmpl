(function(){

    angular
        .module("Eportfolio", [])
        .controller("confirmCtrl", confirmCtrl);


    confirmCtrl.$inject = ["$scope"];


    function confirmCtrl($scope) {
        const scope = $scope;
        const vm = this;

        console.log("scope: ", scope);
        console.log("vm: ", vm);

        console.log("confirmCtrl");
    }
})();
