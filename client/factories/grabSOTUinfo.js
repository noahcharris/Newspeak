angular.module('newSpeakApp')
.factory('grabSOTUinfo', function($q, $http) {

  var service = {
    collocation: function(president, word) {
      var d = $q.defer();
      // WHEN SERVER WORKS UNCOMMENT BELOW
      // $http({
      //   method: 'GET',
      //   url: '/collocation',
      //   params: {president: president, word: word}
      // }).success(function(data) {
      //   d.resolve(data);
      // }).error(function(reason) {
      //   d.reject(reason);
      // });
      // WHEN SERVER WORKS DELETE BELOW
      d.resolve('["republican", "elephant","chris christie", "bush", "conservative", "small government"]');
      return d.promise;
    },

    frequency: function(president, word) {
      var d = $q.defer();
      // WHEN SERVER WORKS UNCOMMENT BELOW
      // $http({
      //   method: 'GET',
      //   url: '/frequency',
      //   params: {president: president, word: word}
      // }).success(function(data) {
      //   d.resolve(data);
      // }).error(function(reason) {
      //   d.reject(reason);
      // });
      // WHEN SERVER WORKS DELETE BELOW
      d.resolve('["new word", 350, 300, 605, 500, 800, 900, 200, 1100]');
      return d.promise;
    },

    getTopWords: function(president) {
      var d = $q.defer();
      // WHEN SERVER WORKS UNCOMMENT BELOW
      // $http({
      //   method: 'GET',
      //   url: '/topWords',
      //   params: {president: president}
      // }).success(function(data) {
      //   d.resolve(data);
      // }).error(function(reason) {
      //   d.reject(reason);
      // });
      // WHEN SERVER WORKS DELETE BELOW
      d.resolve('["recession", "whitehouse", "fish", "running", "out", "of", "ideas", "health", "care", "healthcare"]');
      return d.promise;
    }

  };
  return service;
});