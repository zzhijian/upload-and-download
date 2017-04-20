/**
 * 指定全局参数
 
 */
$(function() {
	try{
		(function(config) {
		config['extendDrag'] = true; // 注意，此配置参数只能在这里使用全局配置，在调用窗口的传参数使用无效
		config['lock'] = false;
		config['fixed'] = true;
		config['okVal'] = 'Ok';
		config['cancelVal'] = 'Cancel';
		// [more..]
	})($.dialog.setting);
	}catch(e){
	
	}
});


/**
 * 确认对话框
 * 
 * @param titleMsg
 *            确认对话框标题
 * @param contentMsg
 *            确认对话框内容
 */
function delConfirmDialog(titleMsg,contentMsg,requestJson,serviceUrl) {
	$.dialog({
		id : 'confirmDialog',
		title : titleMsg,
		icon : 'i.png',
		lock: true, 
		content : contentMsg,
		button : [ {
			name : '确认',
			callback : function() {
				delfun(requestJson,serviceUrl,titleMsg);
				//待定
				return true;
			},
			focus : true
		}, {
			name : '取消',
			callback : function() {
				//待定
				return true;
			}
		} ]
	});
}

/**
 *第二层确认对话框
 * 
 * @param titleMsg
 *            确认对话框标题
 * @param contentMsg
 *            确认对话框内容
 */
function subConfirmDialog(titleMsg, contentMsg) {
	W.$.dialog({
		id : 'confirmDialog',
		title : titleMsg,
		icon : 'i.png',
		content : contentMsg,
		parent : api,
		lock: true, 
		button : [ {
			name : '确认',
			callback : function() {
				//待定
				return true;
			},
			focus : true
		}, {
			name : '取消',
			callback : function() {
				//待定
				return true;
			}
		} ]
	});
}

/***
 * 二级成功对话框
 * @param titleMsg
 * @param contentMsg
 */
function subInfoDialog(titleMsg, contentMsg) {
	W.$.dialog({
		id : 'infoDialog',
		title : titleMsg,
		icon : 'succ.png',
		lock: true, 
		parent : api,
		content : contentMsg,
		button : [ {
			name : '确定',
			callback : function() {
				return true;
			},
			focus : true
		} ]
	});
}

/**
 * 正确对话框
 * 
 * @param titleMsg
 *            正确对话框标题
 * @param contentMsg
 *            正确对话框内容
 */
function infoDialog(titleMsg, contentMsg) {
	$.dialog({
		id : 'infoDialog',
		title : titleMsg,
		icon : 'succ.png',
		lock: true, 
		content : contentMsg,
		button : [ {
			name : '确定',
			callback : function() {
				return true;
			},
			focus : true
		} ]
	});
}

/**
 * 错误对话框
 * 
 * @param titleMsg
 *            错误对话框标题
 * @param contentMsg
 *            错误对话框内容
 */
function subErrorDialog(titleMsg, contentMsg,obj) {
	var dialogApi = null;
	var dialogW = null;
	if("undefined"!=typeof(tempApi) 
			&& undefined != tempApi 
			&& null != tempApi){
		dialogApi = tempApi;
	} 
	if("undefined"!=typeof(api) 
			&& undefined != api 
			&& null != api){
		dialogApi = api;
	} 
	/**window对象*/
	if("undefined"!=typeof(tempW) 
			&& undefined != tempW 
			&& null != tempW){
		dialogW = tempW;
	} 
	if("undefined"!=typeof(W) 
			&& undefined != W 
			&& null != W){
		dialogW = W;
	} 
	dialogW.$.dialog({
		id : 'errorDialog',
		title : titleMsg,
		icon : 'error.gif',
		content : contentMsg,
		lock: true, 
		parent : dialogApi,
		button : [ {
			name : '确定',
			callback : function() {
				if(null != obj){
					document.getElementById(obj).focus();
				}
				return true;
			},
			focus : true
		} ]
	});
}

/***
 * 错误对话框
 * @param titleMsg
 * @param contentMsg
 * @param obj
 */
