'use strict';

// Setting up route
angular.module('pillbox').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listPillbox', {
			url: '/pillbox',
			templateUrl: 'modules/pillbox/views/list-pillbox.client.view.html'
		});
	}
]);