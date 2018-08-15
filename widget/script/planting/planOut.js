var sendFarmId=""
// var landList=[]
var processList=[]
apiready=function(){
	//window.onerror=function(){return true}
	// var header = $api.byId('header');
	//   $api.fixStatusBar(header);
	//   var headerH = $api.offset(header).h;
	//   $("body").css({"paddingTop":headerH+"px"});
	// 	$("#planIn").on("touchstart",function(){
	// 		api.closeWin();
	// 	})
		var fixBar = $api.byId('fixBar');
		var fixBarH = $api.offset(fixBar).h;
		var systemType = api.systemType;
		if(systemType=="ios"){
			$("h4").css("fontWeight","bold")
			$("input").focus(function(){
				$("#fixBar").hide()
			}).blur(function(){
				$("#fixBar").show()
			})
			$("textarea").focus(function(){
				$("#fixBar").hide()
			}).blur(function(){
				$("#fixBar").show()
			})
		}
		$("article").height(api.pageParam.gao-fixBarH)
		if($api.getStorage('a'+$api.getStorage("userId"))){
			huixian()
		}else{
			init()
			getToday()
		}

		$("#proId").on("touchstart",function(){
			if(!$("#cropId").val()){
				alert("请点击选择作物名称")
				return
			}
			if(!$("#proId").html()){
				alert("请完善PC端数据")
			}
		})
		// $("#landName").on("touchstart",function(){
		// 	if(!landList||landList.length==0){
		// 		return false
		// 	}
		// 	mui.init()
		// 	var texts = $(this)
		// 	var picker = new mui.PopPicker();
		// 		picker.setData(landList);
		// 		//landList=null
		// 		picker.show(function (selectItems) {
		// 			 $("#landId").val(selectItems[0].value);
		// 			 $("#landName").val(selectItems[0].text);
		// 			 picker.dispose()
		// 		 })
		// })
		$("#mu").on("change",function(){
			$("#mu").val(Math.abs($("#mu").val()))
		})
		$("#executor").on("click",function(){
			api.openWin({
				name : 'staffList_win',
				url : '../fieldManage/staffList_win.html',
				pageParam: {
					planOut: 1
				}
			});
		})
		$("#cropName").on("click",function(){
			if(!sendFarmId){
				return
			}
			api.openWin({
				name : 'cropSelect_win',
				url : './cropSelect_win.html',
				pageParam: {
						farmId: sendFarmId,
						pageParam: 1
				}
		});
	});
	// $("#proName").on("touchstart",function(){
	// 	if(!processList||processList.length==0){
	// 		return false
	// 	}
	// 	mui.init()
	// 	var texts = $(this)
	// 	var picker = new mui.PopPicker();
	// 		picker.setData(processList);
	// 		//landList=null
	// 		picker.show(function (selectItems) {
	// 			 $("#proId").val(selectItems[0].value);
	// 			 $("#proName").val(selectItems[0].text);
	// 			 picker.dispose()
	// 		 })
	// })
// 调用事件插件
	$("#time1").bind("touchstart",function(){
			$("#time1").unbind("touchstart")
			mui.init()
			var texts = $( '#date1' )
			texts.on( 'tap', function () {
					api.setFrameAttr( {
					 name: 'record_frm',//固定日历控件
					 bounces: false
					} )

					var dtpicker = new mui.DtPicker( {
					 type: 'date', //设置日历初始视图模式
					 labels: [ '年', '月', '日' ], //设置默认标签区域提示语
					} )
					dtpicker.show(function(rs){
					 //console.log( JSON.stringify( rs ) );
					 var dateValue = JSON.parse(JSON.stringify( rs ));

					 //console.log(dateValue.value);
					 var beginDate=rs.y.text + '-' + rs.m.text + '-' + rs.d.text;
					 var endDate=$("#date2").val();
					 var d1 = new Date(beginDate.replace(/\-/g, "\/"));
					 var d2 = new Date(endDate.replace(/\-/g, "\/"));

					 if(beginDate!=""&&endDate!=""&&d1 >d2)
					 {
						alert("开始时间不能大于完成时间！");
						return false;
					 }
					 texts.val(rs.y.text + '-' + rs.m.text + '-' + rs.d.text)

					 dtpicker.dispose()
					 api.setFrameAttr( {
						 name: 'record_frm',
						 bounces: true
					 } )
					} )
		} )
	})
		$("#time2").on("touchstart",function(){
			$("#time2").unbind("touchstart")
			mui.init()
			var texts = $( '#date2' )
			texts.on( 'tap', function () {
					api.setFrameAttr( {
					 name: 'record_frm',//固定日历控件
					 bounces: false
					} )

					var dtpicker = new mui.DtPicker( {
					 type: 'date', //设置日历初始视图模式
					 labels: [ '年', '月', '日' ], //设置默认标签区域提示语
					} )
					dtpicker.show(function(rs){
					 //console.log( JSON.stringify( rs ) );
					 var dateValue = JSON.parse(JSON.stringify( rs ));

					 //console.log(dateValue.value);
					 var beginDate=$("#date1").val();
					 var endDate=rs.y.text + '-' + rs.m.text + '-' + rs.d.text;
					 var d1 = new Date(beginDate.replace(/\-/g, "\/"));
					 var d2 = new Date(endDate.replace(/\-/g, "\/"));

					if(beginDate!=""&&endDate!=""&&d1 >d2)
					 {
						alert("开始时间不能大于完成时间！");
						return false;
					 }
					 texts.val(rs.y.text + '-' + rs.m.text + '-' + rs.d.text)

					 dtpicker.dispose()
					 api.setFrameAttr( {
						 name: 'record_frm',
						 bounces: true
					 })
					})
		})
	})

	var show;
	$("#btnfield").on("click",function(){
		var num=$(this).index()
		if(show){
			$("#btnfield").prev().show()
			show=null
		}else{
			$("#btnfield").before($(this).prev().clone())
			$(this).prev().find('.resourceList').html("资源"+num).attr("id","i"+num)
			$(this).prev().find(":input").each(function(){
					$(this).val("");
			});
			$(this).prev().find(".renTian").html("")
			$(this).prev().find(".mu").html("")
		}
	})

	$(".resource").on("click",".det",function(){
		var r=confirm("确定删除该资源吗？")
		if (r==false){
			 return
		}
		var num=$(".resourceList").length
		if(num>1){
			$(this).parent().parent().remove()
			for(var i=0; i<num; i++){
				$(".resourceList").eq(i).html("资源"+(i+1)).attr("id","i"+(i+1))
			}
		}else{
			$(this).parent().parent().find(":input").each(function(){
					$(this).val("");
			});
			$(this).parent().parent().hide()
			$(this).parent().parent().find(".renTian").html("")
			$(this).parent().parent().find(".mu").html("")
			show=1
		}
	})
	$(".resource").on("click","input[name='reName']",function(){
			api.openWin({
				name : 'resourceSelect_win',
				url : './resourceSelect_win.html',
				pageParam: {
						iptIndex: $(this).parent().parent().prev().find(".resourceList").html().replace(/[^0-9]/ig,""),
						param:1
				}
		});
	})
	$("#confirm").on("click", function(){
			if(!$("#farmId").val()){
				alert("请选择基地名称")
				return
			}
			if(!$("#landId").val()){
				alert("请选择地块名称")
				return
			}
			if(!$("#cropName").val()){
				alert("请选择作物名称")
				return
			}
			if(!$("#mu").val()){
				alert("请填写执行面积")
				return
			}
			if(parseInt($("#mu").val())>parseInt($("#muShu").val())){
				alert("填写面积不能大于"+$("#muShu").val()+"亩")
				return
			}
			if(parseFloat($("#mu").val())==0){
				alert("填写面积不能为0亩")
				return
			}
			if(!$("#proId").val()){
				alert("请选择工序名称")
				return
			}
			if(!$("#exrId").val()){
				alert("请选择执行人")
				return
			}
			if(!$("#date1").val()){
				alert("请选择开始时间")
				return
			}
			if(!$("#date2").val()){
				alert("请选择完成时间")
				return
			}
			if(!show){
					var inl=$("input[name='reName']").length
					for(var i=0; i<inl; i++){
						if($("input[name='reName']").eq(i).val()||$("input[name='reNeed']").eq(i).val()||$("input[name='rePrice']").eq(i).val()){
							if(!$("input[name='reName']").eq(i).val()){
								alert("请完善资源名称")
								return
							}
							if(!$("input[name='reNeed']").eq(i).val()){
								alert("请完善计划用量")
								return
							}
							if(!$("input[name='rePrice']").eq(i).val()){
								alert("请完善资源单价")
								return
							}
						}
					}
			}
			var buriedPoint = pds.buriedPoint();
	    buriedPoint.pageId = 'page_unplanned_admin';
	    buriedPoint.eventId = 'button_want_to_send_page_unplanned_admin';
	    pds.ajaxSubmit({
	    url:"app/buried_point/save",
	    data:{"point":buriedPoint},
	    success:function(v){

	    }
	  })
		  var r=confirm("确定立即派单吗？")
			if (r==false){
				 return
			}
			submit(2)
	})
	$("#save").on("click",function(){
		if(parseInt($("#mu").val())>parseInt($("#muShu").val())){
			alert("填写面积不能大于"+$("#muShu").val()+"亩")
			return
		}
		if(parseInt($("#mu").val())==0){
			alert("填写面积不能为0亩")
			return
		}
		var buriedPoint = pds.buriedPoint();
	  buriedPoint.pageId = 'page_unplanned_admin';
	  buriedPoint.eventId = 'button_want_to_save_drafts_page_unplanned_admin';
	  pds.ajaxSubmit({
	  url:"app/buried_point/save",
	  data:{"point":buriedPoint},
	  success:function(v){

	  }
	})
	var r=confirm("确定保存为草稿吗？")
		if (r==false){
			 return
		}
		submit(1)
	})
	function submit(n){
		var obj={}
		obj.flag=n
		obj.isBlackFlag=1
		obj.workOrderData={}
		obj.workOrderData.name=$("#proId").find("option:selected").text();
		obj.workOrderData.farmId=$("#farmId").val()
		obj.workOrderData.executorId=$("#exrId").val()
		obj.workOrderData.executorName=$("#executor").val()
		obj.workOrderData.checkerId=$("#exrId").val()
		obj.workOrderData.categoryId=$("#cropId").val()
		obj.workOrderData.landId=$("#landId").val()
		obj.workOrderData.plantArea=$("#mu").val()
		var object={}
		object.standards=$("#standards").val().trim()
		object.startDate=$("#date1").val()
		object.endDate=$("#date2").val()
		object.processId=$("#proId").val()
		obj.processData=object

		if(!show){
			var inl=$("input[name='reName']").length,arr=[]
			if(n==2){
				for(var i=0; i<inl; i++){
					if(!$("input[name='reNeed']").eq(i).val()||!$("input[name='resTotalUnit']").eq(i).val()||!$("input[name='reId']").eq(i).val()||!$("input[name='rePrice']").eq(i).val()||!$("input[name='reUnit']").eq(i).val()){
						continue
					}
						var ob={}
						ob.resTotal=$("input[name='reNeed']").eq(i).val()
						ob.costValUnit=$("input[name='resTotalUnit']").eq(i).val()
						ob.resourceId=$("input[name='reId']").eq(i).val()
						ob.costVal=$("input[name='rePrice']").eq(i).val()
						ob.resTotalUnit=$("input[name='reUnit']").eq(i).val()
						arr.push(ob)
						ob=null
					}
			}
			if(n==1){
					for(var i=0; i<inl; i++){
							var ob={}
							ob.resTotal=$("input[name='reNeed']").eq(i).val()
							ob.costValUnit=$("input[name='resTotalUnit']").eq(i).val()
							ob.resourceId=$("input[name='reId']").eq(i).val()
							ob.costVal=$("input[name='rePrice']").eq(i).val()
							ob.resTotalUnit=$("input[name='reUnit']").eq(i).val()
							arr.push(ob)
							ob=null
						}
			}
			obj.resourceDataList=arr
	  }
		//alert(JSON.stringify(obj))
		var o={}
		o.farmId=$("#farmId").val()
		o.executorId=$("#exrId").val()
		o.executorName=$("#executor").val()
		o.categoryId=$("#cropId").val()
		o.categoryName=$("#cropName").val()
		o.landId=$("#landId").val()
		o.area=$("#mu").val()
		o.mu=$("#muShu").val()
		o.standards=$("#standards").val().trim()
		o.startDate=$("#date1").val()
		o.endDate=$("#date2").val()
		o.processId=$("#proId").val()
		o.processName=$("#proName").val()

		if(!show){
				var inl=$("input[name='reName']").length,arr=[]
				for(var i=0; i<inl; i++){
					if(!$("input[name='reNeed']").eq(i).val()||!$("input[name='resTotalUnit']").eq(i).val()||!$("input[name='reId']").eq(i).val()||!$("input[name='rePrice']").eq(i).val()||!$("input[name='reUnit']").eq(i).val()){
						continue
					}
						var ob={}
						ob.resName=$("input[name='reName']").eq(i).val()
						ob.resourceId=$("input[name='reId']").eq(i).val()

						ob.resTotal=$("input[name='reNeed']").eq(i).val()
						ob.costValUnit=$("input[name='resTotalUnit']").eq(i).val()
						ob.costValUnitName=$(".renTian").eq(i).html()

						ob.costVal=$("input[name='rePrice']").eq(i).val()
						ob.resTotalUnit=$("input[name='reUnit']").eq(i).val()
						ob.resTotalUnitName=$(".mu").eq(i).html()
						arr.push(ob)
						ob=null
					}
				o.resourceDataList=arr
		}
		$api.setStorage('a'+$api.getStorage("userId"),JSON.stringify(o));
		pds.ajaxSubmit({
					url : "app/plant/insertWorkOrder",
					data:{
						"data" : JSON.stringify(obj)
					},
					success : function(e) {
						if(n==2){
							api.alert({
								msg : "该工单已派发!"
							},function(){
								var buriedPoint = pds.buriedPoint();
	           	 buriedPoint.pageId = 'page_unplanned_admin';
	           	 buriedPoint.eventId = 'button_send_page_unplanned_admin';
	             	pds.ajaxSubmit({
	             		url:"app/buried_point/save",
	             		data:{"point":buriedPoint},
	             		success:function(v){

	             		}
	             	})
								api.openWin({
										name: 'plantDetail_list_win',
										url: '../home/plantDetail/plantDetail_list_win.html',
										pageParam : {
											id : "CONFIRMING"
										},
										animation : {
											type : "movein", //动画类型（详见动画类型常量）
											subType : "from_right", //动画子类型（详见动画子类型常量）
											duration : 300 //动画过渡时间，默认300毫秒
										}
								});
							});
						}
						if(n==1){
							api.alert({
								msg : "该工单已保存为草稿!"
							},function(){
								var buriedPoint = pds.buriedPoint();
	           	 buriedPoint.pageId = 'page_unplanned_admin';
	           	 buriedPoint.eventId = 'button_save_drafts_page_unplanned_admin';
	             	pds.ajaxSubmit({
	             		url:"app/buried_point/save",
	             		data:{"point":buriedPoint},
	             		success:function(v){

	             		}
	             	})
								api.openWin({
										name: 'plantDetail_list_win',
										url: '../home/plantDetail/plantDetail_list_win.html',
										pageParam : {
											id : "DRAFT"
										},
										animation : {
											type : "movein", //动画类型（详见动画类型常量）
											subType : "from_right", //动画子类型（详见动画子类型常量）
											duration : 300 //动画过渡时间，默认300毫秒
										}
								});
							});
						}
					},
					error : function(e) {
						api.alert({
							msg : "服务器异常，请联系管理员!!!"
						});
					}
		});
	}
}
function land(){
	sendFarmId=$("#farmId").val()
	$("#cropId").val("")
	$("#cropName").val("")
	$("#cropName").val("")
	$("#proId").val("")
	pds.ajaxSubmit({
					 url:'app/staff/farmland/land_list',
					 type : "GET",
					 data:{farmId:$("#farmId").val()},
					 success:function(ret,err){
						 //api.alert({msg:JSON.stringify(ret)});
						 if(!ret.data.length){
							 return
						 }
						 //alert(ret.data.length)
						 var op=''
						 for(var i=0;i<ret.data.length;i++){
								 op+='<option value='+ret.data[i].id+' >'+ret.data[i].name+'</option>'
						 }
						 $("#landId").html(op)
						 op=null
						 pds.ajaxSubmit({
											 url:'app/farmland/findLandArea',
											 type : "GET",
											 data:{id:ret.data[0].id},
										 	 success:function(ret,err){
												 ret.data.landAreas=ret.data.landAreas||"0"
												 $("#mu").val(ret.data.landAreas)
												 $("#muShu").val(ret.data.landAreas)
											 },
	 						 				 error:function(e){
	 						 						api.alert({msg:"服务器异常，请联系管理员!"});
	 						 				 }
 						 			});
						},
	 				 error:function(e){
	 						api.alert({msg:"服务器异常，请联系管理员!"});
	 				 }
	 			});
}
function mian(dom){
	$("#proId").val("")
	$("#proId").html("")
	pds.ajaxSubmit({
			url:'app/plant/catProcess',
			type : "GET",
			data:{catId:$("#cropId").val(),landId:$(dom).val()},
			success:function(ret,err){
				//api.alert({msg:JSON.stringify(ret)});
				if(!ret.data.length){
					return
				}
				var op=''
				for(var i=0;i<ret.data.length;i++){
						op+='<option value='+ret.data[i].id+' >'+ret.data[i].proName+'</option>'
				}
				$("#proId").html(op)
				op=null
			},
			error:function(e){
				 api.alert({msg:"服务器异常，请联系管理员!"});
			}
	 });
	 pds.ajaxSubmit({
					 url:'app/farmland/findLandArea',
					 type : "GET",
					 data:{id:$(dom).val()},
				 	 success:function(ret,err){
						 ret.data.landAreas=ret.data.landAreas||"0"
						 $("#mu").val(ret.data.landAreas)
						 $("#muShu").val(ret.data.landAreas)
					 },
 					error:function(e){
 						 api.alert({msg:"服务器异常，请联系管理员!"});
 					}
 			 });
}
// function process(id){
// 	 api.ajax({
// 		 url:pds.defaultUri + 'app/commons/catProcess',
// 		 data:{values:{catId:id}}
// 	 },function(ret,err){
// 		 if (ret) {
// 			 if(!ret.data.length){
// 					return
// 				}
// 				processList=[]
// 				for(var i=0;i<ret.data.length;i++){
// 							processList.push({
// 								value:ret.data[i].id,   //mui给的例子中只写了value和text。实际上我们可以写很多自己命名的变量
// 								text:ret.data[i].proName
// 					})
// 				}
// 		 } else {
// 			 api.alert({msg:JSON.stringify(err)});
// 		 };
// 	 });
// }
function process(id,name){
	  $("#proId").val("")
		$("#proId").html("")
		$("#cropId").val(id)
		$("#cropName").val(name)
		pds.ajaxSubmit({
			 url:'app/plant/catProcess',
			 type : "GET",
			 data:{catId:id,landId:$("#landId").val()},
		 	 success:function(ret,err){
				 //api.alert({msg:JSON.stringify(ret)});
				 if(!ret.data.length){
					 return
				 }
				 var op=''
				 for(var i=0;i<ret.data.length;i++){
						 op+='<option value='+ret.data[i].id+' >'+ret.data[i].proName+'</option>'
				 }
				 $("#proId").html(op)
				 op=null
			 },
			 error:function(e){
					api.alert({msg:"服务器异常，请联系管理员!"});
			 }
		});
}
 function getExecutor(){
	 var employInfo = $api.getStorage('employInfo');
	 //alert(JSON.stringify(employInfo))
	 $("#executor").val(employInfo.employName);
	 $("#exrId").val(employInfo.employId);
 };
 function resource(id,name,resCostUnitName,resUnitName,resCostUnit,resUnit,index){
	$("#i"+index).parent().next().find("input[name='reName']").val(name)
	$("#i"+index).parent().next().find("input[name='reId']").val(id)
	$("#i"+index).parent().parent().find("input[name='resTotalUnit']").val(resCostUnit)
	$("#i"+index).parent().parent().find("input[name='reUnit']").val(resUnit)
	$("#i"+index).parent().parent().find(".renTian").html(resUnitName)
	$("#i"+index).parent().parent().find(".mu").html(resCostUnitName)
}
	function getToday(){
		var d = new Date(), y = d.getFullYear(), m = d.getMonth() + 1, r = d.getDate();
		m < 10 ? m = "0" + m : m;
		r < 10 ? r = "0" + r : r;
		$("#date1").val( y + "-" + m + "-" + r)
	}
	function huixian(){
			//alert($api.getStorage('shuju'))
			var data=JSON.parse($api.getStorage('a'+$api.getStorage("userId")))
			sendFarmId=data.farmId
			pds.ajaxSubmit({
				url: 'app/staff/farmland/get_farm_list',
				type : "GET",
				//data:{values:{farmId:api.pageParam.farmId}}
				success:function(ret){
					//api.alert({msg:JSON.stringify(ret)});
					if(!ret.data.length){
						return
					}
					//alert(ret.data.length)
					var op=''
					for(var i=0;i<ret.data.length;i++){
							op+='<option value='+ret.data[i].id+' >'+ret.data[i].farmName+'</option>'
					}
					$("#farmId").html(op)
					$("#farmId").val(data.farmId)

					op=null
				},
				error:function(e){
					 api.alert({msg:"服务器异常，请联系管理员!"});
				}
		  });
			pds.ajaxSubmit({
							 url:'app/staff/farmland/land_list',
							 type : "GET",
							 data:{farmId:data.farmId},
						 	 success:function(ret,err){
								 //api.alert({msg:JSON.stringify(ret)});
								 if(!ret.data.length){
									 return
								 }
								 //alert(ret.data.length)
								 var op=''
								 for(var i=0;i<ret.data.length;i++){
										 op+='<option value='+ret.data[i].id+' >'+ret.data[i].name+'</option>'
								 }
								 $("#landId").html(op)
								 $("#landId").val(data.landId)
								 //alert("22222data.categ????????????????oryId:"+data.categoryId)
					 			//alert("22222landId:"+$("#landId").val())
					 			pds.ajaxSubmit({
					 				url:'app/plant/catProcess',
					 				type : "GET",
					 				data:{catId:data.categoryId,landId:data.landId},
					 				success:function(ret,err){
					 					api.hideProgress();
					 					if(!ret.data.length){
					 						return
					 					}
					 					var op=''
					 					for(var i=0;i<ret.data.length;i++){
					 							op+='<option value='+ret.data[i].id+' >'+ret.data[i].proName+'</option>'
					 					}
					 					$("#proId").html(op)
					 					$("#proId").val(data.processId)
					 					op=null
					 				},
					 			 error:function(e){
					 					api.alert({msg:"服务器异常，请联系管理员!"});
					 			 }
					 		  });
								 op=null
							 },
 							error:function(e){
 								 api.alert({msg:"服务器异常，请联系管理员!"});
 							}
 					  });
			$("#cropName").val(data.categoryName)
			$("#cropId").val(data.categoryId)

			$("#date1").val(data.startDate)
			$("#date2").val(data.endDate)
			$("#standards").val(data.standards.trim())
			$("#executor").val(data.executorName)
			$("#exrId").val(data.executorId)
			$("#mu").val(data.area)
			$("#muShu").val(data.mu)
			if(data.resourceDataList.length){
					var re=data.resourceDataList,l=re.length,rel=""
					for( i=0; i<l; i++){
						if(data.resourceDataList[0]==null){
								 break
						}
						rel+='<div><p class="resource-p"><span id=i'+(i+1)+' class="resourceList" >资源'+(i+1)+'</span><span class="det">删除</span></p>'+
							 '<p><span>资源名称：</span><span><input name="reName" type="text" readonly value='+re[i].resName+' ><input name="reId" type="hidden" value='+re[i].resourceId+' ><i></i></span></p>'+
							 '<p><span>资源用量：</span><span><input name="reNeed" type="number" value='+re[i].resTotal+' ><input name="resTotalUnit" type="hidden" value='+re[i].costValUnit+' ><i class="renTian">'+re[i].costValUnitName+'</i></span></p>'+
							 '<p><span>资源单价：</span><span><input name="rePrice" type="number" value='+re[i].costVal+' ><input name="reUnit" type="hidden" value='+re[i].resTotalUnit+' ><i class="mu">'+re[i].resTotalUnitName+'</i></span></p></div>'
					}
					if(re[0]!=null||!l){
						$("#btnfield").prev().remove()
						$("#btnfield").before(rel)
					}else{
						$("#btnfield").prev().hide()
						$("#show").val("1")
					}
					rel=null
			 }
	}
