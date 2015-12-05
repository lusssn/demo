var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型

var userScheMa = new Schema({
    uid: Number,
    password: String,
    nickname: String,
    name: String,
    birthday: String,
    sex: Number,
    e_mail: String,
    box_id: Number,
    status: Number
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

exports.users = mongoose.model('users', userScheMa); //  与users集合关联