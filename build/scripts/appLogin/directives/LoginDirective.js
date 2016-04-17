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

loginModule.directive("register", function() {
	return {
		restrict: 'AE',
		templateUrl: '/views/tpl/sign_up_tpl.html',
		replace: true/*,
		link: function(scope, element, attrs) {
			$("#signUp").bind('click', function(e) {
				scope.flag = true;
				console.log(scope);
			});
			$('.register-box').bind('click', function(e) {
				scope.changeShow();
				console.log(scope);
			});
		}*/
	};
});