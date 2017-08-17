(function() {
    'use strict';

    angular
        .module('huntleeCalculator')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope) {

    	// NOTES
    	// - The house datra array below is used as the model for all house data (feature data is found in the feature contreoller)
    	// - The worksheetTitle key should match the worksheet title for this house in the google spreadsheet
        // - The overlays object keys should match the corresponding feature id in the features controller

        $rootScope.houseData = [{
            name: '2 Bedroom Townhouse',
            worksheetTitle: '2-bedroom (MU)',
            worksheetLink: "https://spreadsheets.google.com/feeds/list/1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU/om28xhn/public/full",
            beds: 2,
            block: 150,
            overlays: {
                'base': 'assets/images/2-BedMU-Base.png',
                'Energy': 'assets/images/2-BedMU-Energy.png',
                'EarthSource': 'assets/images/2-BedMU-Geo.png',
                'Smart Air': 'assets/images/2-BedMU-Air.png',
                'Smart Water': 'assets/images/2-BedMU-Water.png',
                'Electric Car': 'assets/images/2-BedMU-Car.png'
            }
        }, {
            name: '2 Bedrooms',
            worksheetTitle: '2-bedroom',
            worksheetLink: "https://spreadsheets.google.com/feeds/list/1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU/ot9j2s1/public/full",
            beds: 2,
            block: 320,
            overlays: {
                'base': 'assets/images/2-Bed-Base.png',
                'Energy': 'assets/images/2-Bed-Energy.png',
                'EarthSource': 'assets/images/2-Bed-Geo.png',
                'Smart Air': 'assets/images/2-Bed-Air.png',
                'Smart Water': 'assets/images/2-Bed-Water.png',
                'Electric Car': 'assets/images/2-Bed-Car.png'
            }
        }, {
            name: '3 Bedrooms',
            worksheetTitle: '3-bedroom',
            worksheetLink: "https://spreadsheets.google.com/feeds/list/1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU/oa36dxg/public/full",
            beds: 3,
            block: 400,
            overlays: {
                'base': 'assets/images/3-Bed–Base.png',
                'Energy': 'assets/images/3-Bed–Energy.png',
                'EarthSource': 'assets/images/3-Bed–Geo.png',
                'Smart Air': 'assets/images/3-Bed–Air.png',
                'Smart Water': 'assets/images/3-Bed–Water.png',
                'Electric Car': 'assets/images/3-Bed–Car.png'
            }
        }, {
            name: '4 Bedrooms',
            worksheetTitle: '4-bedroom',
            worksheetLink: "https://spreadsheets.google.com/feeds/list/1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU/olo1olo/public/full",
            beds: 4,
            block: 760,
            overlays: {
                'base': 'assets/images/4-Bed-Base.png',
                'Energy': 'assets/images/4-Bed-Energy.png',
                'EarthSource': 'assets/images/4-Bed-Geo.png',
                'Smart Air': 'assets/images/4-Bed-Air.png',
                'Smart Water': 'assets/images/4-Bed-Water.png',
                'Electric Car': 'assets/images/4-Bed-Car.png'
            }
        }, {
            name: '5 Bedrooms',
            worksheetTitle: '5-bedroom',
            worksheetLink: "https://spreadsheets.google.com/feeds/list/1-nv8j_SJvuI0Nr2BUzQmfLudiMUTYHMhMdlIhDSDkqU/or578hx/public/full",
            beds: 5,
            block: 1200,
            overlays: {
                'base': 'assets/images/5-Bed-Base.png',
                'Energy': 'assets/images/5-Bed-Energy.png',
                'EarthSource': 'assets/images/5-Bed-Geo.png',
                'Smart Air': 'assets/images/5-Bed-Air.png',
                'Smart Water': 'assets/images/5-Bed-Water.png',
                'Electric Car': 'assets/images/5-Bed-Car.png'
            }
        }];

    }

})();
