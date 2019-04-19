/* global angular, document, window */
'use strict';

angular.module('starter.services', [])

.factory('FeedsService', function( $http ) {

  var BASE_URL = "http://api.randomuser.me";
  //var BASE_URL = "https://www.reddit.com/new.json";

  var items = [];

  console.log('factory.FeedsService');

  var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, X-Requested-With, X-CSRF-Token',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
  };

//  $http.defaults.headers.put = {
//        'Access-Control-Allow-Origin' : '*',
//        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
//        'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, X-Requested-With, X-CSRF-Token',
//        'Content-Type': 'application/json',
//        'Accept': 'application/json'
//  };

  return {
    GetFeed: function() {
      return $http({
        url: BASE_URL + '?results=10',
        method: 'get',
        headers: headers
      } ).then(function(response) {
        items = response.data.results;
        return items;
      });
    },
    GetNewUsers: function(){
      return $http.get(BASE_URL+'?results=2', {
        url:BASE_URL,
        headers: headers
      }).then(function(response){
        items = response.data.results;
        return items;
      });
    },
    GetOldUsers: function(){
      return $http.get(BASE_URL+'?results=5', {
        url:BASE_URL,
        headers: headers
      }).then(function(response){
        items = response.data.results;
        return items;
      });
    }
  }
})

/*


$http({
    url: BASE_URL,
    method: 'get',
    headers: headers
});

.service('FeedsService', function($http) {

    console.log('service.FeedsService');

      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      return $http({
        headers: headers,
      }).success(function(result) {
          console.log("FeedsService.cors.success!");
          console.log(result);
      }).error(function(data, status, headers, config) {
          console.log("FeedsService.cors.error!");
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
      });
})
*/

//NOTE: We are including the constant ApiEndpoint to be used here.
.factory('Api', function($http, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function() {
    return $http.get(ApiEndpoint.url + '/tasks')
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      });
  };

  return {
    getApiData: getApiData
  };
})

.service('Auth', function($http) {
			var headers = {
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			};

			return $http({
				headers: headers,
	    }).success(function(result) {
					console.log("Auth.signin.success!");
					console.log(result);
	    }).error(function(data, status, headers, config) {
					console.log("Auth.signin.error!");
	        console.log(data);
	        console.log(status);
	        console.log(headers);
	        console.log(config);
	    });

});
