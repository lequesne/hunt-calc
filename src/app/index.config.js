(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.config(config);

	/** @ngInject */
	function config($logProvider ) {
		// Enable log
		$logProvider.debugEnabled(true);
	}

})();
