var mongoose = require("mongoose");  //  �������û����
var Schema = mongoose.Schema;    //  ����ģ��
var dbName = "lusssn";
var db = mongoose.createConnection("localhost", dbName);	//  �������ݿ�����
var Log = require('./log4js').logger;

db.on("error",console.error.bind(console,"���Ӵ���:"));
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
}); //  ������һ���µ�ģ�ͣ����Ǵ�ģʽ��δ��Users�����й���

/* 
 * [statics]�����û��ǳƼ���ظ��û� 
 */
UserSchema.statics.checkDupliUser = function(nickname, callback) {
    Log.info("[REGISTER] checkDupliUser");
    this.findOne({nickname: nickname})
        .nor([{status: 2}])
        .exec(callback);
}

var UserModel = db.model('users', UserSchema);

/* 
 * [methods]�����û��ǳƲ�ѯ��ע�����û� 
 */
UserSchema.methods.findUser = function(callback) {
    UserModel.findOne({nickname: this.nickname})
        .nor([{status: 2}])
        .exec(callback);
};
/*
 * [methods]�����û��ǳƸ����û�״̬
 */
UserSchema.methods.updateUserStatus = function(status, callback) {
    var condition = {nickname: this.nickname};
    UserModel.findOneAndUpdate(condition, {status: status})
        .exec(callback);
};

/*
 * [methods]�����û���Ϣ
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
    // �Ȳ�ѯ���ݿ�
    UserModel.checkDupliUser(newUser.nickname, function(err, doc){
        if (err) {
            Log.error("[REGISTER] checkDupliUser Falid: ", err);
            return callback(err);
        } 
        if (doc != null) {
            Log.info("[REGISTER] The nickname: ", newUser.nickname, " has existed");
            return callback(new Error("The nickname has existed"));
        } else {
            // ���ظ��û���������ݱ���
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

exports.UsersModel = db.model("users", UserSchema, "users"); //  ��Users���Ϲ���
