//-----------附件处理----------
var actualDirePath="plate/"; //文件存放目录
var uploadLimit=2;//允许一次性上传文件的总数
	/***上传文件
	 */
function addNodeAnnex(){
		msgDialog("文件上传","/comm/fileUpload.jsp","650px","400px","50%","20%","fileUpload");
 }
	/***
	 * 组装附件
	 */
function taxAttFile(attchs){
		var downloadUrl="/fileServlet.do?actionName=download";
		var strHtml="";
		var fileIndex=$("#attach_list").children("li").size();
		for(var i=0;i<attchs.length;i++){
			var attch = attchs[i];
			var idValue = attch.idValue;
		     strHtml += "<li id='doc_"+idValue+"'><span>"+attch.fileName+"</span>";
			 strHtml += "<a href='"+downloadUrl+"?savePath="+attch.dirUrl+"&fileName="+encodeURIComponent(encodeURIComponent(attch.fileName))+"' target='hidden_frame'>下载</a>&nbsp;";
			 strHtml += "<a href=\"javascript:delFile_('"+attch.dirUrl+"','doc_"+idValue+"')\">删除</a>";
			 strHtml += "<input type='hidden' name='fileName["+fileIndex+"]' value='"+attch.fileName+"' alt='fileName'/>";
		     strHtml += "<input type='hidden' name='fileUrl["+fileIndex+"]' value='"+attch.dirUrl+"' alt='fileUrl' />";
			 strHtml += "</li>";
			 fileIndex++;
		}
		$("#attach_list").append(strHtml);
	}
/**删除记录***/
function del(id,fileUrl,imgUrl){
	if(confirm("您确定要删除当前记录吗？")){
      $.ajax({ type:'POST',url:'/downdbServlet.do', cache:false, dataType:'text',
            data:{'actionName':'remove','id':id,'savePath':fileUrl,'imgUrl':imgUrl}, success:function(dataInfo,status){
            	 var info=eval('(' +dataInfo+ ')');
                 if('success'==status&&(''==info||-1!=info.keyId)){
                	 $("#index_"+id).remove();
                      alert("删除成功！");
                }else{
                   alert('删除失败!');
                }
            },error:function(){
               alert('删除数据发送错误！');
            }
         });
	}
}


	/**
	 * 删除文件
	 * @param fileId
	 * @param fileIndex
	 */
 function delFile_(filePath,divId){
		  $.ajax({type:"post",url:"/fileServlet.do",cache:false,dataType:"text",
		        data:{"actionName":"remove","savePath":filePath},success:function(data){
		        	var response = eval('(' +data+ ')');
		            if("error"!=response.message){
		            	$("#"+divId).remove();
		            	var fileIndex=0;
		            	$("#attach_list").children("li").find("input").each(function(i){
		            		var attchName=$(this).attr("alt");
		            		if("fileName"==attchName)
		            			$(this).attr("name","fileName["+fileIndex+"]");
		            		else if("fileUrl"==attchName){
		            			$(this).attr("name","fileUrl["+fileIndex+"]");	
		            			fileIndex++;
		            		}
		            	});
		            }else{
		            	$("#"+divId).remove();
		            	alert("该文件不存在！");
		            };
		        },error:function(){
		           alert("删除数据发生错误！");
		        }
		    });
	}









