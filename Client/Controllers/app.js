angular.module('strateGISApp', ['ui.router', 'ngResource', 'strateGISApp.controllers', 'strateGISApp.services']);

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('categories', { // state for showing all categories
    url: '/',
    templateUrl: 'client/partials/categories.html',
    controller: 'CategoryListController'
  }).state('viewCategory',{
       url: 'category/id/:categoryId',
       templateUrl:'client/partials/category-view.html',	 
       controller:'CategoryViewController'
	}).state('newCategory',{
        url:'/category/add',
        templateUrl:'client/partials/category-add.html',
        controller:'CategoryCreateController'
    }).state('editCategory',{
        url:'/category/:categoryId/edit',
        templateUrl:'client/partials/category-edit.html',
        controller:'CategoryEditController'
    })
}).run(function($state) {
  $state.go('StartUp'); //make a transition to StartUp state when app starts
});

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('StartUp', { // state for showing all rules
    url: '/',
    controller: 'StartUpController'
  });
});

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('rules', { // state for showing all rules
    url: '/',
    templateUrl: 'client/partials/rules.html',
    controller: 'RuleListController'
  }).state('viewRule',{
       url: 'rules/id/:ruleId',
       templateUrl:'client/partials/rule-view.html',	 
       controller:'RuleViewController'
	}).state('newRule',{
        url:'/rules/add',
        templateUrl:'client/partials/rule-add.html',
        controller:'RuleCreateController'
    }).state('editRule',{
        url:'/rules/:ruleId/edit',
        templateUrl:'client/partials/rule-edit.html',
        controller:'RuleEditController'
    });
});

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('category_definition_rulesList', { // state for showing category_definition_rules
    url: '/',
    templateUrl: 'client/partials/category_definition_rules.html',
    controller: 'Category_definition_rulesListController'
  }).state('viewCategory_definition_rules',{
       url: 'category_definition_rules/id/:category_definition_rulesId',
       templateUrl:'client/partials/category_definition_rules-view.html',	 
       controller:'Category_definition_rulesViewController'
	}).state('newCategory_definition_rules',{
        url:'/category_definition_rules/add',
        templateUrl:'client/partials/category_definition_rules-add.html',
        controller:'Category_definition_rulesCreateController'
    }).state('editCategory_definition_rules',{
        url:'/category_definition_rules/:category_definition_rulesId/edit',
        templateUrl:'client/partials/category_definition_rules-edit.html',
        controller:'Category_definition_rulesEditController'
    });
});

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('category_definitionList', { // state for showing category_definition_rules
    url: '/',
    templateUrl: 'client/partials/category_definition.html',
    controller: 'Category_definitionListController'
  }).state('viewCategory_definition',{
       url: 'category_definition/id/:category_definitionId',
       templateUrl:'client/partials/category_definition-view.html',	 
       controller:'Category_definitionViewController'
	}).state('newCategory_definition',{
        url:'/category_definition/add',
        templateUrl:'client/partials/category_definition-add.html',
        controller:'Category_definitionCreateController'
    }).state('editCategory_definition',{
        url:'/category_definition/:category_definitionId/edit',
        templateUrl:'client/partials/category_definition-edit.html',
        controller:'Category_definitionEditController'
    });
});

angular.module('strateGISApp').config(function($stateProvider) {
  $stateProvider.state('storedProcedures', { // Stored procedure state
    templateUrl: 'client/partials/storedProcedures.html',
    controller: 'StoredProceduresController'
  }).state('spUpdateCategoryLayers', { // Stored procedure state
    templateUrl: 'client/partials/spUpdateCategoryLayers.html',
    controller: 'StoredProcedureUpdateCategoryLayersController'
  }).state('spUpdateCategory', { // Stored procedure state
    templateUrl: 'client/partials/spUpdateCategory.html',
    controller: 'StoredProcedureUpdateCategoryController'
  }).state('spCheckinNewAnalysisLayer', { // Stored procedure state
    templateUrl: 'client/partials/spCheckinNewAnalysisLayer.html',
    controller: 'StoredProceduresCheckinNewAnalysisLayerController'
  }).state('spCheckinNewIntersectionLayer', { // Stored procedure state
    templateUrl: 'client/partials/spCheckinNewIntersectionLayer.html',
    controller: 'StoredProceduresCheckinNewIntersectionLayerController'
  });
});