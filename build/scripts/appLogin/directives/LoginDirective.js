loginModule.directive("login", function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function(e) {
				scope.signIn();
			});
		}
	};
});

loginModule.directive("showtrigger", function() {
	return {
		scope: false,
		restrict: 'AE',
		controller: function($scope) {
			
			this.changeShow = function() {
				//$scope.showflag = !$scope.showflag;
				//console.log($scope);
				//console.log("changeShow:" + $scope.showflag);
			};
		}
	}
});

loginModule.directive("register", function() {
	return {	
		restrict: 'AE',
		templateUrl: '/views/tpl/sign_up_tpl.html',
		replace: true,
		//require: '?^showtrigger',
		link: function(scope, element, attrs) {
			/*$("#signUp").bind('click', scope.changeShow);
			$('.register-box').bind('click', scope.changeShow);*/
		}
	};
});