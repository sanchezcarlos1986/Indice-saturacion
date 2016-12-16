(function(){
	angular
		.module('homeController', [])
		.controller('homeController', HomeController);
		
		function HomeController($http){

			var vm = this;
			vm.saludo = 'Índice Saturación';

			$http.get('./public/carreras.json')
			.success(function(resultado){
				vm.carreras = resultado;
			});

			vm.elegirCarrera = function(){
				var campo_laboral = vm.carreras[0].campo_laboral;
				var competitividad = vm.carreras[0].competitividad;
				var comparacion = campo_laboral+'/'+competitividad;
				console.log(vm.carreraElegida);
			}
		}

})();