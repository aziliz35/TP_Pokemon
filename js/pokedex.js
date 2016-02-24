



var pokeApp = angular.module('pokedex', ['ngResource'])
        .controller('pokcontroller', ['$scope', '$log','$http', function($scope, $log,$http) {
            $scope.listepokemons = [
                {name:'pikachu',id:'1'},
                {name:'charizard',id:'2'},
                {name:'snorlax',id:'3'},
                {name:'bulbasaur',id:'4'}
            ];
        $scope.idpok='';
            $scope.$log = $log;

            $http.get("http://pokeapi.co/api/v2/pokemon/")
                .then(function(response) {
                    $scope.listep = response.data;
                });
        }])

    ;



pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;

}]);
var pokeApiUrl = "http://pokeapi.co/"