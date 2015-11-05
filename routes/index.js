var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/users').users;
//var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/lusssn');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("render index...");
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
                res.json({msg: '验证成功'});
                res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.uid + ": login failed in " + new Date());
                res.json({msg: '用户名或密码错误'});
            }
        });
    })(query_doc);
});

/*logout*/
router.get('/logout', function(req, res) {
    res.render('logout', { title: 'logout' });
});

module.exports = router;
