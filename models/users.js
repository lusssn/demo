var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var dbName = "lusssn";
var db = mongoose.createConnection("localhost", dbName);	//  创建数据库连接
var Log = require('./log4js').logger;

db.on("error",console.error.bind(console,"连接错误:"));
db.once("open",function(){
	Log.info("MongoDB connect to '" + dbName + "' successful");
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

/* 
 * [statics]根据用户昵称检查重复用户 
 */
UserSchema.statics.checkDupliUser = function(nickname, callback) {
    Log.info("[REGISTER] checkDupliUser");
    this.findOne({nickname: nickname})
        .nor([{status: 2}])
        .exec(callback);
}

var UserModel = db.model('users', UserSchema);

/* 
 * [methods]根据用户昵称查询非注销的用户 
 */
UserSchema.methods.findUser = function(callback) {
    UserModel.findOne({nickname: this.nickname})
        .nor([{status: 2}])
        .exec(callback);
};
/*
 * [methods]根据用户昵称更新用户状态
 */
UserSchema.methods.updateUserStatus = function(status, callback) {
    var condition = {nickname: this.nickname};
    UserModel.findOneAndUpdate(condition, {status: status})
        .exec(callback);
};

/*
 * [methods]新增用户信息
 */
UserSchema.methods.addUser = function(callback) {
    var newUser = new UserModel();
    newUser.nickname = this.nickname;
    newUser.password = this.password;
    newUser.name = this.name;
    newUser.birthday = this.birthday;
    newUser.sex = this.sex;
    newUser.e_mail = this.e_mail;
    newUser.status = this.status;
    Log.info("[REGISTER] ready checkDupliUser");
    // 先查询数据库
    UserModel.checkDupliUser(newUser.nickname, function(err, doc){
        if (err) {
            Log.error("[REGISTER] checkDupliUser Falid: ", err);
            return callback(err);
        } 
        if (doc != null) {
            Log.info("[REGISTER] The nickname: ", newUser.nickname, " has existed");
            return callback(new Error("The nickname has existed"));
        } else {
            // 无重复用户则进行数据保存
            Log.info("[REGISTER] ready save");
            newUser.save(function(err){
                Log.info("[REGISTER] save end");
                if(err){
                    Log.info("[REGISTER] User Register Faild: ", err);
                    return callback(err);
                }
            }, callback);
        }

    });
    Log.info("[REGISTER] checkDupliUser end");
};

exports.UsersModel = db.model("users", UserSchema, "users"); //  与Users集合关联