function init(){
	// api.showProgress({
	// 		title: '努力加载中...',
	// 		text: '先喝杯茶...',
	// 		modal: true
	// });
	pds.ajaxSubmit({
		url:'app/staff/farmland/get_farm_list',
		type : "GET",
		//data:{values:{farmId:api.pageParam.farmId}}
		success:function(ret,err){
			//api.alert({msg:JSON.stringify(ret)});
			if(!ret.data.length){
				return
			}
			//alert(ret.data.length)
			var op=''
			for(var i=0;i<ret.data.length;i++){
					op+='<option value='+ret.data[i].id+' >'+ret.data[i].farmName+'</option>'
			}
			$("#farmId").html(op)
			op=null
			sendFarmId=$("#farmId").val()
			pds.ajaxSubmit({
							 url:'app/staff/farmland/land_list',
							 type : "GET",
							 data:{farmId:ret.data[0].id},
						 	 success:function(ret,err){
								 //api.alert({msg:JSON.stringify(ret)});
								 if(!ret.data.length){
									 return
								 }
								 //alert(ret.data.length)
								 var op=''
								 for(var i=0;i<ret.data.length;i++){
										 op+='<option value='+ret.data[i].id+' >'+ret.data[i].name+'</option>'
								 }
								 $("#landId").html(op)

								 pds.ajaxSubmit({
									 url:'app/crop/categoryList',
									 type : "GET",
									 data:{farmId:ret.data[0].id},
									 success:function(ret,err){
									 //alert(JSON.stringify(ret))
										 if(ret.data.length==0){
											 return
										 }
										 pds.ajaxSubmit({
											 url:'app/crop/findCategoryList',
											 type : "GET",
											 data:{id:ret.data[0].id},
											 success:function(ret){
												 if(!ret.data.length){
													 return
												 }
												 //alert(JSON.stringify(ret))
												 $("#cropName").val(ret.data[0].catName)
												 $("#cropId").val(ret.data[0].id)
												 pds.ajaxSubmit({
													 url:'app/plant/catProcess',
													 type : "GET",
													 data:{catId:ret.data[0].id,landId:$("#landId").val()},
													 success:function(ret,err){
														 // api.hideProgress();
														 if(!ret.data.length){
															 $("#proId").html("")
															 return
														 }
														 var op=''
														 for(var i=0;i<ret.data.length;i++){
																 op+='<option value='+ret.data[i].id+' >'+ret.data[i].proName+'</option>'
														 }
														 $("#proId").html(op)

														 op=null
														 },
														error:function(e){
															 api.alert({msg:"服务器异常，请联系管理员!"});
														}
												 });
											 },
											 error:function(e){
													api.alert({msg:"服务器异常，请联系管理员!"});
											 }
										});
									 },
									 error:function(e){
											api.alert({msg:"服务器异常，请联系管理员!"});
									 }
								});


								 op=null
								 pds.ajaxSubmit({
											url:'app/farmland/findLandArea',
											type : "GET",
											data:{id:ret.data[0].id},
											success:function(ret,err){
												ret.data.landAreas=ret.data.landAreas||"0"
												$("#mu").val(ret.data.landAreas)
												$("#muShu").val(ret.data.landAreas)
											},
						 				 error:function(e){
						 						api.alert({msg:"服务器异常，请联系管理员!"});
						 				 }
					 			});
							 },
							 error:function(e){
									api.alert({msg:"服务器异常，请联系管理员!"});
							 }
						});

		},
		error:function(e){
			 api.alert({msg:"服务器异常，请联系管理员!"});
		}
	});
}
function cc(){
	 var e = event.srcElement;
	 var r =e.createTextRange();
	 r.moveStart('character',e.value.length);
	 r.collapse(true);
	 r.select();
}
window.confirm = function (message) {
	 var iframe = document.createElement("IFRAME");
	 iframe.style.display = "none";
	 iframe.setAttribute("src", 'data:text/plain,');
	 document.documentElement.appendChild(iframe);
	 var alertFrame = window.frames[0];
	 var result = alertFrame.window.confirm(message);
	 iframe.parentNode.removeChild(iframe);
	 return result;
 };
