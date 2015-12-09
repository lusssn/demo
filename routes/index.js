var express = require('express');
var router = express.Router();
var UsersModel = require('../models/Users').UsersModel;
var LOG = require('../models/log4js').logger;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/*login*/
router.post('/login', function(req, res) {
    var user = new UsersModel({
        nickname: req.body.uid, 
        password: req.body.password
    });

    user.findUser(function(err, doc){
        doc = doc[0];
        if (doc != null) {
            switch(doc.status) {
                case 0:
                    LOG.info("uid: " + doc.uid + " login success");
                    res.json({success: true,msg: '登录成功',redirect: '/homepage'});
                    break;
                case 1:
                    LOG.info("uid: " + doc.uid + " login success");
                    res.json({success: true,msg: '已经登录',redirect: '/homepage'});
                    break;
                case 2:
                    LOG.info("uid: " + doc.uid + " login failed");
                    res.json({success: false,msg: '用户名或密码错误'});
                    break;
                default:
                    LOG.info("uid: " + doc.uid + " login failed");
                    res.json({success: false,msg: '未知错误'});
            };
        } else {
            LOG.info("nickname: " + user.nickname + " login failed");
                    res.json({success: false,msg: '未注册的用户'});
        }
    });
});

/*register*/
router.post('/register', function(req, res) {

});

router.get('/homepage', function(req, res) {
    res.render('homepage',{ title: 'homepage'});
});

/*logout*/
router.get('/logout', function(req, res) {
    res.render('logout', { title: 'logout' });
});

module.exports = router;
