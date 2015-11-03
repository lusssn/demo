var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/users').users;
//var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/lusssn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'lsn\'s demo' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/*logout*/
router.get('/logout', function(req, res) {
      res.render('logout', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {uid: req.body.uid, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.uid + ": login success in " + new Date());
                res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.uid + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});
 
router.get('/test', function(req, res) {
    console.log(req.body);
    if (req.body.test == 1) {
        res.json({title: 'success'});
    } else
        res.json({title: 'failed'});
});

module.exports = router;
