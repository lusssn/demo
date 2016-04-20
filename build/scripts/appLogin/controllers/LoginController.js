var loginModule = angular.module("loginModule", []);
loginModule.controller("LoginController", function($scope) {
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
		$.ajax({
			data: {
				nickname: $scope.nickname,
				password: $scope.password
			},
			url: '/sign-in',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if (data.success) {
					var dataObj = data.data;
					for(var key in dataObj) {
						$scope.userInfo[key] = dataObj[key];
					}
					console.log(data.data);
					alert(data.msg);
					//window.location.href = data.redirect;
				} else {
					$(".login-group input").val("");
					alert(data.msg);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
			  alert('error ' + textStatus + " " + errorThrown);  
			}
	    });
	};

	// 注册事件
	$scope.signUp = function() {
		$.ajax({
			data: $scope.userInfo,
			url: '/sign-up',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if (data.success) {
					alert(data.msg);
					window.location.href = data.redirect;
				} else {
					$(".register-group input").val("");
					alert(data.msg);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
			  alert('error: ' + textStatus + " " + errorThrown);  
			}
	    });
	};
})
