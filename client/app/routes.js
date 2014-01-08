angular.module('newSpeakApp', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: '/client/templates/main.html'
    })
    .when('/charts', {
    	controller: 'collocationAndFrequencyController',
    	templateUrl: '/client/templates/collocationFrequency.html'
    })
    .when('/choices', {
      controller: 'MainController',
      templateUrl: '/client/templates/choices.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
