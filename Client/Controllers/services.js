angular.module('strateGISApp.services', []).factory('Category', function($resource) {
    return $resource('/category/:method/:id', { id: '@categoryId', method: '@method' }, {
    update: {
      method: 'POST',
	  //headers :{'Content-Type':'application/x-www-form-urlencoded'}
        },
	save: {
      method: 'POST',
	  
        },
	delete: {
    method: 'POST',
	  
        },
	'query': {
		method: 'GET', 
		isArray: true,
		datatype: "json"
		//transformResponse: function (data) {return {list: angular.fromJson(data)} }
		},
	get: {
			method: 'GET',
			isArray: false,
			datatype: "json"
			
		}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
}).factory('Rule', function($resource) {
	return $resource('/rules/:method/:id', { id: '@ruleId', method: '@method' }, {
    update: {
      method: 'POST',
	  //headers :{'Content-Type':'application/x-www-form-urlencoded'}
        },
	save: {
      method: 'POST',
	  
        },
	delete: {
    method: 'POST',
	  
        },
	'query': {
		method: 'GET', 
		isArray: true,
		datatype: "json"
		//transformResponse: function (data) {return {list: angular.fromJson(data)} }
		},
	get: {
			method: 'GET',
			isArray: false,
			datatype: "json"
			
		}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
	
}).factory('Category_definition_rules', function($resource) {
	return $resource('/category_definition_rules/:method/:id', { id: '@category_definition_rulesId', method: '@method' }, {
    update: {
      method: 'POST',
	  //headers :{'Content-Type':'application/x-www-form-urlencoded'}
        },
	save: {
      method: 'POST',
	  
        },
	delete: {
    method: 'POST',
	  
        },
	'query': {
		method: 'GET', 
		isArray: true,
		datatype: "json"
		//transformResponse: function (data) {return {list: angular.fromJson(data)} }
		},
	get: {
			method: 'GET',
			isArray: false,
			datatype: "json"
			
		}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
	
}).factory('Category_definition', function($resource) {
	return $resource('/category_definition/:method/:id', { id: '@category_definitionId', method: '@method' }, {
    update: {
      method: 'POST',
	  //headers :{'Content-Type':'application/x-www-form-urlencoded'}
        },
	save: {
      method: 'POST',
	  
        },
	delete: {
    method: 'POST',
	  
        },
	'query': {
		method: 'GET', 
		isArray: true,
		datatype: "json"
		//transformResponse: function (data) {return {list: angular.fromJson(data)} }
		},
	get: {
			method: 'GET',
			isArray: false,
			datatype: "json"
			
		}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
	
}).factory('StoredProcedures', function($resource) {
	return $resource('/sp/:spName', { spName: '@spName' }, {
    execute: {
      method: 'POST',
	  //headers :{'Content-Type':'application/x-www-form-urlencoded'}
        }
    });
}).factory('ServerSetting', function($resource) {
	return $resource('/settings', {}, {
	get: {
			method: 'GET',
			isArray: false,
			datatype: "json"
			
		}
    });
}).service('SPRunningService',function(){
		var running = false;
		
		return {
            getRunning: function () {
                return running;
            },
            setRunning: function(value) {
                running = value;
            }
        };

}).service('SettingService',function(){
	var settings = new Object();
	
	return {
		getSettings: function () {
			return settings;
		},
		setSettings: function(value) {
			settings = value;
		}
	};

});
	
;

    