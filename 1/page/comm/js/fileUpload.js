/**
 * author:zhangzhijian
 * time:2015-04-16
 * 文件上传JS
 */
 var swfUpload; 
var win;
$(document).ready(function(){
	/***处理对话框层级***/
	 if("undefined"==typeof((W.$.dialog.list.uploadfileId))){
		   win=W;
	 }else{
		   win=W.$.dialog.list.uploadfileId.iframe.contentWindow.window;
	 }
	 /***默认类型****/
	 var dirType="*";
	 if("plate/"==win.actualDirePath){
			if(1==win.attch_number){
				dirType="*.dwg;*.dxf;*.prt;*.drw;*.asm;*.frm;*.prt;*.sldprt;*.sldasm;*.slddrw";
			}else if(2==win.attch_number){
				dirType=".xls;*.doc;*.xlsx;*.docx";
			}else if(3==win.attch_number){
				dirType="*.zip;.bmp;*.png;*.gif;*.jpeg;*.jpg";
			}
	 }
	var swfUploadObject = {
	//提交路径
	upload_url:"/fileServlet.do?actionName=upload&actualDirePath="+win.actualDirePath,
	//向后台传递额外的参数
	//post_params: {"actualDirePath":win.actualDirePath},
	//上传文件的名称
	file_post_name:"file",
	// 下面自己按照字面意思理解
	file_size_limit:"102400",	// 100MB
	file_types:dirType,
	file_types_description : "压缩包 图片 常用文档格式",
	file_upload_limit:win.uploadLimit,
	file_queue_limit:win.uploadLimit,
	// 事件处理
	file_queued_handler : fileQueued,
	file_queue_error_handler : fileQueueError,
	file_dialog_complete_handler : fileDialogComplete,//选择好文件后提交
	upload_progress_handler : uploadProgress,
	upload_error_handler : uploadError,
	upload_complete_handler : uploadComplete,
	upload_start_handler : startUploadFile,
	upload_success_handler:function myUploadSuccess(fileObj, server_data) { 
			  try { 
			    	var data = eval('(' +server_data+ ')');
			    	/**下载文件的路径**/
			    	downloadUrl = "/fileServlet.do?actionName=download&savePath="+data.filePath+"&fileName="+encodeURIComponent(data.fileName,"UTF-8");
			    	var progress = new FileProgress(fileObj,this.customSettings.progressTarget);
			       	progress.setComplete();
			       	document.getElementById("progressNameHref"+fileObj.id).href=downloadUrl;
			       	document.getElementById("progressNameHref"+fileObj.id).target="hidden_frame";
			       	var fileSize = fileObj.size;
			       	var i = 0;
			       	while(fileSize>1024&&i<2){
			       		fileSize = fileSize/1024;
			       		i++;
			       	}
			       	var sizeDW="";
			       	if(i==0)
			       		sizeDW = "B";
			       	else if(i==1)
			       		sizeDW = "K";
			       	else if(i==2)
			       		sizeDW = "M";
					progress.setStatus(toDecimal2(fileSize)+sizeDW+"  上传完成");
					progress.toggleCancel(false);
					var filelist = document.getElementById("progressContainer"+fileObj.id);
			       	filelist.style.paddingLeft="40px";
			       	filelist.style.background="#F0F5FF url('/comm/swfUpload/file-icon/"+fileObj.type.replace('.','')+".png') no-repeat 5px 5px";
				 	//删除附件按钮
				 	var deleteObject = document.createElement("a");
					deleteObject.className = "delUploadButton";
					deleteObject.href = "/fileServlet.do?actionName=remove&savePath="+data.filePath;
					deleteObject.target="hidden_frame";
					deleteObject.appendChild(document.createTextNode("删除"));
					deleteObject.onclick = function(){
						progress.setDelete();
						/**删除对应信息
						 * */
						var fileNameObj = document.getElementById("fileName"+fileObj.id);
						fileNameObj.parentNode.removeChild(fileNameObj);
						var fileTypeObj = document.getElementById("fileType"+fileObj.id);
						fileTypeObj.parentNode.removeChild(fileTypeObj);
						var filePathObj = document.getElementById("dirUrl"+fileObj.id);
						filePathObj.parentNode.removeChild(filePathObj);
						var fileSizeObj = document.getElementById("fileSize"+fileObj.id);
						fileSizeObj.parentNode.removeChild(fileSizeObj);
						var newFileNameObj = document.getElementById("newFileName"+fileObj.id);
						newFileNameObj.parentNode.removeChild(newFileNameObj);
						var idValueObj = document.getElementById("idValue"+fileObj.id);
						idValueObj.parentNode.removeChild(idValueObj);
					};							
					filelist.appendChild(deleteObject);
					/**组装返回信息
					 * */
			       	var fileNameObj = document.createElement("input");
			       	fileNameObj.setAttribute("type","hidden"); 
			       	fileNameObj.setAttribute("name","fileName");
			       	fileNameObj.setAttribute("value",data.fileName);
			       	fileNameObj.setAttribute("id","fileName"+fileObj.id);
				 	filelist.appendChild(fileNameObj);
				 	var fileTypeObj = document.createElement("input");
				 	fileTypeObj.setAttribute("type","hidden"); 
				 	fileTypeObj.setAttribute("name","fileType");
				 	fileTypeObj.setAttribute("value",data.fileType);
				 	fileTypeObj.setAttribute("id","fileType"+fileObj.id);
				 	filelist.appendChild(fileTypeObj);
				 	var filePathObj = document.createElement("input");
				 	filePathObj.setAttribute("type","hidden"); 
				 	filePathObj.setAttribute("name","dirUrl");
				 	filePathObj.setAttribute("value",data.filePath);
				 	filePathObj.setAttribute("id","dirUrl"+fileObj.id);
				 	filelist.appendChild(filePathObj);
				 	var fileSizeObj = document.createElement("input");
				 	fileSizeObj.setAttribute("type","hidden"); 
				 	fileSizeObj.setAttribute("name","fileSize");
				 	fileSizeObj.setAttribute("value",data.fileSize);
				 	fileSizeObj.setAttribute("id","fileSize"+fileObj.id);
				 	filelist.appendChild(fileSizeObj);
				 	var newFileNameObj = document.createElement("input");
				 	newFileNameObj.setAttribute("type","hidden"); 
				 	newFileNameObj.setAttribute("name","newFileName");
				 	newFileNameObj.setAttribute("value",data.fileName);
				 	newFileNameObj.setAttribute("id","newFileName"+fileObj.id);
					filelist.appendChild(newFileNameObj);
				 	var idValueObj = document.createElement("input");
				 	idValueObj.setAttribute("type","hidden"); 
				 	idValueObj.setAttribute("name","idValue");
				 	idValueObj.setAttribute("value",data.idValue);
				 	idValueObj.setAttribute("id","idValue"+fileObj.id);
				 	filelist.appendChild(idValueObj);
			   } catch (ex) { 
	    	   this.debug(ex);
	    	 } 
	      },
		upload_complete_handler:uploadComplete,
		// 按钮的处理
		button_image_url:"/comm/swfUpload/images/XPButtonUploadText_61x22.png",
		button_placeholder_id:"flushUploadButton",
		button_width: 100,
		button_height: 26,
		// Flash Settings
		flash_url : "/comm/swfUpload/swfupload.swf",
		custom_settings : {
			progressTarget:"fileList"
		},
		// Debug Settings
		debug: false
	};
	swfUpload = new SWFUpload(swfUploadObject);
});

