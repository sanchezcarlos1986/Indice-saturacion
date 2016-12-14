(function(){
	angular
		.module('homeController', [])
		.controller('homeController', HomeController);
		
		function HomeController($http){

			var vm = this;
			vm.saludo = 'Índice Saturación';

			$http.get('./js/carreras.json')
				.success(function(resultado){
					// vm.carreras = resultado;
					console.log(resultado)
				})
				.error(function(err){
					console.log(err);
				})
		}

})();