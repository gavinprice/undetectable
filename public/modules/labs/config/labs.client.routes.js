'use strict';

// Setting up route
angular.module('labs').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('showLab', {
			url: '/labs',
			templateUrl: 'modules/labs/views/show-labs.view.html'
		}).
		state('create-lab', {
			url: '/labs/create',
			templateUrl: 'modules/labs/views/create-lab.view.html'
		}).
		state('edit-lab', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/labs/views/edit-lab.view.html'
		});
	}
]);