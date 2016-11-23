//查询
function checkDetail(whichItem) {

	var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
	var itemID = whichItem.getAttribute("id");
	var adminID = document.getElementById('AdminAccount').value;
	var adminPassword = document.getElementById('AdminPassword').value;
	var formData = new FormData(); 
	formData.append("checkType",itemID);
	formData.append("adminID",adminID);
	formData.append("adminPassword",adminPassword);

	if (adminID.length <= 0 || adminPassword.length <=0) {

		activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>请输入管理员账号和密码</div>";
		return;
	}

	var callback = function(data){
		var dataSource = JSON.parse(data);
		activeButtonItem.innerHTML = '';

		console.log("result:"+dataSource);
		if (dataSource.length <= 0 || !dataSource.length) {
			activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>" + dataSource.message + "</div>";
			return;
		}
		
		//查询服务结果
		if (itemID == "checkService") {
			for (var i = 0; i < dataSource.length; i++) {
				var item = dataSource[i];
				activeButtonItem.innerHTML = activeButtonItem.innerHTML + "<div class='panel panel-success'><div class='panel-heading'><h3 class='panel-title'>" + item.name + "</h3></div><div class='panel-body'>" + item.cardType + ": " + item.cardNumber + "<br>" + item.phoneType + ": " + item.phoneNumber + "<br>" + "IMEI: " + item.IMEINumber + "<br>" + "服务卡号: " + item.serviceCardNumber + "<br>" + "激活密码: " + item.activePassword + "<img src=" + item.picturePath + " width='100%' class='img-rounded'>" + "</div> </div>";
			}
		}
		
		//查询理赔结果
		if (itemID == "checkClaim") {

			for (var i = 0; i < dataSource.length; i++) {
				var item = dataSource[i];
				activeButtonItem.innerHTML = activeButtonItem.innerHTML + "<div class='panel panel-success'><div class='panel-heading'><h3 class='panel-title'>" + item.phoneNumber + "</h3></div><div class='panel-body'>" + "碎屏文字描述: " + item.discription + "<br>" + "<img src=" + item.picturePaths[0] + " width='100%' class='img-rounded'>" + "<br>" + "<img src=" + item.picturePaths[1] + " width='100%' class='img-rounded'>" + "<br>" + "<img src=" + item.picturePaths[2] + " width='100%' class='img-rounded'>" + "</div> </div>";
			}
			
		}
	};
	ajaxRequest(formData,callback);
}

function ajaxRequest(requestData,callback){

	$.ajax({
		url:"http://0.0.0.0:8081/managementCheck",
		type:"post",
		data:requestData,
		processData:false,
		contentType:false,
		success:function(successData){
			callback(successData);
		},
		error:function(e){
			var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
			activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>查询数据失败</div>"
		}
	});
}