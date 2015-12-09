var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var dbName = "lusssn";
var db = mongoose.createConnection("localhost", dbName);	//  创建数据库连接
var LOG = require('./log4js').logger;

db.on("error",console.error.bind(console,"连接错误:"));
db.once("open",function(){
	LOG.info("MongoDB connect to '" + dbName + "' successful");
});

var UserSchema = new Schema({
    uid: Number,
    password: String,
    nickname: String,
    name: String,
    birthday: String,
    sex: Number,
    e_mail: String,
    box_id: Number,
    status: Number
}); //  定义了一个新的模型，但是此模式还未和Users集合有关联

UserSchema.methods.findUser = function(cb) {
	return this.model("users").find({nickname:this.nickname},cb);
};

exports.UsersModel = db.model("users", UserSchema, "Users"); //  与Users集合关联
