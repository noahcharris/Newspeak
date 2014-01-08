angular.module('newSpeakApp')
.factory('grabSOTUinfo', function($q, $http) {

  var service = {
    collocation: function(president, word) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/collocation',
        params: {president: president, word: word}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    },

    frequency: function(president, word) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/frequency',
        params: {president: president, word: word}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    },

    getTopWords: function(president) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/words',
        params: {president: president}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      // WHEN SERVER WORKS DELETE BELOW
      // d.resolve('["High", "whitehouse", "fish", "running", "out", "of", "ideas", "health", "care", "healthcare"]');
      return d.promise;
    }

  };
  return service;
});