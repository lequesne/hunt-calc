(function() {
    'use strict';

    angular
        .module('huntleeCalculator')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, ngDialog) {
    	//on run functions and rootscope global and help functions

        //hack to get rid of elastic rubber banding of body scroll on ipad
        // $('body').on('touchmove', function(e) {
        //     e.preventDefault();
        // });


        //
        // GOOGLE ANALYTICS HELPER
        //
        $rootScope.gaEvent = function( eventDetails ){
            if ( eventDetails.category && eventDetails.action ) {
                ga('send', 'event', {
                    eventCategory: eventDetails.category,
                    eventAction: eventDetails.action,
                    eventLabel: eventDetails.label,
                    eventValue: eventDetails.value,
                    hitCallback: eventDetails.callback,
                    hitCallbackFail: function () {
                        console.log("Unable to send Google Analytics data");
                   }
                });
            }
        }
        
        //
        // HELPER FUNCTIONS
        //
        $rootScope.openPopup = function( template ){
        	ngDialog.open({ template: template });
        }
        $rootScope.fullscreen = function() {
            var
                el = document.documentElement,
                rfs =
                el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
            rfs.call(el);
        }
        $rootScope.range = function(count) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(i)
            }
            return array;
        }
        $rootScope.cleanEncode = function(string) {
            return string.split(' ').join('+');
        }
        $rootScope.stringToClass = function(string) {
            return string.split(' ').join('-').toLowerCase();
        }


        //on state change function
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        //on state change function
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            //reset custom page animation
            $rootScope.stateTransition = toState.transition;

            //send step view GA event
            $rootScope.gaEvent({
                category: 'Step',
                action: 'View',
                label: toState.trackingName
            });

        });

        $log.debug('runBlock end');
    }

})();
