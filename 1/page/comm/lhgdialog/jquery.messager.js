

(function (jQuery){


	this.version = '@1.3';

	this.layer = {'width' : 200, 'height': 100};

	this.title = '信息提示';

	this.time = 4000;

	this.anims = {'type' : 'slide', 'speed' : 600};
	this.timer1 = null;

	

	this.inits = function(title, text){

		if($("#message").is("div")){ return; }

		$(document.body).prepend('<div id="message" style="z-index:100;width:'+this.layer.width+'px;height:'+this.layer.height+'px;position:absolute; display:none; bottom:0; right:0; overflow:hidden;"><div class="msg_head" style="width:100%;height:30px; font-weight:bold;font-size:14px;overflow:hidden;"><span id="message_close" style="float:right; padding:2px 11px 5px 6px; z-index:3;width:16px;line-height:auto;font-size:22px; color:#cc5f5f; font-weight:bold;text-align:center;cursor:pointer;overflow:hidden;">×</span><div style="padding:8px 0 5px 9px;width:100px;line-height:18px;text-align:left;overflow:hidden;color:#cc5f5f; font-size:14px;">'+title+'</div><div style="clear:both;"></div></div> <div style="padding-bottom:5px;width:100%;height:auto;font-size:12px;" class="msg_body"><div id="message_content" style="margin:0 5px 0 5px; color:#00203b;font-size:12px;width:'+(this.layer.width-17)+'px;height:'+(this.layer.height-50)+'px;text-align:left;overflow:hidden;">'+text+'</div></div></div>');

		

		$("#message_close").click(function(){		

			setTimeout('this.closeRightDialog()', 1);

		});
		//$("#message").hover(function(){
		//	clearTimeout(timer1);
		//timer1 = null;
		//},function(){
		//	timer1 = setTimeout('this.close()', time);
			//alert(timer1);
		//});

	};

	this.show = function(title, text, time){

		if($("#message").is("div")){ return; }

		if(title==0 || !title)title = this.title;

		this.inits(title, text);

		if(time>=0)this.time = time;

		switch(this.anims.type){

			case 'slide':$("#message").slideDown(this.anims.speed);break;

			case 'fade':$("#message").fadeIn(this.anims.speed);break;

			case 'show':$("#message").show(this.anims.speed);break;

			default:$("#message").slideDown(this.anims.speed);break;

		}

		if($.browser.is=='chrome'){

			setTimeout(function(){

				$("#message").remove();

				this.inits(title, text);

				$("#message").css("display","block");

			},this.anims.speed-(this.anims.speed/5));

		}

		//$("#message").slideDown('slow');

		this.rmmessage(this.time);

	};

	this.lays = function(width, height){

		if($("#message").is("div")){ return; }

		if(width!=0 && width)this.layer.width = width;

		if(height!=0 && height)this.layer.height = height;

	}

	this.anim = function(type,speed){

		if($("#message").is("div")){ return; }

		if(type!=0 && type)this.anims.type = type;

		if(speed!=0 && speed){

			switch(speed){

				case 'slow' : ;break;

				case 'fast' : this.anims.speed = 200; break;

				case 'normal' : this.anims.speed = 400; break;

				default:					

					this.anims.speed = speed;

			}			

		}

	}

	this.rmmessage = function(time){

		if(time>0){

			timer1 = setTimeout('this.closeRightDialog()', time);

			//setTimeout('$("#message").remove()', time+1000);

		}

	};
	this.closeRightDialog = function(){
		switch(this.anims.type){
			case 'slide':$("#message").slideUp(this.anims.speed);break;
			case 'fade':$("#message").fadeOut(this.anims.speed);break;
			case 'show':$("#message").hide(this.anims.speed);break;
			default:$("#message").slideUp(this.anims.speed);break;
		};
		setTimeout('$("#message").remove();', this.anims.speed);
		this.original();	
	}

	this.original = function(){	

		this.layer = {'width' : 200, 'height': 100};

		this.title = '信息提示';

		this.time = 4000;

		this.anims = {'type' : 'slide', 'speed' : 600};

	};

    jQuery.messager = this;

    return jQuery;

})(jQuery);