<?php
  /***author zhangzhijian  time:2015-06-07*****/
   //set coding
   header("Content-Type:text/html;charset=utf8");
    /**判断请求方式***/
   $actionName = "GET"== $_SERVER["REQUEST_METHOD"] ? $_GET["actionName"] : $actionName=$_POST["actionName"];
  /***method***/
  if($actionName == "upload"){
      upload();
   }elseif($actionName == "download"){
      download();
   }elseif($actionName == "remove") {
      removeFile();     
   }

   /**upload file***/
  public function upload($dir="upload")
  {
        /***file*****/
        $file_list =  $_FILES["myfile"];
        $tmp_file = $file_list["tmp_name"][0];
        $file_name = $file_list["name"][0];
        $file_size = $file_list["size"][0];

         /***fileType***/
         $file_type = substr($file_name, strrpos($file_name,".")+1);
        if("exe" == $fileType){
               echo "<script >alert('非法文件类型')</script>";
         }
          $id_value = time();
         /***save_file***/
          $save_file_path = $_SERVER["DOCUMENT_ROOT"]."/public/".$dir."/".$id_value.".".$file_type;
           /**save**/
          if(move_uploaded_file($tmp_file, $save_file_path)){

            $centont = "'".$file_name."','".$file_type."','".$save_file_path."','".$file_size."','".$id_value."'";
            echo("<script>parent.callbackfileupload(".$centont.")</script>");

           }else   echo "<script >alert('移动文件失败！')</script>";
        
  }

 /**download file**/
 public function download()
 {
      /**file***/
        $file_path = $_SERVER["DOCUMENT_ROOT"].$_GET["path"];
        $file_name = urldecode($_GET["fileName"]);  
        $fp = fopen($file_path,"r"); 
        $file_size = filesize($file_path); 
        /***set header****/
        header("Content-type: application/octet-stream"); 
        header("Accept-Ranges: bytes"); 
        header("Accept-Length: $file_size"); 
        header("Content-Disposition: attachment; filename=".$file_name); 
        /**read****/
        $buffer = 1024; 
        while( !feof($fp) ){ 
          $file_data = fread($fp, $buffer);
          echo $file_data; 
        } 
        fclose($fp); 
 }

 /**remove file*****/
 public function removeFile()
 {
        /**file**/
        $file_path = $_POST["savePath"];
        $file_path = $_SERVER["DOCUMENT_ROOT"].$file_path;
        /*****/
        if(is_file($file_path)){
            /**remove file***/
          if (!unlink($file_path)){
                 $result = "Error deleting $file_path";
            }
        }else $result = "not file";
           
       echo  json_encode( $result );
 }

?>

