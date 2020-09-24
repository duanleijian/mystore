
class LoginRegister{
    static PROFILE_ID = 'duanleijian'
    static expire = new Date()
    static hasLoginInfo(name = LoginRegister.PROFILE_ID) {
        if (JSON.parse(localStorage.getItem(name))) {
            if (new Date().getTime() - LoginRegister.expire.getTime() <= 2 * 60 * 60 * 1000) {
                return true
            } else{
                return false
            }
              
        } else {
            return false
        }
    }
    static setLoginInfo(userInfo) {
        localStorage.setItem(LoginRegister.PROFILE_ID, JSON.stringify(userInfo))
        LoginRegister.expire = new Date()
    }
    static getLoginInfo(username = LoginRegister.PROFILE_ID) {
        if (!LoginRegister.hasLoginInfo()) {
            return
        } else {
            return JSON.parse(localStorage.getItem(username))
        }
        
    }
}
export default LoginRegister