(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.controller('IntroController', IntroController);

	/** @ngInject */
	function IntroController( $log, $scope, $state, $timeout, $interval ) {

		//go back to start after timeout
		var backToStartDelay;
		function backToStartTimeout(){
			backToStartDelay = $timeout(function(){
				$state.go('main.start');
			}, 60000 );
		}backToStartTimeout();

		//on interaction reset the back to start delay
		angular.element('html').bind('touchstart mousedown', function(){
			$timeout.cancel( backToStartDelay );
			backToStartTimeout();
		});

		//carousel setup
		$scope.carousel = $('.carousel').lightSlider({
			item: 1,
			mode: 'slide',
			auto: true,
			pause: 10000,
			loop: true,
			controls: false,
			onSliderLoad: function(el){
				$log.debug('Slider Init');
				$timeout(function(){
					//move start button above pager
					$('.lSPager').before( $('.btn.start') );
					//set active popup in scope
					$scope.activePopup = el.find('.active').data('popup');
				});			
			},
			onBeforeSlide: function(el){
				$timeout(function(){
					//set active popup in scope
					$scope.activePopup = el.find('.active').data('popup');
				});		
			}
		});

		// //scope on destroy event
		$scope.$on('$destroy',function(){

			//clear bindings
			$('html').off();

			if ( $scope.carousel )
				$scope.carousel.destroy();

			if ( backToStartDelay )
				$timeout.cancel( backToStartDelay );
		});

	}
  
})();
