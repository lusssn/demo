var path = require('path');

exports.index = function (req, res) {
    var html = path.normalize(__dirname + '/../build/views/index.html');
    res.sendfile(html);
};