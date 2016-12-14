(function(){
	angular
		.module('homeController', [])
		.controller('homeController', HomeController);
		
		function HomeController($http){

			var vm = this;
			vm.saludo = 'Índice Saturación';

			$http.get('carreras.json')
			.success(function(resultado){
				vm.carreras = resultado;
			});
		}

})();