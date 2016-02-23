var pokeApp = angular.module('pokedex', ['ngResource'])
        .controller('pokcontroller', ['$scope', '$log', function($scope, $log) {
            $scope.test = [
                {name:'pikachu',id:'1'},
                {name:'charizard',id:'2'},
                {name:'snorlax',id:'3'},
                {name:'bulbasaur',id:'4'}
            ];
        $scope.idpok='';
            $scope.$log = $log;
        }])
    ;

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"