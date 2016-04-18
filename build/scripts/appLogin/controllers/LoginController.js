var loginModule = angular.module("loginModule", []);
loginModule.controller("LoginController", function($scope) {
	$scope.userInfo = {
		nickname: "",
		password: ""
	};
	$scope.showflag = false;
	$scope.changeShow = function($event) {
		if ($event.target.id == "registerCancel" || $event.target == $event.currentTarget) {
		    $scope.showflag = !$scope.showflag;
		}
		return false;
	};

	// 登录事件
	$scope.signIn = function() {
		console.log($scope.userInfo);
		$.ajax({
			data: $scope.userInfo,
			url: '/sign-in',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if (data.success) {
					alert(data.redirect);
					window.location.href = data.redirect;
				} else {
					$(".login-box input").val("");
					alert(data.msg);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
			  alert('error ' + textStatus + " " + errorThrown);  
			}
	    });
	};
})
