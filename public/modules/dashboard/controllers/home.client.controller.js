'use strict';

angular.module('dashboard').factory('PillboxService', ['$resource',
function($resource) {
	return $resource('pillboxs/:pillboxId', {
		pillboxId : '@_id'
	});
}]).controller('HomeController', ['$scope', 'Authentication', 'PillboxService',
function($scope, Authentication, PillboxService) {
	// This provides Authentication context.
	$scope.authentication = Authentication;

	$scope.pillBox = {
		isCompliant : false,
		reason : ""
	};

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

}]);
