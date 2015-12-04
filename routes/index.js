var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/users').users;
//var bodyParser = require('body-parser');
var LOG = require('./log4js').logger;
mongoose.connect('mongodb://localhost/lusssn');

/* GET home page. */
router.get('/', function(req, res, next) {
    LOG.info("log test");
    res.render('index');
});

/*login*/
router.post('/login', function(req, res) {
    var query_doc = {
        uid: req.body.uid, 
        password: req.body.password
    };
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.uid + ": login success in " + new Date());
                res.json({success: true,msg: '登录成功',redirect: '/homepage'});
            }else{
                console.log(query_doc.uid + ": login failed in " + new Date());
                res.json({success: false,msg: '用户名或密码错误'});
            }
        });
    })(query_doc);
});

router.get('/homepage', function(req, res){
    res.render('homepage',{ title: 'homepage'});
});

/*logout*/
router.get('/logout', function(req, res) {
    res.render('logout', { title: 'logout' });
});

module.exports = router;
