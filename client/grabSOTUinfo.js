angular.module('newSpeakApp')
.factory('grabSOTUinfo', function($q, $http) {

  var service = {
    collocation: function(presidents) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/collocation',
        params: {list: presidents, word: 'democracy'}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    }

  };
  return service;
});