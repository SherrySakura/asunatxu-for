export default {
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        arr = document.cookie.match(reg)
        if (arr != null){
            return (arr[2])
        }
        else
            return null
    },

    setCookie: function (name, value, expiar, unit = "day") {
        var exdate = new Date()
        switch (unit){
            case "day":
                exdate.setDate(exdate.getDate() + expiar)
                break
            case "hour":
                exdate.setHours(exdate.getHours() + expiar)
                break
                
        }
        
        document.cookie = name + "=" + escape(value) + ((expiar == null) ? "" : ";expires=" + exdate.toGMTString())
    },

    deleteCookie: function (name) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    },

    isLogin: function () {
        if (this.getCookie("account") == null){
            return false
        }else {
            return true
        }
    }
}