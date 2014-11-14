'use strict';

angular.module('dashboard').factory('PillboxService', ['$resource',
function($resource) {
	return $resource('pillboxs/:pillboxId', {
		pillboxId : '@_id'
	});
}]).controller('HomeController', ['$scope', 'Authentication', 'PillboxService', 'Labs',
function($scope, Authentication, PillboxService, Labs) {
	// This provides Authentication context.
	$scope.authentication = Authentication;
	
	$scope.pillBox = {
		isCompliant : false,
		reason : ""
	};

	//This function handles the submitting of the pill adherance survey
	$scope.submitPillBox = function() {
		var pillbox = new PillboxService({
			isCompliant : this.pillBox.isCompliant,
			reason : this.pillBox.reason
		});
		pillbox.$save(function(response) {
			$scope.pillBox.isCompliant = '';
			$scope.pillBox.reason = '';
			alert("Success");
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};

	//PIE CHART
	
	$scope.labData = function() {
		Labs.query(function(res) {
			for (var i = 0; i < res.length; i++) {
				if (!res[i].undetectable) {
					$scope.undetectableCount++;
				} else {
					$scope.detectableCount++;
				}
			}
		});
	};
	$scope.labData();

	$scope.pieData = [{
		value : 3,
		color : "#F7464A"
	}, {
		value : 3,
		color : "#83c9c9"
	}];

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

}]);
