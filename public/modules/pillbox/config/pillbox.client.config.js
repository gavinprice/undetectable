'use strict';

// Configuring the Articles module
angular.module('pillbox').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'PillBox', 'pillbox', 'dropdown', '/pillbox(/create)?');
		Menus.addSubMenuItem('topbar', 'pillbox', 'View', 'pillbox');
	}
]);