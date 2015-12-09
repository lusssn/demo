function Index() {
	Index.prototype.init();
}

$.extend(Index.prototype, {
	init : function() {
		this.bindEvent.loginEvent.call(this);
		this.bindEvent.registerWindow.call(this);
	},
	bindEvent : {
		loginEvent : function() {
			$("#loginBtn").unbind("click").click(function(){
				var params = {
					'nickname': $("#nickname").val(),
					'password': $("#password").val()
			  	};

			    $.ajax({
					data: params,
					url: '/login',
					type: 'post',
					dataType: 'json',
					success: function(data){
						if (data.success) {
							alert(data.redirect);
							window.location.href = data.redirect;
						} else {
							$(".login-box input").val("");
							alert(data.msg);
						}
					},
					error: function(jqXHR, textStatus, errorThrown){
					  alert('error ' + textStatus + " " + errorThrown);  
					}
			    });
			});
		},
		registerWindow : function() {
			$("#skipRegister").unbind("click").click(function(){
				$(".login-box").css("display","none");
				$(".register-box").css("display","block");
				$("#skipLogin").css("display","block");
				$("#skipRegister").css("display","none");
			});
			$("#skipLogin").unbind("click").click(function(){
				$(".register-box").css("display","none");
				$(".login-box").css("display","block");
				$("#skipRegister").css("display","block");
				$("#skipLogin").css("display","none");
			});
		},
		registerEvent : function() {
			
		}
	}
});
