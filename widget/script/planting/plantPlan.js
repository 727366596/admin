var sendFarmId=""
// var landList=[]
var show;
var processList=[]
apiready=function(){
  window.onerror=function(){return true}
  // var header = $api.byId('header');
  //   $api.fixStatusBar(header);
  //   var headerH = $api.offset(header).h;
  //   $("body").css({"paddingTop":headerH+"px"});
    //  alert(api.pageParam.largeId)
    //  alert(api.pageParam.landId)
    //  alert(api.pageParam.processId)
    //  alert(api.pageParam.planId)
    //  alert(api.pageParam.processIdName)
    //  alert(api.pageParam.processId)
    var systemType = api.systemType;
    if(systemType=="ios"){
      $("h4").css("fontWeight","bold")
    }
    pds.ajaxSubmit({
      url:'app/plant/planProcess',
      type : "GET",
      data:{id:api.pageParam.id},
      success:function(ret,err){
        //api.alert({msg:JSON.stringify(ret)});
        $("#categoryName").html(ret.data.categoryName)
        $("#categoryId").val(ret.data.categoryId)
        $("#landName").html(ret.data.landName)
        $("#date1").val(ret.data.startDate.substring(0,10))
        $("#date2").val(ret.data.endDate.substring(0,10))
        $("#mu").val(ret.data.area)
        $("#muShu").val(ret.data.area)
        $("#standards").val(ret.data.standards)
        $("#mu").on("change",function(){
          $("#mu").val(Math.abs($("#mu").val()))
        })
        },
        error:function(e){
           api.alert({msg:"服务器异常，请联系管理员!"});
        }
    });
    pds.ajaxSubmit({
      url:'app/plant/planResource',
      type : "GET",
      data:{id:api.pageParam.id},
      success:function(ret,err){
         //api.alert({msg:JSON.stringify(ret)});
          if(ret.data.length){
              var re=ret.data,l=re.length,rel=""
              for( i=0; i<l; i++){
                if(re[0]==null){
                  break
                }
                //alert(re[i].id)
                rel+='<div class="resourceBox" data-id="'+ re[i].id +'"><p class="resource-p"><span id=i'+(i+1)+' class="resourceList" >资源'+(i+1)+'</span><span class="det">删除</span></p>'+
                   '<p><span>资源名称：</span><span><input name="reName" type="text" readonly value='+re[i].resSubIdName+' ><input name="reId" type="hidden" value='+re[i].resourceId+' ><i></i></span></p>'+
                   '<p><span>资源用量：</span><span><input name="reNeed" type="number" value='+re[i].resourceTotal+' ><input name="resTotalUnit" type="hidden" value='+re[i].resourceUnit+' ><i class="renTian">'+re[i].resourceUnitName+'</i></span></p>'+
                   '<p><span>资源单价：</span><span><input name="rePrice" type="number" value='+re[i].costVal+' ><input name="reUnit" type="hidden" value='+re[i].costValUnit+' ><i class="mu">'+re[i].costValUnitName+'</i></span></p></div>'
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
        },
        error:function(e){
           api.alert({msg:"服务器异常，请联系管理员!"});
        }
    });
    $("#executor").on("click",function(){
      api.openWin({
        name : 'staffList_win',
        url : '../fieldManage/staffList_win.html',
        pageParam: {
          planOut: 2
        }
      });
    })
  getToday()
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
           var d = new Date(), y = d.getFullYear(), m = d.getMonth() + 1, r = d.getDate();
           m < 10 ? m = "0" + m : m;
           r < 10 ? r = "0" + r : r;
           var today=y + "-" + m + "-" + r;
           var d3=new Date(today.replace(/\-/g, "\/"));
           if(beginDate!=""&&d1 <d3)
           {
            alert("开始时间不能小于今天！");
            return false;
           }
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
            param:2
        }
    });
  })
}
 function getExecutor(){
   var employInfo = $api.getStorage('employInfo');
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
function cc(){
   var e = event.srcElement;
   var r =e.createTextRange();
   r.moveStart('character',e.value.length);
   r.collapse(true);
   r.select();
}
function conf(){
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
    if(!$("#exrId").val()){
      alert("请选择执行人")
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
    buriedPoint.pageId = 'page_process_details_admin';
    buriedPoint.eventId = 'button_want_to_send_page_process_details_admin';
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
  buriedPoint.pageId = 'page_process_details_admin';
  buriedPoint.eventId = 'button_want_to_save_drafts_page_process_details_admin';
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
  obj.isBlackFlag=1
  obj.workOrderData={}
  obj.workOrderData.name=api.pageParam.processIdName
  //obj.workOrderData.id=""
  obj.workOrderData.farmId=api.pageParam.farmId
  obj.workOrderData.executorId=$("#exrId").val()
  obj.workOrderData.executorName=$("#executor").val()
  obj.workOrderData.year=api.pageParam.year
  obj.workOrderData.categoryId=$("#categoryId").val()
  obj.workOrderData.landId=api.pageParam.landId
  obj.workOrderData.plantArea=$("#mu").val()
  obj.workOrderData.plantPlanId=api.pageParam.largeId
  obj.workOrderData.plantLandId=api.pageParam.planId
  obj.planData={}
  if(api.pageParam.largeId){
    obj.planData.id=api.pageParam.largeId
  }else{
    alert("大计划id不能为空")
    return
  }
  obj.plantLandData={}
  if(api.pageParam.planId){
    obj.plantLandData.id=api.pageParam.planId
  }else{
    alert("小计划id不能为空")
    return
  }
  obj.cropData={}
  //alert($("#categoryId").val())
  if($("#categoryId").val()){
    obj.cropData.id=$("#categoryId").val()
  }else{
    alert("作物id不能为空")
    return
  }
  var object={}
  object.standards=$("#standards").val().trim()
  object.startDate=$("#date1").val()
  object.endDate=$("#date2").val()
  object.processId=api.pageParam.processId
  object.plantProcessId = api.pageParam.id
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
            ob.resTotalUnit=$("input[name='resTotalUnit']").eq(i).val()
            ob.resourceId=$("input[name='reId']").eq(i).val()
            ob.costVal=$("input[name='rePrice']").eq(i).val()
            ob.costValUnit=$("input[name='reUnit']").eq(i).val()
            ob.plantResourceId = $(".resourceBox").eq(i).attr("data-id");
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
              ob.plantResourceId = $(".resourceBox").eq(i).attr("data-id");
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
              var buriedPoint = pds.buriedPoint();
           	 buriedPoint.pageId = 'page_process_details_admin';
           	 buriedPoint.eventId = 'button_send_page_process_details_admin';
             	pds.ajaxSubmit({
             		url:"app/buried_point/save",
             		data:{"point":buriedPoint},
             		success:function(v){

             		}
             	})
              api.execScript({
                name:'plantDetail_list_win',
                frameName: 'plantDetail_list_frm',
                script: '$("#CONFIRMING").triggerHandler("touchend")'
              });
              setTimeout(function(){
                  api.closeWin();
              },0)
            });
          }
          if(n==1){
            api.alert({
              msg : "该工单已保存为草稿!"
            },function(){
              var buriedPoint = pds.buriedPoint();
           	 buriedPoint.pageId = 'page_process_details_admin';
           	 buriedPoint.eventId = 'button_save_drafts_page_process_details_admin';
             	pds.ajaxSubmit({
             		url:"app/buried_point/save",
             		data:{"point":buriedPoint},
             		success:function(v){

             		}
             	})
              api.execScript({
                  name: 'plantDetail_list_win',
                  frameName:'plantDetail_list_frm',
                  script: '$("#DRAFT").triggerHandler("touchend")'
              });
              setTimeout(function(){
                  api.closeWin();
              },0)
            });
            // api.openWin({
            //     name: 'plantDetail_list_win',
            //     url: '../home/plantDetail/plantDetail_list_win.html',
            //     pageParam : {
            //       id : "DRAFT"
            //     },
            //     animation : {
            //       type : "movein", //动画类型（详见动画类型常量）
            //       subType : "from_right", //动画子类型（详见动画子类型常量）
            //       duration : 300 //动画过渡时间，默认300毫秒
            //     }
            // });
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
