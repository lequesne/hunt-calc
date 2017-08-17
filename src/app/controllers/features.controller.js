(function() {
	'use strict';

	angular
		.module('huntleeCalculator')
		.controller('FeaturesController', FeaturesController);

	/** @ngInject */
	function FeaturesController($log, $rootScope, $scope, $timeout, $interval, $state, $stateParams) {

		//
		// Set the currently set house from the state paramater id in the scope
		//
		$scope.house = $rootScope.houseData[$stateParams.index - 1];

		//
		// House feature data/model
		//
		$scope.houseFeatures = [{
			id: 'Energy',
			icon: 'icon-energy',
			title: 'Community Energy Network',
			description: "Every household will receive free solar panels for the roof of their home.  These will contribute to the community energy network and their own home’s secure power supply. Maintenance and warranty for solar power will be managed by your local energy utility, Huntlee Plus.",
			active: true,
		}, {
			id: 'EarthSource',
			icon: 'icon-geo',
			title: 'EarthSource Heat Exchange',
			description: "Channel the earth’s ambient temperature to cut big dollars from your energy bill. With EarthSource, your heating and cooling will be 50-70% more efficient than traditional air conditioning, which is one of the biggest energy expenses in your home. The hotter or colder the outside temperature gets,  the harder your air conditioner has to work, resulting in a more expensive energy bill.  EarthSource turns this equation on its head, tapping into the natural temperature of the earth beneath your home with geothermal tehnology.",
			active: false,
			disableActive: ['Smart Air', 'Smart Water'], //These are the ids of features that should be disabled when this is active
		}, {
			id: 'Smart Air',
			icon: 'icon-air',
			title: 'Smart Air Conditioning',
			description: "Did you know that an air conditioner has to work much harder to cool a house that’s already hot? Huntlee Plus can manage this for you remotely so when you get home, your house is already the temperature you want it to be. If you opt in to our Smart Air plan, you’ll be saving money on your bills and keep the temperature you want in your home all year around.",
			breakout: 'Choosing this option unlocks an energy rate discount! Owners will also benefit from an annual cashback offer for making their houses more efficient.',
			active: true,
			disableActiveMsg: 'Congratulations, EarthSource already gives you all the benefits of Smart Air.'
		}, {
			id: 'Smart Water',
			icon: 'icon-water',
			title: 'Smart Water',
			description: "Huntlee Plus can heat your water when energy prices are their lowest and there is low demand for energy from others. This is energy smart and saves you money on your bills and has a smaller environmental footprint. Just remember, if you choose this, you will still have all the hot water you want when you need it.",
			breakout: 'You’re free to choose gas instead, but Huntlee Plus offers lower power bills and cashback payments for owners when Smart Water is selected.',
			active: true,
			disableActiveMsg: 'Congratulations, EarthSource already gives you all the benefits of Smart Water.'
		}, {
			id: 'Electric Car',
			icon: 'icon-plug',
			title: 'Electric Vehicle Charging',
			description: "Rid yourself of the petrol pump! Huntlee Plus will reward you with a lower rate for charging an electric vehicle in offpeak periods, e.g. when it’s parked in your garage overnight. No problem if you need to charge it on demand – there’s a boost option. And of course, you’ll save up to $1,000 on the fuel costs of running a car.",
			active: false
		}];


		//
		// TRACK FEATURE CONFIGURATION
		//
		$scope.trackHouseFeatures = function(action, callback) {

			//create label object and add curent house
			var labelObject = {
				"House": $scope.house.name
			}

			//add feature config
			angular.forEach($scope.houseFeatures, function(feature, i) {
				labelObject["" + feature.id + ""] = feature.active;
			});

			$rootScope.gaEvent({
				category: 'House Configuration',
				action: action ? action : 'Session Ended',
				label: JSON.stringify(labelObject),
				callback: callback
			});
		}

		//
		// EXPIRE SESSION FUNCTIONALITY
		// 
		//
		var expireSessionDelay,
			expireSessionDelayTime = 160000;

		function expireSessionTimeout() {
			expireSessionDelay = $timeout(function() {
				//expire session
				$scope.trackHouseFeatures('Session Timeout', function() {
					window.location.href = 'http://' + window.location.host + window.location.pathname;
				});
			}, expireSessionDelayTime);
		}
		expireSessionTimeout();
		//on interaction reset the back to start delay
		angular.element('html').bind('touchstart mousedown', function() {
			$timeout.cancel(expireSessionDelay);
			expireSessionTimeout();
		});


		//
		// Set selected feature (tab active states)
		//
		$scope.setSelectedFeature = function(selectedFeature) {

				$timeout(function() {

					//set selected feature id in scope to be used to match overlays etc
					$scope.selectedFeature = selectedFeature;

					angular.forEach($scope.houseFeatures, function(feature, i) {

						feature.selected = false;

						if (feature.id == selectedFeature.id) {
							feature.selected = true;
						}

					});

				});

			}
			//set default selected feature/tab
		$scope.setSelectedFeature($scope.houseFeatures[0]);


		//
		// HELPER FUNCTIONA
		//
		function boolean(val) {
			val = val.toLowerCase();
			if (val === 'true') {
				return true;
			} else {
				return false;
			}
		}

		function cleanString(string) {
			return string.replace('$', '').replace(/^\s+|\s+$/g, '').replace('-', '').replace(',', '').replace('%', '');
		}

		//
		// Main calculation (sets variables and results in scope)
		//
		$scope.calculateSavings = function(currentFeatures) {
			$log.debug('calculate!');

			var isMatch = false;

			//iterate over each row to match logic
			angular.forEach($scope.house.worksheet, function(row, i) {

				//try to match row from spreadsheet logic against currently set features
				if (boolean(row['gsx$energy'].$t) == currentFeatures[0] &&
					boolean(row['gsx$earthsource'].$t) == currentFeatures[1] &&
					boolean(row['gsx$smartair'].$t) == currentFeatures[2] &&
					boolean(row['gsx$smartwater'].$t) == currentFeatures[3] &&
					boolean(row['gsx$electriccar'].$t) == currentFeatures[4]) {

					$timeout(function() {
						$rootScope.annualSavings = cleanString(row['gsx$annualsavings'].$t) ? cleanString(row['gsx$annualsavings'].$t) : 0;
						$rootScope.annualCashback = cleanString(row['gsx$annualcasback'].$t) ? cleanString(row['gsx$annualcasback'].$t) : 0;
						$rootScope.lapsAroundWorld = cleanString(row['gsx$lapsaroundworld'].$t) ? cleanString(row['gsx$lapsaroundworld'].$t) : 0;
						$rootScope.tonnesOfCo2Saved = cleanString(row['gsx$tonnesofco2saved'].$t) ? cleanString(row['gsx$tonnesofco2saved'].$t) : 0;
						//$rootScope.vandalPercent = cleanString( row['gsx$vandalpercent'].$t ) ? cleanString( row['gsx$vandalpercent'].$t ) : 0;
						$rootScope.vandalPercent = parseInt(cleanString(row['gsx$vandalpercent'].$t)) / 100 * 90;

					});
					isMatch = true;
				}

			});

			//if no match for active options found in spreadsheet
			if (!isMatch) {
				$timeout(function() {
					$rootScope.annualSavings = 'NIL';
					$rootScope.annualCashback = 'NIL';
					$rootScope.lapsAroundWorld = 'NIL';
					$rootScope.tonnesOfCo2Saved = 'NIL';
					$rootScope.vandalPercent = 'NIL';
				});
			}

		}



		//start tests

		// $scope.combinations = [];

		// function arraysEqual(arr1, arr2) {
		//     if(arr1.length !== arr2.length)
		//         return false;
		//     for(var i = arr1.length; i--;) {
		//         if(arr1[i] !== arr2[i])
		//             return false;
		//     }

		//     return true;
		// }

		// function isArrayInArray( testArray, parentArray ){
		// 	var result = false;
		// 	angular.forEach( parentArray, function( arrayInParent, i ){
		// 		//iterate over parent array
		// 		if ( arraysEqual( testArray, arrayInParent ) ) {
		// 			result = true;
		// 		}
		// 	});
		// 	return result;
		// }

		//end tests


		//
		// PROCESS THE FEATURE AND HOUSE DATA
		//
		$scope.processModelChange = function() {
			//disable/enable dependant disableActive features
			angular.forEach($scope.houseFeatures, function(feature, i) {

				//if feature has depenencies
				if (feature.disableActive) {

					//iterate over any features in the disableActive array to enable/disable
					angular.forEach(feature.disableActive, function(disableId, i) {

						//find feature in houseFeatures with matching id to disabled id
						angular.forEach($scope.houseFeatures, function(matchingFeature, i) {

							if (matchingFeature.id == disableId) {

								//if parent feature is active set each disableActive ids to disabled
								if (feature.active) {
									//set disabled state
									matchingFeature.disabled = true;
									//turn off feature
									matchingFeature.active = false;
								} else {
									//remove disabled state
									matchingFeature.disabled = false;
								}

							}

						});

					});

				}

			});

			//build set of logic to test
			var testCombination = [];
			angular.forEach($scope.houseFeatures, function(feature, i) {
				testCombination.push(feature.active);
			});

			//run calculation function
			$scope.calculateSavings(testCombination);

			//start tests

			// //if test combination is not already saved then add to possible combination
			// if ( !isArrayInArray( testCombination, $scope.combinations ) ) {
			// 	$scope.combinations.push( testCombination );
			// }

			// console.log($scope.combinations);
			// console.log($scope.combinations.length);

			//end tests

			//$log.debug( $scope.houseFeatures );
		}


		//watch function for house data change (new worksheet data being injected)
		$rootScope.$on('houseWorksheetsLoaded', $scope.processModelChange);
		//watch function for any changes in the features (active/inactive etc)
		$scope.$watch('houseFeatures', $scope.processModelChange, true);

		//scope on destroy event
		$scope.$on('$destroy', function() {

			//clear bindings
			$('html').off();

			if (expireSessionDelay)
				$timeout.cancel(expireSessionDelay);
		});

	}

})();