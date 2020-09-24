import {Toast} from 'vant'
class UserValidator{
    static loginRules = {
        username(val) {
            if (typeof val === 'string') {
                if (val.length === 11) {
                    let result = new RegExp(/^1[3-9]\d{9}$/).test(val)
                    console.log('username', result);
                    return result
                } else{
                    // throw new Error('手机号的长度必须是11位')
                    return '手机号的长度必须是11位'
                }
            } else {
                // throw new Error('手机号数据格式必须为字符串')
                return '手机号数据格式必须为字符串'
            }
        },
        password(val) {
            if (typeof val === 'string') {
                if (val.length >= 6 && val.length <= 20) {
                    let result = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(val)
                    console.log('password', result);
                    return result
                } else{
                    return '密码必须是6~20位'
                }
            } else {
                return '密码数据格式必须为字符串'
            }
        }
    }
    static registerLogin = {
        username(val) {
            if (typeof val === 'string') {
                if (val.length === 11) {
                    let result = new RegExp(/^1[3-9]\d{9}$/).test(val)
                    console.log('username', result);
                    return result
                } else{
                    return '手机号的长度必须是11位'
                }
            } else {
                return '手机号数据格式必须为字符串'
            }
        },
        password(val) {
            this.pwd = val
            if (typeof val === 'string') {
                if (val.length >= 6 && val.length <= 20) {
                    let result = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(val)
                    console.log('password', result);
                    return result
                } else{
                    return '密码必须是6~20位'
                }
            } else {
                return '密码数据格式必须为字符串'
            }
        },
        confirmPassword(judge) {
            if (judge) {
                return true
            } else {
                return '密码必须保持一致'
            }
        }
        
    }
    static loginVd(data, rules = UserValidator.registerLogin) {
        let result = true
        console.log('rules2', rules);
        for (let key in data) {
            let flag = rules[key](data[key])
            if (typeof flag === 'boolean' && !flag) {
                result = false
                break
            } else if(typeof flag === 'string'){
                result = flag
                break
            }
        }
        return result
    }
    static RegisterVd(data, rules = UserValidator.loginRules) {
        let result = true
        console.log('rules1', rules);
        for (let key in data) {
            let flag = rules[key](data[key])
            if (typeof flag === 'boolean' && !flag) {
                result = false
                break
            } else if(typeof flag === 'string'){
                result = flag
                break
            }
        }
        return result
    }
}
export {UserValidator} 