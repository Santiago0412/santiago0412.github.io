window.onload = function(){

	var control = $('#claimSettlementPictures'); 
    control.fileinput({
        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
        showUpload: false, //是否显示上传按钮 
        showCaption: true,
    });
}

function submitRequest(){

	var claimDiscription = document.getElementById('claimDiscription').value;
	var phoneNumber = document.getElementById('PhoneNumber').value;

	var file = $("#claimSettlementPictures")[0]; //文件
	var formData = new FormData(); //构造空对象，下面用append 方法赋值。
	var currentDateString = configDate();
	formData.append("discription",claimDiscription);
	formData.append("phoneNumber",phoneNumber);
	formData.append("currentDateString",currentDateString);
	formData.append("img", file.files[0]);
	formData.append("img", file.files[1]);
	formData.append("img", file.files[2]);

	var activeButtonItem = document.getElementById('uploadPictureSucceedToast');
	$.ajax({
		url:"http://0.0.0.0:8081/claimSettlement",
		type:"post",
		data:formData,
		processData:false,
		contentType:false,
		success:function(data){
			console.log(data);
			activeButtonItem.innerHTML = "<div class='alert alert-success alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='false'>&times;</button>提交申请成功</div>";
		},
		error:function(e){
			activeButtonItem.innerHTML = "<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'aria-hidden='true'>&times;</button>提交失败</div>"
		}
	});
}

function configDate(){

	var date = new Date();
 	var month=date.getMonth()+1;
    var today = date.getFullYear() + "-" + month + "-" + date.getDate();
	return today;
}
