var emptyFrm =
(function($){
    var emptyFrm_ = {};
    var emptyBox = $("<div><div>").attr("id","emptyBox").css({
        "position" : "fixed",
        "left" : "0",
        "top" : "0",
        "zIndex" : "999",
        "right" : "0",
        "bottom" : "0",
        // "width" : "4.0rem",
        // "height" : "4.0rem",
        // "marginTop" : "-2.0rem",
        // "marginLeft" : "-2.0rem",
        //"backgroundColor" : "rgba(0,0,0,0)",
        "backgroundColor" : "#fff",
        "display" : "none"
    }).appendTo("body");
    var emptyIcon = $("<span id='emptyIcon'></span>").css({
        // "width": "3.5rem",
        "height": "3.0rem",
        //"background": "url('widget://image/market/empty.png') no-repeat center center",
        "backgroundSize": "45% 100%",
        "backgroundRepeat" : "no-repeat",
        "backgroundPosition" : "center center",
        "marginTop" : "45%"
    }).appendTo(emptyBox);
    var emptyText = $("<span id='emptyText'></span>").css({
        "fontSize": "0.32rem",
        "padding": "0.3rem 0",
        "color" : "#999999",
        "textAlign" : "center"
    }).appendTo(emptyBox);
    emptyFrm_.show = function(text, top, imgUrl){//参数分别为：提示文字、打开位置、背景图地址
        $("#emptyText").text(text);
        $("#emptyIcon").css("backgroundImage","url("+ imgUrl +")")
        $("#emptyBox").css({
            "top" : top + 10 +"px"
        }).show();
    };
    emptyFrm_.hide = function(){
        $("#emptyBox").hide();
    };

    return emptyFrm_;
})(jQuery)
