//const BASE_URL = "http://doclever.cn:；8080/mock/597f470ce550c4121bbe101e"


(function(window) {
    //var host = 'http://dev.znphjf.com/'
    //var host = 'http://ys.znphjf.com/'
    //var host = 'http://ph.znphjf.com/'
    //var host = "http://test.snd.znphjf.com/";//测试
    var host = 'http://192.168.31.160:8080/'

    var basePath = '/app'

    var debug = false; // 打印错误信息，false不打印

    var url = function(path) {
        var u = host + basePath + path
        if (debug){
          console.log(u);
        }
        return u
    }
    window.remote = {
        url: url,
        debug: function(){
          return debug;
        },
        debugUserId: function(){
          return 1888
        }
    }
})(window)
