(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.controller('StartController', StartController);

	/** @ngInject */
	function StartController($scope, $timeout, $state, $http) {

		//go to intro after timeout
		var nextStepDelay = $timeout(function(){
			$state.go('main.intro');
		}, 60000 );

		// //scope on destroy event
		$scope.$on('$destroy',function(){
			if ( nextStepDelay )
				$timeout.cancel( nextStepDelay );
		});

	}
	
})();
