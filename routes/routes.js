var index = require('./index');
var login = require('./login');
var home = require('./home');

module.exports = function(app, router) {
	app.get('/', function(req, res, next) {
		// 若已登录则跳转至主页面
		if (login.getAccountStatus() == 1) {
			res.redirect('/home');
		} else {
			res.redirect('/login');
		}
	});

	app.get('/login', function(req, res, next) {
		// 若已登录则跳转至主页面
		if (login.getAccountStatus() == 1) {
			res.redirect('/home');
		} else {
			index.index(req, res);
		}
	});

	// 主界面
    router.get('/', function(req, res) {
    	if (login.getAccountStatus() == 1) {
    		home.index(req, res);
    	} else {
    		res.redirect('/login');
    	}
    });

    // 登录
    router.post('/sign-in', function(req, res) {
    	login.signIn(req, res);
    });
    // 注册
    router.post('/sign-up', login.signUp);

    app.use('/login', router);
	app.use('/home', router);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

    // error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};