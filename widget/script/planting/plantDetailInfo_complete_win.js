var imageBrowser;
apiready=function(){
  window.onerror=function(){return true}
  imageBrowser = api.require('imageBrowser');
  // var header = $api.byId('header');
  //   $api.fixStatusBar(header);
  //   var headerH = $api.offset(header).h;
  //   $("body").css({"paddingTop":headerH+"px"});
    console.log(api.pageParam.plantDetailId)
    var systemType = api.systemType;
    if(systemType=="ios"){
      $("h4").css("fontWeight","bold")
    }
    pds.ajaxSubmit({
             url:'app/plant/queryDetails',
             type : "GET",
             data:{workOrderId:api.pageParam.plantDetailId},
             success:function(ret,err){
              //alert(JSON.stringify(ret))
              if(ret.data.baseInfo){
                 var data=ret.data.baseInfo
                if(data.proName==null){
                  data.proName="&nbsp&nbsp"
                }
                  $("#proName").html(data.proName)
                if(data.farmName==null){
                  data.farmName="&nbsp&nbsp"
                }
                 $("#farmName").html(data.farmName)
                 if(data.categoryName==null){
                  data.categoryName="&nbsp&nbsp"
                 }
                 $("#categoryName").html(data.categoryName)
                 if(data.landName==null){
                  data.landName="&nbsp&nbsp"
                 }
                 $("#landName").html(data.landName)

                 if(data.executorName==null){
                  data.executorName="&nbsp&nbsp"
                 }
                $("#executorName").html(data.executorName)
                 if(data.workOrderStatus!="CONFIRMING"){
                   if(data.realPlantArea==null){
                     data.realPlantArea="0"
                   }
                   $("#realPlantArea").html(data.realPlantArea+"亩")
                   if(data.plantArea==null){
                     data.plantArea="&nbsp&nbsp"
                   }
                   $("#PlantArea").html("<i></i>要求:&nbsp&nbsp"+data.plantArea+"亩")
                   if(data.startDate==null){
                    data.startDate="&nbsp&nbsp"
                   }
                   $("#startDate").html(data.startDate.substring(0,10))
                   if(data.planEndDate==null){
                    data.planEndDate="&nbsp&nbsp"
                   }
                   $("#planStartDate").html("<i></i>要求:&nbsp&nbsp"+data.planEndDate.substring(0,10))
                   if(data.endDate==null){
                    data.endDate="&nbsp&nbsp"
                   }
                   $("#endDate").html(data.endDate.substring(0,10))
                   if(data.planStartDate==null){
                    data.planStartDate="&nbsp&nbsp"
                   }
                   $("#planEndDate").html("<i></i>要求:&nbsp&nbsp"+data.planStartDate.substring(0,10))
                 }else{
                   if(data.plantArea==null){
                     data.plantArea="&nbsp&nbsp"
                   }
                   $("#realPlantArea").html(data.plantArea+"亩")
                   $("#PlantArea").hide()
                   $("#PlantArea").parent().removeClass("warn")
                   if(data.planEndDate==null){
                    data.planEndDate="&nbsp&nbsp"
                   }
                   $("#planEndDate").hide()
                   $("#planEndDate").parent().removeClass("warn")
                   $("#endDate").html(data.planEndDate.substring(0,10))
                   if(data.planStartDate==null){
                    data.planStartDate="&nbsp&nbsp"
                   }
                   $("#planStartDate").hide()
                   $("#planStartDate").parent().removeClass("warn")
                   $("#startDate").html(data.planStartDate.substring(0,10))
                 }
                 if(data.standards==null){
                  data.standards="&nbsp&nbsp"
                 }
                 $("#standards").html(data.standards)
               }
               if(ret.data.resourceInfos.length){
                   var re=ret.data.resourceInfos,l=re.length,rel=""
                   //alert(JSON.stringify(re))
                   for( i=0; i<l; i++){
                     if(re[i].realResTotal==null){
                       re[i].realResTotal=""
                     }
                     if(re[i].resTotalUnitName==null){
                       re[i].resTotalUnitName=""
                     }
                     if(re[i].planResTotalUnit==null){
                       re[i].planResTotalUnit="&nbsp"
                     }
                     if(re[i].planResTotalUnitName==null){
                       re[i].planResTotalUnitName="&nbsp&nbsp"
                     }
                    re[i].workerResTotal=re[i].workerResTotal||"0"
                     if(data.workOrderStatus!="CONFIRMING"){
                         rel+='	<div><p class="resource-p"><span>资源'+(i+1)+'</span></p>'+
                            '<p><span class="first">资源名称：</span><span class="last">'+re[i].workerName+'</span></p>'+
                            '<p class="warn"><span class="first">资源用量：</span><span class="last">'+re[i].workerResTotal+re[i].workerResTotalUnitName+'</span><span class="center"><i></i>要求：'+re[i].planResTotal+re[i].workerResTotalUnitName+'</span><p>'+
                            '<span class="first">资源单价：</span><span class="last">'+re[i].workerCostVal+re[i].workerCostValUnitName+'</span></p></div>'
                      }else{
                        rel+='	<div><p class="resource-p"><span>资源'+(i+1)+'</span></p>'+
                           '<p><span class="first">资源名称：</span><span class="last">'+re[i].workerName+'</span></p>'+
                           '<p><span class="first">资源用量：</span><span class="last">'+re[i].planResTotal+re[i].workerResTotalUnitName+'</span><span class="center"></span><p>'+
                           '<span class="first">资源单价：</span><span class="last">'+re[i].workerCostVal+re[i].workerCostValUnitName+'</span></p></div>'
                      }
                   }
                   $("#rel").html(rel)
                   rel=null
                }else{
                  $("#rel").html("<div class='kong'>无资源使用信息<div>")
                }
              if(ret.data.pictures.length){
                var pic=ret.data.pictures,pl=pic.length,picl="",imgUrls=[];
                for(var j=0; j<pl; j++){
                  picl+="<img id="+j+" onclick='preview(this)' src="+pds.defaultUri+"app/attach/view/"+pic[j]+" >"
                  // picl+="<img  src="+pds.defaultUri+"app/attach/view/"+pic[j]+" >"
                  //console.log(pds.defaultUri+"app/attach/view/"+pic[j]+"/normal")
                  imgUrls.push(pds.defaultUri+"app/attach/view/"+pic[j]+"/normal")
                }
                $("#pic").html(picl)
                picl=null;
                window.preview = function (dom) {
                  //var imageBrowser = api.require('imageBrowser');
                  imageBrowser.openImages({
                    imageUrls: imgUrls,
                    activeIndex:$(dom).attr("id")
                  });
                };
                // $("#pic").on("click","img",function(){
                //   if($(this).hasClass("you")){
                //     $(this).removeClass("you")
                //   }else{
                //     $(this).addClass("you")
                //   }
                // })
              }else{
                $("#pic").html("<div class='kong'>暂无图片信息<div>")
              }
              //alert(JSON.stringify(ret.data))
              //alert(ret.data.baseInfo.workOrderStatus + "*************" + api.pageParam.navId)
              if(ret.data.baseInfo.workOrderStatus == "COMPLETED" || api.pageParam.navId == "COMPLETED" || ret.data.baseInfo.workOrderStatus == "CONFIRMED" || api.pageParam.navId == "CONFIRMED"){
                    api.execScript({
                        name: 'plantDetailInfo_complete_win',
                        script: "liu('"+ret.data.baseInfo.name+"')"
                    });

              }
            },
  					error:function(e){
  						 api.alert({msg:JSON.stringify(e)});
  					}
  			 });
}
