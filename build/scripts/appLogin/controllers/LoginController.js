var loginModule = angular.module("loginModule", ['ngCookies']);

loginModule.controller("LoginController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies) {
	$scope.userInfo = {
		uid: 0,
		nickname: "",
		password: "",
		name: "",
		birthday: "",
		sex: 0,
		e_mail: "",
		status: 0
	};
	$scope.showflag = false;
	$scope.changeShow = function($event) {
		if ($event.target.id == "registerCancel" || $event.target == $event.currentTarget) {
		    $scope.showflag = !$scope.showflag;
		    if ($event.target.id == "registerCancel") {
		    	$scope.refresh();
		    }
		}
		return false;
	};

	// 用户信息重置
	$scope.refresh = function() {
		$scope.userInfo = {
			uid: 0,
			nickname: "",
			password: "",
			name: "",
			birthday: "",
			sex: 0,
			e_mail: "",
			status: 0
		};
	};

	// 登录事件
	$scope.signIn = function() {
		$http({
			method: "POST",
			url: "/login/sign-in",
			data: {
				nickname: $scope.nickname,
				password: $scope.password
			},
			responseType: "json"
		}).success(function(data) {
			if (data.success) {
				var dataObj = data.data;
				// 回填用户信息
				for(var key in dataObj) {
					$scope.userInfo[key] = dataObj[key];
				}
				$cookies.put("nickname", $scope.userInfo.nickname);
				alert(data.msg);
				if (data.redirect) {
					window.location.href = data.redirect;
				}
			} else {
				$(".login-group input").val("");
				alert(data.msg);
			}
		}).error(function(data) {
			alert('error ' + data);
		});
	};

	// 注册事件
	$scope.signUp = function() {
		$http({
			method: "POST",
			url: "/login/sign-up",
			data: $scope.userInfo,
			responseType: "json"
		}).success(function(data) {
			if (data.success) {
				alert(data.msg);
				window.location.href = data.redirect;
			} else {
				$(".register-group input").val("");
				alert(data.msg);
			}
		}).error(function(data) {
			alert('error ' + data);
		});
	};

	// 退出登录事件
	$scope.logout = function() {
		if (!$cookies.get("nickname")) {
			alert("Login has expired");
			window.location.href = '/';
		} 

		$http({
			method: "POST",
			url: "/login/logout",
			data: {nickname: $cookies.get("nickname")},
			responseType: "json"
		}).success(function(data) {
			if (data.success) {
				if (data.redirect) {
					$cookies.remove("nickname")
					window.location.href = data.redirect;
				}
			} else {
				alert("logout failed: " + data.msg);
			}
		}).error(function(data) {
			alert('error ' + data);
		});
	};
}]);
