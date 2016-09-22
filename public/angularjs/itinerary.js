var itinerary = angular.module('itinerary', []);
itinerary.controller('validateItinerary', function($scope, $http) {
	$scope.itineraries = [];
	$http.get("https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json").then(function(response) {
		$scope.airports = response.data;
	});
	$scope.add = function() {
		console.log($scope.source);
		console.log($scope.destination);
		$http({
			method : "POST",
			url : '/checkEqual',
			data : {
				"source" : $scope.source.iata,
				"destination" : $scope.destination.iata
			}
		}).success(function(data) {
			if(!Boolean(data.equal)) {
				$scope.itineraries.push({
					"source": $scope.source,
					"destination": $scope.destination
				});
				$scope.error = "";
			} else {
				$scope.error = "Source and Destination cannot be equal..!";
			}
		}).error(function(error) {
			//TODO: Send Error To Front
		});
	};
});