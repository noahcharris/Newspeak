angular.module('newSpeakApp', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'client/templates/main.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});


// var width = window.innerWidth * 0.75;
// var height = window.innerHeight * 0.75;


// var svg = d3.select("body").append("svg")
// .attr("width", width)
// .attr("height", height);

// console.log('main.js loaded');