var path = require('path');
var UsersModel = require('../models/Users').UsersModel;
var Log = require('../models/log4js').logger;

// 0-已退出 1-已登录 2-已注销
var accountStatus = 0;

exports.signIn = function(req, res) {
    Log.info("ready login");
    var user = new UsersModel({
        nickname: req.body.nickname, 
        password: req.body.password
    });

    user.findUser(function(err, doc) {
        if (doc != null) {
            switch(doc.status) {
                case 0:
                    Log.info("uid: " + doc.uid + " login success");
                    accountStatus = 1;
                    res.json({success: true,data: doc,msg: '登录成功',redirect: '/home'});
                    break;
                case 1:
                    Log.info("uid: " + doc.uid + " login success");
                    res.json({success: true,msg: '已经登录',redirect: '/home'});
                    break;
                case 2:
                    Log.info("uid: " + doc.uid + " login failed");
                    res.json({success: false,msg: '用户名或密码错误'});
                    break;
                default:
                    Log.info("uid: " + doc.uid + " login failed");
                    res.json({success: false,msg: '未知错误'});
            };
        } else {
            Log.info("nickname: " + user.nickname + " login failed");
            res.json({success: false,msg: '未注册的用户'});
        }
    });
};

exports.signUp = function(req, res) {
    Log.info("[REGISTER] ready register");
    var user = new UsersModel({
        nickname: req.body.nickname, 
        password: req.body.password,
        name: req.body.name, 
        birthday: req.body.birthday,
        sex: req.body.sex, 
        e_mail: req.body.e_mail,
        status: req.body.status
    });

    user.addUser(function(err) {
        if (err) {
            res.json({success: false, msg: err});
        } else {
            accountStatus = 1;
            res.json({success: true, msg: 'register succeed ^_^',redirect: '/home'});
        }
    });

    Log.info("[REGISTER] register end");
};

exports.getAccountStatus = function() {
    return accountStatus;
};