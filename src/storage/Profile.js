
class Profile{
    static PERSON_INFO = 'myProfile'
    static hasUserInfo(name = Profile.PERSON_INFO) {
        if (JSON.parse(localStorage.getItem(name))) {
            return true
        } else {
            return false
        }
    }
    static setUserInfo(userInfo) {
        localStorage.setItem(Profile.PERSON_INFO, JSON.stringify(userInfo))
    }
    static getUserInfo(name = Profile.PERSON_INFO) {
        return JSON.parse(localStorage.getItem(name))
    }
}
export default Profile