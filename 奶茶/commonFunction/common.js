export default {
    // 设置localStorage
    setLocal: function (name, val) {
        localStorage.setItem(name, val);
    },
    // 获取localStorage
    getLocal: function (name) {
        return localStorage.getItem(name);
    },
    //清除localStorage
    clearLocal: function (name) {
        localStorage.removeItem(name)
    },

    // 设置setSession
    setSession: function (name, val) {
        sessionStorage.setItem(name, val);
    },
    // 获取SessionStorage
    getSession: function (name) {
        return sessionStorage.getItem(name);
    },
    // 查重
    duplicateChecking:function(item,text){
      return item.some((item1)=>{
            return item1.fonts[0].text === text
       })
    }
}