(function() {

    angular
        .module('huntleeCalculator')

    //replace/include directive
    .directive('include', function() {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: function(element, attr) {
                return attr.include;
            }
        }
    })

    //ga tracking directive
    .directive('gaEventCategory', function( $rootScope ) {
        return {
            restrict: 'A',
            link: function(scope, element, attr){

                element.bind('click', function(){
                    //on click push through event attributes to rootscope GA helper
                    $rootScope.gaEvent({
                        category: attr.gaEventCategory,
                        action: attr.gaEventAction,
                        label: attr.gaEventLabel,
                        value: attr.gaEventValue
                    });
                });
            }
        }
    })

    //stage scale
    .directive('stage', function() {
        return {
            restrict: 'C',
            link: function(scope, element, attr){

            	var stageWidth = element.css('width').replace('px','');
            	var stageHeight = element.css('height').replace('px','');

            	function scaleStage(){
            		var windowWidth = angular.element(window).width(),
            		 	windowHeight = angular.element(window).height(),
            			scaleWidthAmount = windowWidth / stageWidth,
            			scaleHeightAmount = windowHeight / stageHeight;

            		//width scale
            		if ( scaleWidthAmount < 1 && scaleWidthAmount < scaleHeightAmount ) {
            			element.css({
	            			transform: 'scale('+scaleWidthAmount+')',
	            			//transformOrigin: '0px 50%'
	            		});
            		} else if ( scaleHeightAmount < 1 && scaleHeightAmount < scaleWidthAmount  ) {
            			element.css({
	            			transform: 'scale('+scaleHeightAmount+')',
	            			//transformOrigin: '50% 0px'
	            		});
            		} else {
            			element.css({
	            			transform: 'none'
	            		});
            		}
            		
            	}


            	scaleStage();
            	window.addEventListener('resize', function(){
            		scaleStage();
            	});

            }
        }
    })

    //features page details bar scale for smaller screens
    .directive('detailsBarWrapper', function() {
        return {
            restrict: 'C',
            link: function(scope, element, attr){

            	function scaleDetailsBar(){
            		var barWidth = element.css('min-width').replace('px',''),
            			windowWidth = angular.element(window).width(),
            			scaleWidthAmount = windowWidth / barWidth;

            		//width scale
            		if ( scaleWidthAmount < 1 ) {
            			element.css({
	            			transform: 'scale('+scaleWidthAmount+')',
	            			transformOrigin: '0 0'
	            		});
            		} else {
            			element.css({
	            			transform: 'none'
	            		});
            		}
            		
            	}

            	scaleDetailsBar();
            	window.addEventListener('resize', function(){
            		scaleDetailsBar();
            	});

            }
        }
    })

    //number counter wrapper for odometer plugin
    .directive('odometer', function( $timeout ) {
        return {
            restrict: 'A',
            scope: {
	            data: '=data'
	        },
            link: function(scope, elem, attrs) {

            	//init Odometer library on element
            	var od = new Odometer({
					el: elem[0],
					value: 0,
					format: 'd'
				});

            	//watch for directive attribute 'data' change from scope
            	scope.$watch('data', function(newValue, oldValue) {
	                if (newValue) {
	                	od.update( newValue );
	                }
	            }, true);

            }
        };
    })

    //ripple material style click
    .directive('rippleClick', function( $timeout ) {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {

                elem.on('click touchstart', function(event) {

                    var parentOffset = elem.offset(),
                        xPos = event.pageX - parentOffset.left || event.originalEvent.touches[0].pageX - parentOffset.left,
                        yPos = event.pageY - parentOffset.top || event.originalEvent.touches[0].pageY - parentOffset.top;

                    //add ripple element
                    elem.append('<div class="ripple"></div>');
                    //define new ripple element
                    var ripple = elem.find('.ripple').last();

                    //set ripple position
                    ripple.css({
                        top: yPos,
                        left: xPos
                    });

                    //add css animation class
                    ripple.addClass('expanding');

                    //cleanup
                    $timeout(function() {
                        ripple.remove();
                    }, 1500);

                });

            }
        };
    });

})();
