angular.module('newSpeakApp')
.factory('grabSOTUinfo', function($q, $http) {

  var service = {
    grabInfo: function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/sotuInfo',
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