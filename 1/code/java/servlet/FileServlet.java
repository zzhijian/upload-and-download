/**
 * 文 件  名：FileServlet.java
 * 创建日期：2015年4月16日 上午8:19:19
 * 版     本： V1.0.0
 *******************************************************************************  
 */
package java.servlet;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/** FileServlet概要说明：
 * @author zhangzhijian
 */
@SuppressWarnings("serial")
public class FileServlet extends HttpServlet{
	
	public static int BUFFER_BYTE = 1024;
	private static byte BYTES[] = new byte[BUFFER_BYTE];
	private static final long MAX_SIZE = 1024 * 1024 * 1024;//1G

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String actionName = request.getParameter("actionName");
		if("upload".equals(actionName)){
			uploadFile(request, response);
		}else if("remove".equals(actionName)){
			removeAsynFile(request, response);
		}else if("download".equals(actionName)){
			downloadFile(request, response);
		}
	 }

	/**上传附件
	 * @throws IOException ***/ 
	@SuppressWarnings("rawtypes")
	private void uploadFile(HttpServletRequest request,HttpServletResponse response)throws ServletException, IOException  {
		String actualDirePath = request.getParameter("actualDirePath");
		//设置返回的字符集为utf-8
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = null;
		String fileStoragePath = request.getSession().getServletContext().getRealPath("/");
		
		 // 在解析请求之前先判断请求类型是否为文件上传类型  
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);  
        if(isMultipart){
        // 文件上传处理工厂  
        FileItemFactory factory = new DiskFileItemFactory();
        // 创建文件上传处理器  
        ServletFileUpload upload = new ServletFileUpload(factory);  
        upload.setSizeMax(MAX_SIZE);
        // 开始解析请求信息  
		List items = null;  
        try {  
            items = upload.parseRequest(request);  
        } catch (FileUploadException e) { 
        	if (e instanceof SizeLimitExceededException){//超过最大文件限度
        		out = response.getWriter();
        		out.println("<script>parent.callbackfileupload('errorMaxsize')</script>");
        		out.flush();
        	  return;
        	  }
            e.printStackTrace();  
        }finally{
        	if(null!=out)
        		out.close();
        }  
        // 对所有请求信息进行判断  
		Iterator itr = items.iterator();
        while(itr.hasNext()) {
        	FileItem item = (FileItem) itr.next();
        	/***判断是否为text**/
        	if(null==item||item.isFormField()){
        		continue;
        	}
        	String fileName = (null == item.getName()?item.getString():item.getName());
        	//fileName=new String(fileName.getBytes("ISO-8859-1"), "utf-8");
        	long fileSize = item.getSize();
			// 获取时间点
			int random = (int)(Math.random()*1000);
			String str_random = String.valueOf(random);
			SimpleDateFormat time = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			String datestr = time.format(new Date());
			int pos = fileName.lastIndexOf(".")+1;
			String fileContentType = fileName.substring(pos);
			/*if (fileContentType.endsWith("exe")
					||fileContentType.endsWith("bat")){
				out.println("<script>parent.callbackfileupload('error')</script>");
				return null;
			}*/
		    String saveDir = "";
		    if(null != fileStoragePath 
		    		&& fileStoragePath.trim().length()>0){
		    	saveDir = fileStoragePath +"/attachment/"+ actualDirePath;
		    }
		    /**判断目录是否存在
		     * */
		    File rootDir = new  File(saveDir);
		    if(!rootDir.exists()){
		    	rootDir.mkdirs();
		    }
			String idValue = datestr + "_" + str_random;
			String savePath = "/attachment/"+actualDirePath+idValue+"."+fileContentType;
			//新文件名
			String saveFilePath =  saveDir+idValue+"."+fileContentType;
			// 创建服务器端的文件名
			File file = new File(saveFilePath);
			try{
				 item.write(file);  
				String returnJson = "{fileName:\""+fileName+"\",fileType:\""+fileContentType+"\",filePath:\""+savePath+"\",fileSize:\""+fileSize+"\",\"idValue\":\""+idValue+"\"}";
				// 成功
				out=response.getWriter();
				out.println(returnJson);
				out.flush();
			}catch(Exception e){
				e.printStackTrace();
			} finally {
				if(null!=out)
	        		out.close();
			}
          }
        }
	}
	
	/**异步删除文件 **/
	private void   removeAsynFile(HttpServletRequest request,HttpServletResponse response) throws IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		String filePath = request.getParameter("savePath");
		try {
			String saveDir = request.getSession().getServletContext().getRealPath("/");
			String delFilePath = saveDir+filePath;
			File delFile = new File(delFilePath);
			/**文件存在就删除
			 */
			if(delFile.exists()){
				// 删除服务器端的文件
				delFile.delete();
				String returnJson = "{message:\"success\"}";
				// 成功
				out.println(returnJson);
				out.flush();
			} else {
				String returnJson = "{message:\"error\"}";
				// 成功
				out.println(returnJson);
				out.flush();
			}
		} finally {
			if(null!=out)
        		out.close();
		}
	}
	
	
	
	/****
	 * downloadFile方法慨述:下载附件***/
	private String downloadFile(HttpServletRequest request,HttpServletResponse response){
		BufferedInputStream in = null;
		BufferedOutputStream out = null;
		OutputStream outputStream = null;
		FileInputStream fileInput = null;
		String fileStoragePath = request.getSession().getServletContext().getRealPath("/");
		try {
			response.setContentType("text/html; charset=UTF-8");
			String savePath = request.getParameter("path");
			String fileName = request.getParameter("fileName");
		    String downloadFilePath = fileStoragePath+savePath;
			//读取文件
			File downloadFile = new File(downloadFilePath);
			//如果文件存在
			if(downloadFile.exists()){
				String userAgent = request.getHeader("User-Agent");
				if(null != fileName){
					fileName = java.net.URLDecoder.decode(fileName,"UTF-8");
					if(userAgent.toUpperCase().indexOf("MSIE") == -1 
							&& userAgent.toUpperCase().indexOf("MOZILLA") == -1){
						System.out.println("--NO-MOZILIA---");
						fileName = java.net.URLEncoder.encode(fileName,"UTF-8");//IE浏览器
					} else {
						System.out.println("---MOZILIA---");
						fileName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
					}
				}
				int pos = downloadFilePath.lastIndexOf(".")+1;
				String ls_type = downloadFilePath.substring(pos);
				String ls_newfileName = "temp"+"."+ls_type;
				response.setContentType("application/octet-stream"); 
				if(null != fileName 
						&& fileName.trim().length()>0){
					if(fileName.contains(".")){
						fileName = fileName.substring(0,fileName.lastIndexOf("."));
					}
					response.setHeader("Content-Disposition","attachment;filename="+fileName+"."+ls_type);
				} else {
					response.setHeader("Content-Disposition","attachment;filename="+ls_newfileName);
				}
				response.setHeader("Connection","close");
			    fileInput = new FileInputStream(downloadFile);
				//设置文件大小
				response.setContentLength(fileInput.available());
			    outputStream = response.getOutputStream();
				in = new BufferedInputStream(fileInput,fileInput.available());
				out = new BufferedOutputStream(outputStream,fileInput.available());
				int len = 0;
	            while ((len = in.read(BYTES)) != -1) {
	            	out.write(BYTES,0,len);
	            }
	           out.flush();
			}
		}catch(Exception e){   
			e.printStackTrace();
		}finally{
			try {
				if(null != fileInput)
				  fileInput.close();
				if(in != null)
				  in.close();
				if(null != outputStream)
				 outputStream.close();
				if(null != out)
				  out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
