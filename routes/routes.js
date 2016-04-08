var index = require('./index');
var login = require('./login');

module.exports = function (app) {
    app.get('/', index.index);
    app.get('/login', login.index);
    app.post('/sign-in', login.signIn);
};