//Declaration du module
var pokeApp = angular.module('pokedex', ['ngResource'])

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

pokeApp.controller('ctrlPokemon', ctrlPokemon); //Associé un controleur à une function qui représente son model

function ctrlPokemon($scope, $http, $log,pokService){
     $scope.listepokemons = [
                {name:'Pokemon',id:'1'},
                {name:'Pokemon',id:'4'},
                {name:'Pokemon',id:'67'},
                {name:'Pokemon',id:'9'},
                {name:'Pokemon',id:'22'},
                {name:'Pokemon',id:'99'},
                {name:'Pokemon',id:'100'},
                {name:'Pokemon',id:'71'},
                {name:'Pokemon',id:'58'},
            ];
    $scope.idpok='';
    $scope.$log = $log;
    
     $http({
            method : "GET",
            url : "http://pokeapi.co/api/v2/pokemon"
        }).then(function mySucces(response) {
            $scope.listep = response.data.results;
        }, function myError(response) {
        $scope.$log = response.statusText;
        });
    
    $scope.sendIdPok = function(item) {
        pokService.setId(item);
    }
}

pokeApp.factory('pokeInfo', function($resource) {
  return $resource(pokeApiUrl+"api/v2/pokemon/:id/",{id:'@id'});
});

pokeApp.controller('secondectrl', secondectrl);

function secondectrl($scope, $http, $log, pokeInfo, pokService){
    $scope.pokService = pokService;
    $scope.$watch('pokService.getId()', function() {
        var pokemon = pokeInfo.get({id:pokService.getId()});
        pokemon.$promise.then(function (resultat) {
            $scope.pokemon = resultat;
            $log.info($scope.pokemon);
            $scope.id = resultat.id;
            $scope.nom = resultat.name;
            $scope.moves = resultat.moves;
            $scope.image="http://pokeapi.co/media/img/"+$scope.id+".png"
        }, true);
    });
}

pokeApp.factory('pokService', function($log) {
    var service ={};
    service.id= 1;
    service.name='';

    service.setId = function (newid) {
        $log.info("envoi id de la liste au factory"+newid);
        this.id= newid;
        $log.info("nouveau id est :"+this.id);

    }
    //service.broadcastItem = function() {
      //  $rootScope.$broadcast('handleBroadcast');
    //};
    service.getId = function () {
        return this.id;
    }

    return service;


});


pokeApp.directive('pokedex', function() {
     return {
         templateUrl: 'templates/pokedex.html'
     };
  });