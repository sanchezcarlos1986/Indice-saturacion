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

	$(window).scroll(function(){
		if( $('body').scrollTop() > 800 ){
			$('body').css({
				'background-attachment':'initial',
				'background-position': 'center 141%'
			});
		} else {
			$('body').css({
				'background-attachment':'fixed',
				'background-position': 'center 40%'
			});
		}
	});
			


})();