function errorDialog(titleMsg, contentMsg,obj) {
	$.dialog({
		id : 'errorDialog',
		title : titleMsg,
		icon : 'error.gif',
		content : contentMsg,
		lock: true, 
		button : [ {
			name : '确定',
			callback : function() {
				if(null != obj){
					document.getElementById(obj).focus();
					document.getElementById(obj).select();
				}
				return true;
			},
			focus : true
		} ]
	});
}

/***
 * 加载对话框
 * @param titleMsg
 * @param idValue
 */
function loadMsgDialog(titleMsg,idValue){
	$.dialog({
		id:idValue,
		lock: true, 
	    background: '#FFF', /* 背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */ 
	    opacity: 0.5,       /* 透明度 */ 
		width: "50px",
		height: "50px",
		max:false,
		min:false,
		left: "50%", 
	    top: "50%",
		title : titleMsg,
		close:function() {
			return true;
		}
	});
}


/****
 * 弹出子页面弹出框
 * @param titleMsg 消息
 * @param url 地址
 * @param width 宽度
 * @param height 高度
 * @param left
 * @param top
 * @param idValue 唯一标识
 */
function subMsgDialog(titleMsg, url,width,height,left,top,idValue) {
	W.$.dialog({
		id:idValue,
		lock: true, 
		parent : api,
	    background: '#FFF', /* 背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */ 
	    opacity: 0.5,       /* 透明度 */ 
		width: width,
		height: height,
		left: left, 
	    top: top,
		title : titleMsg,
		close:function() {
			return true;
		},
		content : 'url:' + url
	});
}

/**
 * 含子页面的对话框(需指定URL)
 * 
 * @param url
 *            子页面URL
 */
function subMsgDialog(titleMsg, url,width,height,left,top) {
	W.$.dialog({
		lock: true, 
		parent : api,
	    background: '#FFF', /* 背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */ 
	    opacity: 0.5,       /* 透明度 */ 
		width: width,
		height:height,
		left: left, 
	    top: top,
		title : titleMsg,
		close:function() {
			return true;
		},
		content : 'url:' + url
	});
}

/****
 * 弹出框
 * @param titleMsg
 * @param url
 * @param width
 * @param height
 * @param left
 * @param top
 * @param idValue
 */
function msgDialog(titleMsg, url,width,height,left,top,idValue) {
	$.dialog({
		id:idValue,
		lock: true, 
	    background: '#FFF', /* 背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */ 
	    opacity: 0.5,       /* 透明度 */ 
		width: width,
		height: height,
		left: left, 
	    top: top,
		title : titleMsg,
		close:function() {
			return true;
		},
		content : 'url:' + url
	});
}


/**
 * 含子页面的最大化对话框(需指定URL)
 * 
 * @param url
 *            子页面URL
 */
function msgDialogMAX(titleMsg, url,top,idValue) {
	$.dialog({
		id:idValue,
		lock: true, 
	    background: '#FFF', /* 背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */ 
	    opacity: 0.5,/* 透明度 */ 
	    top: top,
		title : titleMsg,
		close:function() {
			return true;
		},
		content : 'url:' + url
	}).max();
}

/***
 * 删除方法
 * @param requestJson
 * @param serviceUrl
 * @param title
 */
function delfun(requestJson,serviceUrl,title){
	var xmlhttp = DefXmlHttp();
	xmlhttp.open("post",serviceUrl,true); 
	//组装列表显示结果
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var reponse = eval('(' + xmlhttp.responseText + ')');
				if(null != reponse.errMsg
						&& reponse.errMsg != ""){
					errorDialog(title,reponse.errMsg);
				} else {
					//刷新查询
					refreshPage();
				}
			}else if (xmlhttp.status == 404) {  
				errorDialog(title,"Requested URL is not found.");  
	        } else if (xmlhttp.status == 403) {  
	        	errorDialog(title,"Access denied.");  
	        } else  {
	        	errorDialog(title,"status is " + xmlhttp.status);  
	        }
		}
	};
	xmlhttp.send(requestJson);
}

/**
 * 确认对话框
 * 需要覆盖 confirm()、cancel()方法
 * 
 * @param titleMsg
 *            确认对话框标题
 * @param contentMsg
 *            确认对话框内容
 */
