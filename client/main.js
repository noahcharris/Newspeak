angular.module('newSpeakApp', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'client/templates/main.html'
    })
    .when('/frequency', {
    	controller: 'frequencyController',
    	templateUrl: 'client/templates/frequency.html'
    })
    .when('/collocation', {
    	controller: 'collocationController',
    	templateUrl: 'client/templates/collocation.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
