/* app模型定义和路由配置文件 */
var loginModule = angular.module("loginModule", [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/login.html',
				controller: 'scripts/appLogin/controllers/LoginController.js'
			})
	}]);
