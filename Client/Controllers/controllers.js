angular.module('strateGISApp.controllers', ['ngMaterial', 'ngMessages']).controller('StartUpController',function($http,$scope,$stateParams,$state,SettingService){

    //$http.get('client/settings/app.config.json').then(function(dataRaw) {
	$http.get('/settings/').then(function(dataRaw) {	
		var settings = SettingService.getSettings();
		
		settings.FIdFieldName = dataRaw.data.FIdFieldName;
		settings.GeomFieldName = dataRaw.data.GeomFieldName;
		settings.ServerName = dataRaw.data.ServerName;

		settings.minWeight = dataRaw.data.minWeight;
		settings.maxWeight = dataRaw.data.maxWeight;

		SettingService.setSettings(settings);
	});
	
	$state.go('categories'); //switches to categories, making it the default start page

}).controller('CategoryListController', function($scope, $state, popupService, $window, Category) {
 	
	$scope.categories = Category.get(); //fetch all categories.
	
	$scope.deleteCategory=function(category){
        if(popupService.showPopup('Really delete this?')){
            Category.delete({method: 'delete'}, category, function(){
                $window.location.href='';
            });
        }
    };

}).controller('CategoryViewController',function($http,$scope,$stateParams,Category){

    var result = Category.get({id: $stateParams.categoryId, method: 'id'}, function(myVar){

	var fromJson = angular.fromJson(myVar.recordset);
	$scope.category = fromJson[0];	
	});

}).controller('CategoryCreateController',function($scope,$state,$stateParams,Category){

    $scope.category=new Category();

    $scope.addCategory=function(){
        Category.save({method: "add"}, $scope.category, function(){
            $state.go('categories');
        });
    }

}).controller('CategoryEditController',function($scope,$state,$stateParams,Category){

    $scope.updateCategory=function(){
        Category.update({method: 'update'}, $scope.category, function(){
            $state.go('categories');
        });
    };

    $scope.loadCategory = function() { //Issues a GET request to /category/:id to get a category to update
    var result = Category.get({id: $stateParams.categoryId, method: 'id'}, function(myVar){
	var fromJson = angular.fromJson(myVar.recordset);
	$scope.category = fromJson[0];	
	});
	//$scope.category = Category.get({ categoryId: $stateParams.id });
  };

  $scope.loadCategory(); // Load a category which can be edited on UI
}).controller('RuleListController', function($scope, $state, popupService, $window, Rule) {
 
	$scope.rules = Rule.get(); //fetch all categories.
	
	$scope.deleteRule=function(rule){
		//console.dir($scope.rule);
		//console.dir(rule);
        if(popupService.showPopup('Really delete this?')){
            Rule.delete({method: 'delete'}, rule, function(){
                $window.location.href='';
            });
        }
    };

}).controller('RuleViewController',function($http,$scope,$stateParams,Rule){

    var result = Rule.get({id: $stateParams.ruleId, method: 'id'}, function(myVar){

	var fromJson = angular.fromJson(myVar.recordset);
	$scope.rule = fromJson[0];	
	});

}).controller('RuleCreateController',function($scope,$state,$stateParams,Rule){

    $scope.rule=new Rule();

    $scope.addRule=function(){
        Rule.save({method: "add"}, $scope.rule, function(){
            $state.go('rules');
        });
    }

}).controller('RuleEditController',function($scope,$state,$stateParams,Rule){

    $scope.updateRule=function(){
        Rule.update({method: 'update'}, $scope.rule, function(){
            $state.go('rules');
        });
    };

    $scope.loadRule = function() { 
    var result = Rule.get({id: $stateParams.ruleId, method: 'id'}, function(myVar){
	var fromJson = angular.fromJson(myVar.recordset);
	$scope.rule = fromJson[0];	
	});

  };

  $scope.loadRule(); // Load a category which can be edited on UI
}).controller('Category_definition_rulesListController', function($scope, $state, popupService, $window, Category_definition_rules) {

	$scope.category_definition_rulesList = Category_definition_rules.get(); //fetch all categories.
	//console.dir($scope.category_definition_rulesList);

	$scope.deleteCategory_definition_rules=function(category_definition_rules){
		//console.dir($scope.rule);
		//console.dir(rule);
        if(popupService.showPopup('Really delete this?')){
            Category_definition_rules.delete({method: 'delete'}, category_definition_rules, function(){
                $window.location.href='';
            });
        }
    };

}).controller('Category_definition_rulesViewController',function($http,$scope,$stateParams,Category_definition_rules){

    var result = Category_definition_rules.get({id: $stateParams.category_definition_rulesId, method: 'id'}, function(myVar){

	var fromJson = angular.fromJson(myVar.recordset);
	//console.dir(fromJson);
	$scope.category_definition_rules = fromJson[0];	
	});

}).controller('Category_definition_rulesCreateController',function($scope,$state,$stateParams,Category_definition_rules, Rule, Category_definition,SettingService){
	console.log(SettingService.getSettings().minWeight);
	console.dir(SettingService.getSettings());
	$scope.minWeight = SettingService.getSettings().minWeight;
	$scope.maxWeight = SettingService.getSettings().maxWeight;
	//$scope.category_definition_rules.rule_argument1 = SettingService.standardWeight;

    $scope.category_definition_rules=new Category_definition_rules();
	$scope.category_definition_rules.rule_argument2 = null;
	$scope.rules = Rule.get();
	$scope.definitions = Category_definition.get();



    $scope.addCategory_definition_rules=function(){
        Category_definition_rules.save({method: "add"}, $scope.category_definition_rules, function(){
            $state.go('category_definition_rulesList');
        });
    }

}).controller('Category_definition_rulesEditController',function($scope,$state,$stateParams,Category_definition_rules, Rule, Category_definition,SettingService){
	$scope.minWeight = SettingService.minWeight;
	$scope.maxWeight = SettingService.maxWeight;

    $scope.updateCategory_definition_rules=function(){
		if($scope.cdrForm.$valid){
			Category_definition_rules.update({method: 'update'}, $scope.category_definition_rules, function(){
				$state.go('category_definition_rulesList');
			});
		}
    };

    $scope.loadCategory_definition_rules = function() { 
		var result = Category_definition_rules.get({id: $stateParams.category_definition_rulesId, method: 'id'}, function(myVar){
		var fromJson = angular.fromJson(myVar.recordset);
		$scope.category_definition_rules = fromJson[0];
		$scope.rules = Rule.get();
		$scope.definitions = Category_definition.get();
	});

	};
	$scope.loadCategory_definition_rules(); // Load a category which can be edited on UI
  
}).controller('Category_definitionListController', function($scope, $state, popupService, $window, Category_definition, Category) {

	//fetch all categories definitions
	$scope.category_definitionList = Category_definition.get(); 

	$scope.deleteCategory_definition=function(category_definition){
        if(popupService.showPopup('Really delete this?')){
            Category_definition.delete({method: 'delete'}, category_definition, function(){
                $window.location.href='';
            });
        }
    };

}).controller('Category_definitionViewController',function($http,$scope,$stateParams,Category_definition){

    var result = Category_definition.get({id: $stateParams.category_definitionId, method: 'id'}, function(myVar){

	var fromJson = angular.fromJson(myVar.recordset);
	$scope.category_definition = fromJson[0];	
	});

}).controller('Category_definitionCreateController',function($scope,$state,$stateParams,Category_definition, Category){

	$scope.categories = Category.get(); //fetch all categories.

    $scope.category_definition=new Category_definition();

    $scope.addCategory_definition=function(){
        Category_definition.save({method: "add"}, $scope.category_definition, function(){
            $state.go('category_definitionList');
        });
    }

}).controller('Category_definitionEditController',function($scope,$state,$stateParams,Category_definition, Category){
    
	$scope.updateCategory_definition=function(){
        Category_definition.update({method: 'update'}, $scope.category_definition, function(){
            $state.go('category_definitionList');
        });
    };

    $scope.loadCategory_definition = function() { 
		var result = Category_definition.get({id: $stateParams.category_definitionId, method: 'id'}, function(myVar){
		var fromJson = angular.fromJson(myVar.recordset);
		$scope.category_definition = fromJson[0];
		$scope.categories = Category.get();
		});

	};
	
	$scope.loadCategory_definition(); // Load a category which can be edited on UI
	
}).controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $http, ServerSetting) {
    $scope.toggleLeft = buildDelayedToggler('left');
	
	$scope.serverSettings = ServerSetting.get();
	
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  }).controller('StoredProceduresController',function($scope,$state,$stateParams,StoredProcedures, SPRunningService){
	
		$scope.running = SPRunningService.getRunning();
		$scope.errorText = ""; // not yet used
		
	
	}).controller('InfoController',function($scope,$state,$stateParams,StoredProcedures,$mdDialog,ServerSetting){
	
		$scope.serverSettings = ServerSetting.get();	
		
	}).controller('StoredProcedureUpdateCategoryController',function($scope,$state,$stateParams,StoredProcedures, Category, $mdDialog, $timeout, SPRunningService){

	$scope.categories = Category.get(); // gets all categories

	var userStateUpdateCategory= new Object();
	$scope.userStateUpdateCategory = userStateUpdateCategory;
	
	
	$scope.executeUpdateCategory = function(){
		//if(cdrForm.$valid){
			SPRunningService.setRunning(true);
			var paramForSp = new Object();
			paramForSp.CategoryName = $scope.userStateUpdateCategory.category_name;
			
			  
			
			StoredProcedures.execute({spName: 'sp_UpdateCategory'}, paramForSp, function(){
				console.log("sp done.");
				SPRunningService.setRunning(false);
				$state.reload(); 
			}, function(){
				console.log("sp failed.");
				SPRunningService.setRunning(false);

				$state.reload(); 
			}
			
			);
			$state.go('storedProcedures');

	}
	
	
}).controller('StoredProcedureUpdateCategoryLayersController',function($scope,$state,$stateParams,StoredProcedures, Category, $mdDialog, SPRunningService){

	$scope.categories = Category.get(); // gets all categories
	$scope.recalculateLayers = false;
	
	var userStateUpdateCategory= new Object();
	$scope.userStateUpdateCategory = userStateUpdateCategory;
	
	$scope.running = true;
	$scope.executeUpdateCategoryLayers = function(){
		SPRunningService.setRunning(true);
		var paramForSp = new Object();
		paramForSp.CategoryName = $scope.userStateUpdateCategory.category_name;
		if($scope.recalculateLayers == true){
			paramForSp.RecalculateLayers = 1;
		}
		else
		{
			paramForSp.RecalculateLayers = 0;
		}
		
		
	
		StoredProcedures.execute({spName: 'sp_UpdateCategoryLayers'}, paramForSp, function(){
			console.log("sp done.");
			SPRunningService.setRunning(false);
			$state.reload(); 
		}, function(){
				console.log("sp failed.");
				SPRunningService.setRunning(false);

				$state.reload(); 
			}
		);
		$state.go('storedProcedures');
		
	}
}).controller('StoredProceduresCheckinNewAnalysisLayerController',function($scope,$state,$stateParams,StoredProcedures, Category, $mdDialog, SettingService, SPRunningService){

	/*
		Checkin new analysis layer. When checked in, geometries is converted to the predefined square grid definition. Please note layer in the database MUST contain ‘geom’, geometry field.
	•	Input 1: the table name for original data in StrateGIS database
	•	Input 2: output tabel name
	*/
	
	this.activated = false;
	$scope.activated = this.activated;
	
	$scope.recalculateLayers = true;
	
	var userStateOriginaldata= '';
	$scope.userStateOriginaldata = userStateOriginaldata;
	
	var userStateOutputTableName= '';
	$scope.userStateOutputTableName = userStateOutputTableName;

	var userStateUpdateCategory= new Object();
	$scope.userStateUpdateCategory = userStateUpdateCategory;

	$scope.categories = Category.get();
	
	$scope.executeCheckinNewAnalysisLayer = function(){
		SPRunningService.setRunning(true);
		var paramForSp = new Object();
		if($scope.recalculateLayers){
			paramForSp.RecalculateFeatures = 1;
		}
		else
		{
			paramForSp.RecalculateFeatures = 0;
		}
		
		paramForSp.OutputTableName = $scope.userStateOutputTableName;
		paramForSp.FeatureClassName =  $scope.userStateOriginaldata;
		paramForSp.FIdFieldName  = SettingService.getSettings().FIdFieldName;
		paramForSp.GeomFieldName = SettingService.getSettings().GeomFieldName;
		paramForSp.categoryId = $scope.userStateUpdateCategory.id;
	
		$state.go('storedProcedures');
	
		StoredProcedures.execute({spName: 'sp_CalculateLayer'}, paramForSp, function(){
			SPRunningService.setRunning(false);
			console.log("sp done.");
			$state.reload(); 			
		}, function(){
				console.log("sp failed.");
				SPRunningService.setRunning(false);

				$state.reload(); 
			}
		);
		
	}
}).controller('StoredProceduresCheckinNewIntersectionLayerController',function($scope,$state,$stateParams,StoredProcedures, Category, $mdDialog, SettingService, SPRunningService){

/*
	Checkin new intersection layer. When checked in, geometries is converted to the predefined square grid definition. Please note layer in the database MUST contain ‘geom’, geometry field and ‘score’ integer field.
	Input 1: name of existing table in SQL Server
	output table name is always input table name + ’_grid’
*/
	
	$scope.recalculateLayers = true;
	
	var userStateTable= '';
	$scope.userStateTable = userStateTable;
	
	$scope.executeCheckinNewIntersectionLayer = function(){
		SPRunningService.setRunning(true);
		var paramForSp = new Object();
		if($scope.recalculateLayers){
			paramForSp.RecalculateFeatures = 1;
		}
		else
		{
			paramForSp.RecalculateFeatures = 0;
		}
		
		paramForSp.OutputTableName = $scope.userStateTable + "_intersect";
		paramForSp.FeatureClassName =  $scope.userStateTable;
		paramForSp.FIdFieldName  = SettingService.getSettings().FIdFieldName;
		paramForSp.GeomFieldName = SettingService.getSettings().GeomFieldName;
	
		$state.go('storedProcedures');
	
		StoredProcedures.execute({spName: 'sp_CalculateLayer'}, paramForSp, function(){
			SPRunningService.setRunning(false);
			console.log("sp done.");
			$state.reload(); 
		}, function(){
				console.log("sp failed.");
				SPRunningService.setRunning(false);

				$state.reload(); 
			}
		);
		
	}
}).controller('StoredProceduresUpdateAllCategoriesController',function($scope,$state,$stateParams,StoredProcedures, $mdDialog, $timeout, SPRunningService){
	
		$scope.executeUpdateAllCategories = function(){
				SPRunningService.setRunning(true);
				var paramForSp = new Object();
				
				StoredProcedures.execute({spName: 'sp_UpdateAllCategories'}, paramForSp, function(){
					console.log("sp done.");
					SPRunningService.setRunning(false);
					$state.reload(); 
				}, function(){
					console.log("sp failed.");
					SPRunningService.setRunning(false);
					$state.reload(); 
				}
				
				);
				$state.go('storedProcedures');
		}
	}).config(function($mdThemingProvider) {
		var geopartnerRedMap = $mdThemingProvider.extendPalette('red', {
		'500': '#D53A0E',
		});
		  
		var geopartnerGreyMap = $mdThemingProvider.extendPalette('grey', {
		'500': '#ECECEC',
		});
	
		$mdThemingProvider.definePalette('geopartnerRed', geopartnerRedMap);
		$mdThemingProvider.definePalette('geopartnerGrey', geopartnerGreyMap);
	
		$mdThemingProvider.theme('default')
			.primaryPalette('geopartnerRed')
			.backgroundPalette('geopartnerGrey');	
	})
;

