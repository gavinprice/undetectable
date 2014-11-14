'use strict';

angular.module('dashboard').factory('PillboxService', ['$resource',
function($resource) {
	return $resource('pillboxs/:pillboxId', {
		pillboxId : '@_id'
	});
}]).controller('HomeController', ['$scope', 'Authentication', 'PillboxService', 'Labs', '$window',
function($scope, Authentication, PillboxService, Labs, $window) {
	// This provides Authentication context.
	$scope.authentication = Authentication;
	
	$scope.hideAdherance = false;
	//This function handles the submitting of the pill adherance survey
	$scope.confirmAdherance = function() {
		var pillbox = new PillboxService({
			isCompliant : true,
			reason : ""
		});
		pillbox.$save(function(response) {
			$window.location.reload();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
	
	$scope.denyAdherance = function() {
		var pillbox = new PillboxService({
			isCompliant : false,
			reason : $scope.pillBox.reason
		});
		pillbox.$save(function(response) {
			$scope.pillBox.reason = '';
			$window.location.reload();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};
	
	$scope.adherance = function(){
		PillboxService.query(function(res){
			for (var i = 0; i < res.length; i++) {
				if(new Date(res[i].created).getDate() == new Date().getDate()){
					$('#Intro').addClass("hidden")
					break;
				}
			}
		});
	};
	
	
	
	//PIE CHART
	$scope.undetectableStatus = false;
	$scope.labData = function() {
		$scope.undetectableCount = 0, $scope.detectableCount = 0;
		Labs.query(function(res) {
			for (var i = 0; i < res.length; i++) {
				if (!res[i].undetectable) {
					$scope.undetectableCount++;
				} else {
					$scope.detectableCount++;
				}
			}
            $scope.undetectableStatus = res[res.length-1].undetectable;
			$scope.pieData = [{value : $scope.undetectableCount,color : "#F7464A"}, {value : $scope.detectableCount,color : "#83c9c9"}];
			var ctx = document.getElementById("progressChart").getContext("2d");
            var mynewCd4Chart = new Chart(ctx).Pie($scope.pieData, {});
		});
	};
	

	

	$scope.pieOptions = {
		// Chart.js options can go here.
		scaleShowLabels : true, // Interpolated JS string - can access value
		scaleLabel : "12",
		// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
		scaleIntegersOnly : true,

		// String - Scale label font declaration for the scale label
		scaleFontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		// Number - Scale label font size in pixels
		scaleFontSize : 12,

		// String - Scale label font weight style
		scaleFontStyle : "normal",

		// String - Scale label font colour
		scaleFontColor : "#666",

		// Boolean - whether or not the chart should be responsive and resize when the browser does.
		responsive : true
	};
	
	
	$scope.init = function(){
		$scope.adherance();
		$scope.labData();
	};

}]);
