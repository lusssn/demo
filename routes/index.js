var path = require('path');
exports.index = function (req, res) {
    var html = path.normalize(__dirname + '/../build/index.html');
    res.sendfile(html);
};