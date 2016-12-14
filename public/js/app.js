// Angular
(function(){

	'use strict';

	angular
		.module('indiceSaturacion', [
			'ui.router',
			'homeController'
		])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
			$stateProvider
				.state('home', { // Home
					url: '/',
					templateUrl: './views/home.html',
					controller: 'homeController',
					controllerAs: 'home'
				})
				
				$urlRouterProvider.otherwise("/");
	}]);

})();