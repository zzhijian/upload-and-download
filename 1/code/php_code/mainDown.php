<?php
  /***author zhangzhijian  time:2015-06-07*****/
   //设置编码防止乱码
    header("Content-Type:text/html;charset=utf8");
    $actionName=null;
    /**判断请求方式***/
	if("GET"==$_SERVER["REQUEST_METHOD"]){
	     $actionName=$_GET["actionName"];
	}else{
	    $actionName=$_POST["actionName"];
	}
    /**上传文件***/
    if(null!=$actionName&&$actionName=="upload"){
            /**获取存放路径**/
			 $dirFilePath=$_POST["actualDirePath"];
              $tmp_file=$_FILES["myfile"]["tmp_name"][0];
               $tmpFile=$_FILES["myfile"]["name"][0];
               /***获取文件大小***/
                $fileSize=$_FILES["myfile"]["size"][0];
                /***获取文件类型***/
                $fileType=substr($tmpFile,strrpos($tmpFile,".")+1);
                /* if("exe"== $fileType){
                 echo "<script >alert('非法文件类型')</script>";
                  exit;
                 }*/
                $fileName=$tmpFile;
                /***重新命名文件***/
                  $idValue=time();
                  $savePath="/attachment/".$dirFilePath."/".$idValue.".".$fileType;
                   $move_file=$_SERVER["DOCUMENT_ROOT"].$savePath;
				   /**文件**/
                 if(move_uploaded_file($tmp_file, $move_file)){
                     $centont="'".$fileName."','".$fileType."','".$savePath."','".$fileSize."','".$idValue."'";
					print_r("<script>parent.callbackfileupload(".$centont.")</script>");
				 }else{
				    echo "<script >alert('移动文件失败！')</script>";
				 }
	/**下载文件***/
   }else if(null!=$actionName&&$actionName=="download"){
     /**文件下载路径***/
     $filePath = $_SERVER["DOCUMENT_ROOT"].$_GET["path"];
     /**文件名称***/
      $fileName = urldecode($_GET["fileName"]);  
      /**读取文件进行下载操作***/
		$fp=fopen($filePath,"r"); 
		$file_size=filesize($filePath); 
		header("Content-type: application/octet-stream"); 
		header("Accept-Ranges: bytes"); 
		header("Accept-Length: $file_size"); 
		header("Content-Disposition: attachment; filename=".$fileName); 
		$buffer=1024; 
		while(!feof($fp)){ 
		  $file_data = fread($fp,$buffer);
		  echo $file_data; 
		} 
		fclose($fp); 
     exit;  
     /**删除文件***/
   }else if(null!=$actionName&&$actionName=="remove"){
           $result="";
           /**文件路径**/
           $filePath=$_POST["savePath"];
           $filePath=$_SERVER["DOCUMENT_ROOT"].$filePath;
           /**判断文件是否存在***/
           if(is_file($filePath)){
            /**删除文件***/
               if (!unlink($filePath)){
                 $result="Error 1 deleting $filePath";
               }
           }else{
              $result="No 1 file ";
           }
       echo  json_encode($result);
   }
?>

