(function() {

    angular
        .module('huntleeCalculator')

    //default page view transition
    .animation('.page', function($rootScope, $state) {
        return {
            enter: function(element, done) {



            },

            leave: function(element, done) {

            }
        }
    });

})();
