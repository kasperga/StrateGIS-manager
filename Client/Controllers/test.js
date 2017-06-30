   'use strict';

	var myApp = angular.module('myApp', ['ngResource']);

	/**
	myApp.controller('customersCtrl',  function ($scope, $http, $sce) 
	{
		//$http.get("localhost:8000/category").then(function (response) 
		//{
		//	$scope.myData = response.data;
		//});
		
		var url = "localhost:8000/category"
		var trustedUrl = $sce.trustAsUrl(url);

		$http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
		.then(function(data){
			$scope.myData = response.data;
			console.log(data.found);
		})
		;

		
	});
	*/
	
	angular.module('myApp').factory('Entry', function($resource) {
    return $resource('/category/:id'); // Note the full endpoint address
});
	
	angular.module('myApp').controller('ResourceController',function($scope, Entry) {
  var entry = Entry.get({ id: $scope.id }, function() {
    $scope.name = entry.id;
	console.log(entry);
  }); // get() returns a single entry

  /*
  var entries = Entry.query(function() {
    console.log(entries);
  }); //query() returns all the entries

  $scope.entry = new Entry(); //You can instantiate resource class

  $scope.entry.data = 'some data';

  Entry.save($scope.entry, function() {
    //data saved. do something here.
  }); //saves an entry. Assuming $scope.entry is the Entry object  
  */
});
	
	


