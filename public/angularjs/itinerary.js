// Dependancies used: https://ghiden.github.io/angucomplete-alt/
var itinerary = angular.module('itinerary', ["angucomplete-alt"]);
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
				"source" : $scope.source.title,
				"destination" : $scope.destination.title
			}
		}).success(function(data) {
			if(!Boolean(data.equal)) {
				$scope.itineraries.push({
					"source": $scope.source,
					"destination": $scope.destination
				});
				$scope.error = "";
			} else {
				$scope.error = "Please select different Source and Destination..!";
			}
		}).error(function(error) {
			//TODO: Send Error To Front
		});
	};
	
	$scope.searchAirports = function(str) {
		var matches = [];
		$scope.airports.forEach(function(airport) {
			if(airport.name !== null && airport.name !== undefined) {
				if ((airport.name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
				        (airport.iata.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
						matches.push(airport);
					}
			}
		});
		return matches;
	};
});