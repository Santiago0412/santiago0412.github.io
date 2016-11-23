var cardType = '';
var phoneType = '';
var picturePath = '';

window.onload = function(){

	var control = $('#activeServiceChecking'); 
    control.fileinput({
        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
        showUpload: false, //是否显示上传按钮 
        showCaption: true,
    });

    configDate();
}

function activeButtonClicked(){

	//获取一系列值
	var name = document.getElementById('name').value;
	var cardNumber = document.getElementById('cardNumber').value;
	var phoneNumber = document.getElementById('phoneNumber').value;
	var IMEI = document.getElementById('IMEINumber').value;
	var serviceCardNumber = document.getElementById('ServiceCardNumber').value;
	var activePassword = document.getElementById('activePassword').value;

	//ajax请求
	var file = $("#activeServiceChecking")[0]; //文件

	if (name.length == 0) {alert("请填写您的姓名");return;}
	if (cardType.length == 0) {alert("请选择证件类型");return;}
	if (cardNumber.length == 0) {alert("请填写证件号码");return;}
	if (phoneType.length == 0) {alert("请选择手机类型");return;}
	if (phoneNumber.length == 0) {alert("请填写手机号码");return;}
	if (IMEI.length == 0) {alert("请填写IMEI号");return;}
	if (serviceCardNumber.length == 0) {alert("请填写服务卡号");return;}
	if (activePassword.length == 0) {alert("请填写激活密码");return;}
	if (!file.files[0]) {alert("请上传手机验证照片");return;}

	var formData = new FormData(); //构造空对象，下面用append 方法赋值。

	//当前时间戳20xx-xx-xx格式
	var currentDateString = configDate();

	//用户数据
	formData.append("name",name);
	formData.append("cardType",cardType);
	formData.append("cardNumber",cardNumber);
	formData.append("phoneType",phoneType);
	formData.append("phoneNumber",phoneNumber);
	formData.append("IMEINumber",IMEI);
	formData.append("serviceCardNumber",serviceCardNumber);
	formData.append("activePassword",activePassword);
	formData.append("currentDateString",currentDateString);

	//图片
	formData.append("img", file.files[0]);
	console.log(file.files[0]);
	var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
	$.ajax({
		url:"http://0.0.0.0:8081/activeService",
		type:"post",
		data:formData,
		processData:false,
		contentType:false,
		success:function(data){
			activeButtonItem.innerHTML = "<div class='alert alert-success alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='false'>&times;</button>提交资料成功</div>";
		},
		error:function(e){
			activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>提交失败</div>"
		}
	});
}

function chooseCardType(item){
	
	console.log(item.firstChild.nodeValue);
	var cardTypeItem = document.getElementById('cardTypeItem');
	cardType = item.firstChild.nodeValue;
	cardTypeItem.firstChild.nodeValue = cardType;
}

function choosePhoneType(item){

	console.log(item.firstChild.nodeValue);
	var phoneTypeItem = document.getElementById('phoneType');
	phoneType = item.firstChild.nodeValue;
	phoneTypeItem.firstChild.nodeValue = phoneType;
}

function configDate(){

	var date = new Date();
 	var month=date.getMonth()+1;
 	var nextYear = date.getFullYear()+ 1;

    var today = date.getFullYear() + "-" + month + "-" + date.getDate();
    var nextYearsDay = nextYear + "-" + month + "-" + date.getDate();
    
    document.getElementById('todayItem').firstChild.nodeValue = today;
	document.getElementById('nextYearsDayItem').firstChild.nodeValue = nextYearsDay;

	return today;
}