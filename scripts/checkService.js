// checkService
function checkDetail(button){

	var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
	var phoneNumber = document.getElementById('phoneNumber').value;
	var IMEI = document.getElementById('IMEINumber').value;
	var formData = new FormData(); 
	formData.append("phoneNumber",phoneNumber);
	formData.append("IMEINumber",IMEI);
	
	if (!phoneNumber || !IMEI) {
		
		activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>请输入完整信息</div>"
		return;
	}
	
	var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
	$.ajax({
		url:"http://0.0.0.0:8081/checkService",
		type:"post",
		data:formData,
		processData:false,
		contentType:false,
		success:function(data){
			var dataSource = JSON.parse(data);
			activeButtonItem.innerHTML = '';
			if (dataSource.length > 0) {
				for (var i = 0; i < dataSource.length; i++) {
					var item = dataSource[i];
					activeButtonItem.innerHTML = activeButtonItem.innerHTML + "<div class='panel panel-success'><div class='panel-heading'><h3 class='panel-title'>" + item.name + "</h3></div><div class='panel-body'>" + item.cardType + ": " + item.cardNumber + "<br>" + item.phoneType + ": " + item.phoneNumber + "<br>" + "IMEI: " + item.IMEINumber + "<br>" + "服务卡号: " + item.serviceCardNumber + "<br>" + "激活密码: " + item.activePassword + "<img src=" + item.picturePath + " width='100%' class='img-rounded'>" + "</div> </div>";
				}
			}else{
				activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>返回数据为空</div>"
			}
		},
		error:function(e){
			activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>查询数据失败</div>"
		}
	});
}