function confirmDialog(titleMsg,contentMsg) {
	$.dialog({
		id : 'confirmDialog',
		title : titleMsg,
		icon : 'i.png',
		lock: true, 
		content : contentMsg,
		button : [ {
			name : '是',
			callback : function() {
				//待定的方法
				refreshTable();
				return true;
			},
			focus : true
		}, {
			name : '否',
			callback : function() {
				//待定的方法
				return true;
			}
		} ]
	});
}

/***
 * 右下角弹出框
 * @param title
 * @param msg
 * @param height
 */
function rightFootMsg(title,msg,height){
	var messagerObj = $.messager;
	if(undefined != messagerObj 
			&& null != messagerObj){
		messagerObj.lays(250,'auto');//宽高设置
		messagerObj.show(title,msg,0);
		/**关闭方法	
		*/
		messagerObj.closeRightDialog = function(){
			setTimeout('closeRightFootMsg()',1);
		};
	}
	/*$.dialog.notice({ 
		title: title, 
		height: height,
		width: 250, *//**必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致lhgDialog收缩 *//* 
		background: '#FFF',  背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色  
	    opacity: 0.5,        透明度  
	    top: 0,
		content: msg, 
		time: 15
	});*/
}


/***关闭右下角弹出框方法
 */
function closeRightFootMsg(){
	/**还原宽度
	 * */
	var messagerObj = $.messager;
	if(undefined != messagerObj && null != messagerObj){
		switch(messagerObj.anims.type){
		case 'slide':$("#message").slideUp(messagerObj.anims.speed);break;
		case 'fade':$("#message").fadeOut(messagerObj.anims.speed);break;
		case 'show':$("#message").hide(messagerObj.anims.speed);break;
		default:$("#message").slideUp(messagerObj.anims.speed);break;
	};
	setTimeout('$("#message").remove();', messagerObj.anims.speed);
	messagerObj.original();	
	}
}

/***右下角提示框绑定方法
 */
/*$.dialog.notice = function( options ) { 
	var opts = options || {},api=null, aConfig, hide=0, wrap=0, top,duration = opts.duration || 800; 
	var config = { 
			id: 'Notice', 
			left: '100%', 
			top: '100%', 
			fixed: true, 
			drag: false, 
			resize: false, 
			init: function(here){ 
			api = this; 
			aConfig = api.config; 
			wrap = api.DOM.wrap; 
			top = parseInt(wrap[0].style.top); 
			hide = top + wrap[0].offsetHeight; 
			wrap.css('top', hide + 'px').animate({top: top + 'px'}, duration, function(){ 
				opts.init && opts.init.call(api, here); 
			}); 
			}, 
			close: function(here){
				*//**滑动关闭弹出框
				 * *//*
				wrap.animate({top: hide + 'px'}, duration, function(){ 
					opts.close && opts.close.call(this, here); 
					aConfig.close = $.noop; 
					 closeDialog(api); 
				}); 
				*//**还原宽度
				 * *//*
				var officeFrame = document.getElementById("frameHomePage").contentWindow.document.getElementById("office_frame");
				if(undefined != officeFrame 
						&& null != officeFrame){
					var pageOfficeDiv = officeFrame.contentWindow.document.getElementById("pageOfficeDiv");
					if(undefined != pageOfficeDiv 
							&& null != pageOfficeDiv){
						var rightValue = officeFrame.contentWindow.document.getElementById("rightCorner").value;
						if(parseInt(rightValue)==1){
							var pageOfficeWidth = $(pageOfficeDiv).width();
							$(pageOfficeDiv).width(parseInt(pageOfficeWidth)+250);
							officeFrame.contentWindow.document.getElementById("rightCorner").value="0";
						}
					}
				}
				return false;
			}}; 
	for(var i in opts){ 
		if( config[i] === undefined ) {
			config[i] = opts[i]; 
		}
	}
	return $.dialog( config ); 
};*/
 
/****关闭对话框
 * @param api
 * @param isVisible是否打开office
 */
function closeDialog(api,isVisible){
	/**关闭对话框
	 * */
	if(undefined != api 
			&& null != api){
		api.close();
	}
}


