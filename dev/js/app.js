// Angular
(function(){

	'use strict';

	angular
		.module('indiceSaturacion', [
			'ui.router',
			'homeController'
		])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
			$stateProvider
				.state('home', { // Home
					url: '/',
					templateUrl: './public/views/home.html',
					controller: 'homeController',
					controllerAs: 'home'
				})
				
				$urlRouterProvider.otherwise("/");

			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');		
	}]);

	document.documentElement.addEventListener('touchstart', function (event) {
	  if (event.touches.length > 1) {
	    event.preventDefault();
	  }
	}, false);

})();