var sendFarmId=""
// var landList=[]
var processList=[]
apiready=function(){
  window.onerror=function(){return true}
  // var header = $api.byId('header');
  //   $api.fixStatusBar(header);
  //   var headerH = $api.offset(header).h;
  //   $("body").css({"paddingTop":headerH+"px"});
  //   $("#planIn").on("touchstart",function(){
  //     api.closeWin();
  //   })
    var systemType = api.systemType;
    if(systemType=="ios"){
      $("h4").css("fontWeight","bold")
    }
    //alert(api.pageParam.plantDetailId)
    detail(api.pageParam.plantDetailId)

    $("#executorName").on("click",function(){
      api.openWin({
        name : 'staffList_win',
        url : '../fieldManage/staffList_win.html',
        pageParam: {
          planOut: 5
        }
      });
    })
    $("#categoryName").on("click",function(){
      if(!sendFarmId){
        alert("请点击选择基地名称")
        return
      }
      api.openWin({
        name : 'cropSelect_win',
        url : './cropSelect_win.html',
        pageParam: {
            farmId: sendFarmId,
            pageParam: 2
        }
    });
  });
// 调用事件插件
  $("#mu").on("change",function(){
    $("#mu").val(Math.abs($("#mu").val()))
  })
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


  $("#btnfield").on("click",function(){
    var num=parseInt($(this).prev().find('.resourceList').html().replace(/[^0-9]/ig,""))+1
    if($("#show").val()==1){
      $("#btnfield").prev().show()
      $("#show").val("0")
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
      $("#show").val("1")
    }
  })
  $(".resource").on("click","input[name='reName']",function(){
      api.openWin({
        name : 'resourceSelect_win',
        url : './resourceSelect_win.html',
        pageParam: {
            iptIndex: $(this).parent().parent().prev().find(".resourceList").html().replace(/[^0-9]/ig,""),
            param:5
        }
    });
  })
}
// var farmData=null
// $("#farmId").on("click",function(){
//   if(farmData){
//     return
//   }
//   var farm=$("#farmId").val()
//   api.showProgress({
//       title: '努力加载中...',
//       text: '先喝杯茶...',
//       modal: true
//   });
//   api.ajax({
//          headers : {
//             authorization : $api.getStorage("userId") == undefined? null : $api.getStorage("userId")
//          },
//            url:pds.defaultUri + 'app/staff/farmland/get_farm_list',
//          },function(ret,err){
//            if (ret) {
//              //api.alert({msg:JSON.stringify(ret)});
//              api.hideProgress();
//              if(!ret.data.length){
//                return
//              }
//              farmData=ret
//              //alert(ret.data.length)
//              var op=''
//              for(var i=0;i<ret.data.length;i++){
//                 op+='<option value='+ret.data[i].id+' >'+ret.data[i].farmName+'</option>'
//             }
//             $("#farmId").html(op)
//             if(farm){
//               $("#farmId").val(farm)
//             }
//             op=null
//          } else {
//            api.alert({msg:JSON.stringify(err)});
//          };
//        })
// })
// $("#landId").on("click",function(){
//   var di=$("#landId").val()
//   if(!$("#farmId").val()){
//     alert("请选择基地名称")
//     return
//   }
//   if(!landData){
//     return
//   }
//   sendFarmId=$("#farmId").val()
//   api.showProgress({
//       title: '努力加载中...',
//       text: '先喝杯茶...',
//       modal: true
//   });
//   api.ajax({
//            url:pds.defaultUri + 'app/staff/farmland/land_list',
//            data:{values:{farmId:$("#farmId").val()}}
//          },function(ret,err){
//            if (ret) {
//              //api.alert({msg:JSON.stringify(ret)});
//              api.hideProgress();
//              if(!ret.data.length){
//                return
//              }
//              //alert(ret.data.length)
//              var op=''
//              for(var i=0;i<ret.data.length;i++){
//                  op+='<option value='+ret.data[i].id+' >'+ret.data[i].name+'</option>'
//              }
//              $("#landId").html(op)
//              $("#landId").val(di)
//              op=null
//          } else {
//            api.alert({msg:JSON.stringify(err)});
//          };
//        })
// })
$("#proId").on("click",function(){
  if(!$("#categoryId").val()){
    $("#proId").html('')
    alert("请选择作物名称")
    return
  }
  if(!$("#proId").val()){
    alert("请完善PC端信息")
    return
   }
  if(prs){
    return
  }
  pds.ajaxSubmit({
         url:'app/plant/catProcess',
         type : "GET",
         data:{catId:$("#categoryId").val(),landId:$("#landId").val()},
         success:function(ret,err){
           //api.alert({msg:JSON.stringify(ret)});
           if(!ret.data.length){
             $("#proId").html("")
             return
           }
           //alert(ret.data.length)
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
})
var prs=null
function process(id,name){
    prs=1
    $("#proId").val("")
    $("#proId").html("")
    $("#categoryId").val(id)
    $("#categoryName").val(name)
       pds.ajaxSubmit({
       url:'app/plant/catProcess',
       type : "GET",
       data:{catId:id,landId:$("#landId").val()},
       success:function(ret,err){
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
   $("#executorName").val(employInfo.employName);
   $("#executorId").val(employInfo.employId);
 };
 function resource(id,name,resCostUnitName,resUnitName,resCostUnit,resUnit,index){
  $("#i"+index).parent().next().find("input[name='reName']").val(name)
  $("#i"+index).parent().next().find("input[name='reId']").val(id)
  $("#i"+index).parent().parent().find("input[name='resTotalUnit']").val(resCostUnit)
  $("#i"+index).parent().parent().find("input[name='reUnit']").val(resUnit)
  $("#i"+index).parent().parent().find(".renTian").html(resUnitName)
  $("#i"+index).parent().parent().find(".mu").html(resCostUnitName)
}
function detail(d){
   pds.ajaxSubmit({
    url:'app/plant/queryDetails',
    type : "GET",
    // data:{values:{workOrderId:api.pageParam.plantDetailId}}
    data:{workOrderId:d},
    success:function(ret,err){
      // if(!ret.data.length){
      // 	return
      // }
      //alert(JSON.stringify(ret))
      var data=ret.data.baseInfo
      $("#name").val(data.proName)
      $("#workOrderId").val(api.pageParam.plantDetailId)
      sendFarmId=data.farmId
      pds.ajaxSubmit({
               url:'app/staff/farmland/get_farm_list',
               type : "GET",
               success:function(ret,err){
                 //api.alert({msg:JSON.stringify(ret)});
                 if(!ret.data.length){
                   return
                 }
                 farmData=ret
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
                 op=null
               },
     					error:function(e){
     						 api.alert({msg:"服务器异常，请联系管理员!"});
     					}
     			 });
      pds.ajaxSubmit({
    					 url:'app/farmland/findLandArea',
               type : "GET",
    					 data:{id:data.landId},
				       success:function(ret,err){
    						 ret.data.landAreas=ret.data.landAreas||"0"
                 $("#muShu").val(ret.data.landAreas)
               },
     					error:function(e){
     						 api.alert({msg:"服务器异常，请联系管理员!"});
     					}
     			 });
      if(!data.processId){
        $("#proId").html('')
      }else{
        $("#proId").html('<option value='+data.processId+' >'+data.proName+'</option>')
      }
      $("#date1").val(data.planStartDate)
      $("#date2").val(data.planEndDate)
      $("#standards").val(data.standards)
      $("#executorName").val(data.executorName)
      $("#executorId").val(data.executorId)
      $("#mu").val(data.plantArea)
      $("#categoryName").val(data.categoryName)
      $("#categoryId").val(data.categoryId)
      $("#plantPlanId").val(data.plantPlanId)
      $("#plantLandId").val(data.plantLandId)
      if(ret.data.resourceInfos.length){
          var re=ret.data.resourceInfos,l=re.length,rel=""
          for( i=0; i<l; i++){
            //alert(JSON.stringify(re))
            if(re[i]==null){
              continue
            }
            rel+='<div><p class="resource-p"><span id=i'+(i+1)+' class="resourceList" >资源'+(i+1)+'</span><span class="det">删除</span></p>'+
               '<p><span>资源名称：</span><span><input name="reName" type="text" readonly value='+re[i].workerName+' ><input name="reId" type="hidden" value='+re[i].workerResourceId+' ><i></i></span></p>'+
               '<p><span>资源用量：</span><span><input name="reNeed" type="number" value='+re[i].planResTotal+' ><input name="resTotalUnit" type="hidden" value='+re[i].workerResTotalUnit+' ><i class="renTian">'+re[i].workerResTotalUnitName+'</i></span></p>'+
               '<p><span>资源单价：</span><span><input name="rePrice" type="number" value='+re[i].workerCostVal+' ><input name="reUnit" type="hidden" value='+re[i].workerCostValUnit+' ><i class="mu">'+re[i].workerCostValUnitName+'</i></span></p></div>'
          }
          if(re[0]!=null){
            $("#btnfield").prev().remove()
            $("#btnfield").before(rel)
          }else{
            $("#btnfield").prev().hide()
            $("#show").val("1")
          }
          rel=null
       }else{
         $("#btnfield").prev().hide()
         $("#show").val("1")
       }
     },
    error:function(e){
       api.alert({msg:"服务器异常，请联系管理员!"});
    }
 });
}
var landData=1
function land(){
  landData=null
  sendFarmId=$("#farmId").val()
  $("#categoryName").val("")
  $("#categoryId").val("")
  $("#proId").val("")
  pds.ajaxSubmit({
           url:'app/staff/farmland/land_list ',
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
             api.ajax({
                       url:pds.defaultUri + 'app/farmland/findLandArea',
                       data:{values:{id:ret.data[0].id}}
                     },function(ret,err){
                       if (ret) {
                         ret.data.landAreas=ret.data.landAreas||"0"
                         $("#mu").val(ret.data.landAreas)
                         $("#muShu").val(ret.data.landAreas)
                     } else {
                         api.alert({msg:JSON.stringify(err)});
                     };
              })
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
      data:{catId:$("#categoryId").val(),landId:$(dom).val()},
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
function cc(){
   var e = event.srcElement;
   var r =e.createTextRange();
   r.moveStart('character',e.value.length);
   r.collapse(true);
   r.select();
}
function conf(){
    if(!$("#farmId").val()){
      alert("请选择基地名称")
      return
    }
    if(!$("#landId").val()){
      alert("请选择地块名称")
      return
    }
    if(!$("#categoryId").val()){
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
    if(parseInt($("#mu").val())==0){
      alert("填写面积不能为0亩")
      return
    }
    if(!$("#proId").val()||$("#proId").val()=="null"){
      alert("请选择工序名称")
      return
    }
    if(!$("#executorId").val()){
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
    if($("#show").val()==0){
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
        buriedPoint.pageId = 'page_draft details_admin';
        buriedPoint.eventId = 'button_want_to_send_page_draft details_admin';
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
}
function save(){
  if(parseInt($("#mu").val())>parseInt($("#muShu").val())){
    alert("填写面积不能大于"+$("#muShu").val()+"亩")
    return
  }
  if(parseInt($("#mu").val())==0){
    alert("填写面积不能为0亩")
    return
  }
  var buriedPoint = pds.buriedPoint();
  buriedPoint.pageId = 'page_draft details_adminn';
  buriedPoint.eventId = 'button_want_to_save_drafts_page_draft details_admin';
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
}
function submit(n){
  var obj={}
  obj.flag=n
  obj.isBlackFlag=2
  obj.workOrderData={}
  obj.workOrderData.name=$("#proId").find("option:selected").text()
  obj.workOrderData.id=$("#workOrderId").val()
  obj.workOrderData.farmId=$("#farmId").val()
  obj.workOrderData.executorId=$("#executorId").val()
  obj.workOrderData.executorName=$("#executorName").val()
  // obj.workOrderData.checkerId="1"
  // obj.workOrderData.year="2017"
  obj.workOrderData.categoryId=$("#categoryId").val()
  obj.workOrderData.landId=$("#landId").val()
  obj.workOrderData.plantArea=$("#mu").val()
  obj.workOrderData.plantPlanId=$("#plantPlanId").val()
  obj.workOrderData.plantLandId=$("#plantLandId").val()
  obj.planData={}
  obj.planData.id=$("#plantPlanId").val()
  obj.plantLandData={}
  obj.plantLandData.id=$("#plantLandId").val()
  obj.cropData={}
  obj.cropData.id=$("#categoryId").val()
  var object={}
  object.standards=$("#standards").val().trim()
  object.startDate=$("#date1").val()
  object.endDate=$("#date2").val()
  object.processId=$("#proId").val()
  obj.processData=object

  if($("#show").val()==0){
    var inl=$("input[name='reName']").length,arr=[]
    if(n==2){
      for(var i=0; i<inl; i++){
        if(!$("input[name='reNeed']").eq(i).val()||!$("input[name='resTotalUnit']").eq(i).val()||!$("input[name='reId']").eq(i).val()||!$("input[name='rePrice']").eq(i).val()||!$("input[name='reUnit']").eq(i).val()){
          continue
        }
          var ob={}
          ob.resTotal=$("input[name='reNeed']").eq(i).val()
          ob.resTotalUnit=$("input[name='resTotalUnit']").eq(i).val()
          ob.resourceId=$("input[name='reId']").eq(i).val()
          ob.costVal=$("input[name='rePrice']").eq(i).val()
          ob.costValUnit=$("input[name='reUnit']").eq(i).val()
          arr.push(ob)
          ob=null
        }
    }
    if(n==1){
        for(var i=0; i<inl; i++){
            var ob={}
            ob.resTotal=$("input[name='reNeed']").eq(i).val()
            ob.resTotalUnit=$("input[name='resTotalUnit']").eq(i).val()
            ob.resourceId=$("input[name='reId']").eq(i).val()
            ob.costVal=$("input[name='rePrice']").eq(i).val()
            ob.costValUnit=$("input[name='reUnit']").eq(i).val()
            arr.push(ob)
            ob=null
          }
    }
    obj.resourceDataList=arr
  }
  //alert(JSON.stringify(obj))
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
              api.execScript({
                  name: 'plantDetail_list_win',
                  frameName:'plantDetail_list_frm',
                  script: '$("#CONFIRMING").triggerHandler("touchend")'
              })
              setTimeout(function(){
                  api.closeWin();
              },0)
            });
            ;
          }
          if(n==1){
            api.alert({
              msg : "该工单已保存为草稿!"
            },function(){
                api.execScript({
                    name: 'plantDetail_list_win',
                    frameName:'plantDetail_list_frm',
                    script: '$("#DRAFT").triggerHandler("touchend")'
                });
                setTimeout(function(){
                    api.closeWin();
                },0)
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
