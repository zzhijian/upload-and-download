<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>上传文件</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="/comm/css/common.css">
<script type="text/javascript" src="/comm/js/jquery.js"></script>
<!--lhgdialog-->
<link rel="stylesheet"  type="text/css" href="/comm/lhgdialog/skins/jtop.css"/>
<script  type="text/javascript"  src="/comm/lhgdialog/lhgdialog.min.js?skin=jtop"></script>
<script type="text/javascript">
var api = frameElement.api;
var W = api.opener; 
var D = W.document;
</script>
<script type="text/javascript" src="/comm/lhgdialog/dialog.js"></script>
<!--文件上传-->
<link rel="stylesheet" type="text/css" href="/comm/swfUpload/css/default.css"  />
<script type="text/javascript" src="/comm/swfUpload/swfupload.js"></script>
<script type="text/javascript" src="/comm/swfUpload/swfupload.queue.js"></script>
<script type="text/javascript" src="/comm/swfUpload/fileprogress.js"></script>
<script type="text/javascript" src="/comm/swfUpload/handlers.js"></script>
<script type="text/javascript" src="/comm/js/fileUpload.js"></script> 
<style>
body{
	background:#fff;
	font-size: 14px;
}
.uploadBtn a{
			color:#fff;
		}
.fileList{
	background:#f9f9f9;
	margin:20px auto;
	border:1px solid #eee;
}
.fileList ul li{
	height:50px;
	line-height: 50px;
	border-bottom: 1px solid #eee;
	padding:0px 10px;
	color: #666;
}
.fileList ul li:last-child{
	border-bottom: none;
}
.excuteCon{
	text-align:right;
}
.excuteCon a{
	margin-left: 10px;
}
</style>
</head>
<body>
<iframe name='hidden_frame' id="hidden_frame" style='display: none'></iframe>
<div class="container" style="padding:20px;">
	<div>
		<span id="flushUploadButton"></span>
	</div>
	<div class="fileList" id="fileList" >
	</div>
	<div class="excuteCon">
		<a href="javascript:definiteAtt();" class="btn btn-succ">确定</a>
		<a href="javascript:cancelUpload();" class="btn btn-cancle" >取消</a>
	</div>
</div>
</body>
</html>