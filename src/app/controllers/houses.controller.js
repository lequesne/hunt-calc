(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.controller('HousesController', HousesController);

	/** @ngInject */
	function HousesController($scope, $timeout, $state, $rootScope) {

		$timeout(function() {

			//popups transition in
			$('.popup').each(function(i) {
				var popup = $(this);
				$timeout(function() {
					popup.removeClass('reveal');
				}, i * 200);
			});

		});

	}

})();