/***启动上传
 * @param file
 */
function startUploadFile(file){
	swfUpload.startUpload();
}

/***
 * 制保留2位小数，如：2，会在2后面补上00.即2.00  
 * @param x
 * @returns
 */
function toDecimal2(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return false;  
    }  
    var f = Math.round(x*100)/100;  
    var s = f.toString();  
    var rs = s.indexOf('.');  
    if (rs < 0) {  
        rs = s.length;  
        s += '.';  
    }  
    while (s.length <= rs + 2) {  
        s += '0';  
    }  
    return s;  
} 

/***
 * 确认附件
 */
function definiteAtt(){
	var attchs = receAtt();
	if(null != attchs 
		&& attchs.length>0){
			win.taxAttFile(attchs);
	}
	closeWin();
}

/***组装附件信息
 */
function receAtt(){
	var attchs = new Array();
	var fileSizes = $("#fileList input[name='fileSize']");
	var dirUrls = $("#fileList input[name='dirUrl']");
	var fileTypes = $("#fileList input[name='fileType']");
	var newFileNames = $("#fileList input[name='newFileName']");
	var idValues = $("#fileList input[name='idValue']");
	$("#fileList input[name='fileName']").each(function(i){
		var attch = new Object();
		attch.fileName = $(this).val();
		attch.dirUrl = $(dirUrls[i]).val();
		attch.fileType = $(fileTypes[i]).val();
		attch.newFileName = $(newFileNames[i]).val();
		attch.fileSize = $(fileSizes[i]).val();
		attch.idValue = $(idValues[i]).val();
		attchs[attchs.length++]=attch;
	}) ;
	return attchs;
}

/**取消上传
 */
function cancelUpload(){
	cancelQueue(swfUpload);
	$(".delUploadButton").each(function(i){
		this.click();
	});
	closeWin();
}

/***
 * 关闭对象
 */
function closeWin(){
	closeDialog(api); 
}