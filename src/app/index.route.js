(function() {
    'use strict';

    angular
        .module('huntleeCalculator')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        //main container stste
            .state('main', {
                asbract: true,
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'main',
                resolve: {
                    spreadsheet: function($rootScope, $http) {

                        //id for google spreadsheet container all calculations and data
                        $rootScope.spreadsheetId = '1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU';

                        return $http({
                            method: 'GET',
                            url: 'https://spreadsheets.google.com/feeds/worksheets/' + $rootScope.spreadsheetId + '/public/full?alt=json'
                        });

                    }
                }
            })
            //start/welcome screen
            .state('main.start', {
                url: '/',
                templateUrl: 'app/views/start.html',
                controller: 'StartController',
                controllerAs: 'start',
                transition: 'cross-fade',
                trackingName: 'Intro'
            })
            //intro carousel
            .state('main.intro', {
                url: '/intro',
                templateUrl: 'app/views/intro.html',
                controller: 'IntroController',
                controllerAs: 'intro',
                transition: 'cross-fade',
                trackingName: 'Carousel'
            })
            //house selection
            .state('main.houses', {
                url: '/houses',
                templateUrl: 'app/views/houses.html',
                controller: 'HousesController',
                controllerAs: 'houses',
                transition: 'scale-fade',
                trackingName: 'House Selection'
            })
            //features selection
            .state('main.features', {
                url: '/house/:index',
                templateUrl: 'app/views/features.html',
                controller: 'FeaturesController',
                controllerAs: 'features',
                transition: 'scale-fade',
                trackingName: 'Features'
            });

        //router html5 mode (no hash) and revert to hash bang (#!) if html5 history not supported
        $locationProvider
        //.html5Mode(true)
            .hashPrefix('!');

        //default url location
        $urlRouterProvider.otherwise('/');

    }

})();