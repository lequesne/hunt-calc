(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController( $scope, $timeout, $rootScope, $http, preloader, spreadsheet ) {

		//Keep track of the state of the loading images.
		$scope.imagesLoading = true;
		$scope.imagesLoaded = false;
		$rootScope.percentLoaded = 0;

		//any images to be preloaded should be added here (house overlays are included automatically)
		$scope.imageLocations = [
			'assets/images/Bkg.jpg',
			'assets/images/Community-Day.jpg',
			'assets/images/Community-Sunrise.jpg',
			'assets/images/Dial.png',
			'assets/images/Earth.png',
			'assets/images/House-Selection.jpg',
			'assets/images/huntlee-logo-color.svg',
			'assets/images/huntlee-logo.svg',
			'assets/images/Lower-Rates.png',
			'assets/images/Pin.png',
			'assets/images/popup-energy.jpg',
			'assets/images/popup-local.jpg',
			'assets/images/popup-solar.jpg',
			'assets/images/Recyled-Water.png',
			'assets/images/Solar-Network.png'
		];

		//
		// FINAL PRELOAD CHECK
		//
		//final load check to make sure images and worksheets are both loaded
		function preloadCheck() {
			if ( $scope.worksheetsLoaded && $scope.imagesLoaded ) {
				//finally set loaded percent to 100
				$rootScope.percentLoaded = 100;
				//set root loaded state to true (hides prelaoder in the index.html)
				$timeout(function(){
					$rootScope.preloadComplete = true;
				},300);
			}
		}

		//
		// WORKSHEET LOADER
		//
		//preload all house type worksheets from spreadsheet
		var loadedWorksheets = 0;
		angular.forEach( $rootScope.houseData, function(house, i){

			//add house overlays to image preload array
			angular.forEach( house.overlays, function(overlay, i){
				$scope.imageLocations.push(overlay);
			});

			angular.forEach( spreadsheet.data.feed.entry, function(worksheet, i){

				if ( worksheet.title['$t'] == house.worksheetTitle ) {
					//matching worksheet so request
					$http({
				        method: 'GET',
				        url: worksheet.link[0].href + '?alt=json'
				    })
				    .then(function successCallback(response) {
				    		//save worksheet rows to each house object
				    		$timeout(function(){
					    		house.worksheet = response.data.feed.entry;
					    		loadedWorksheets++;
					    		if ( loadedWorksheets == $rootScope.houseData.length ) {
					    			console.log('WORKSHEET LOAD COMPLETE');
					    			//emit event to activate recalculation event listener in features controller
					    			$rootScope.$emit('houseWorksheetsLoaded');
					    			$scope.worksheetsLoaded = true;
					    			//call load check to make sure images and worksheets are laoded
					    			preloadCheck();
					    		}
					    	});

				        },
				        function errorCallback(response) {
				            //error
				            console.log(response);
				        });
				}

			});

		});

		//
		// IMAGE LOADER
		//
		// Preload the images; then, update display when returned.
		preloader.preloadImages( $scope.imageLocations ).then(
			function handleResolve( imageLocations ) {

				// Loading was successful.
				$scope.imagesLoading = false;
				$scope.imagesLoaded = true;

				//call load check to make sure images and worksheets are laoded
				preloadCheck();

			},
			function handleReject( imageLocation ) {

				// Loading failed on at least one image.
				$scope.imagesLoading = false;
				$scope.imagesLoaded = false;

				console.error( "Image Failed", imageLocation );
				console.info( "Image Preload Failure" );

			},
			function handleNotify( event ) {

				//dont set to 100 percent as we gave to wait for worksheets to laod too
				if ( event.percent == 100 ) 
					event.percent = 99;

				$rootScope.percentLoaded = event.percent;

			}
		);

		//
        // On dialog open, scroll to the top of scrollable areas
        //
        $rootScope.$on('ngDialog.opened', function (e, $dialog) {
            $dialog.find('.scrollable').scrollTop();
        });

	}

})();
