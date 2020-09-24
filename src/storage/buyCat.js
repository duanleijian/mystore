import Utils from '../utils/handleData'
const APP_NAME = 'shengxian'
class ShopCat {
    static currentName = APP_NAME
    static init(type) {
        let result = JSON.parse(localStorage.getItem(APP_NAME))
        if (!result) {
            switch(type) {
                case 'object': localStorage.setItem(APP_NAME, JSON.stringify({}));break;
                case 'array': localStorage.setItem(APP_NAME, JSON.stringify([]));break;
            }
            result = JSON.parse(localStorage.getItem(APP_NAME))
        }
        return result
    }
    static has() {
        let condition = JSON.parse(localStorage.getItem(APP_NAME))
        if (condition === null) {
            return false
        } else {
            return true
        }
    }
    static factory(type) {
        switch(type) {
            case 'object': localStorage.setItem(APP_NAME, JSON.stringify({}));break;
            case 'array': localStorage.setItem(APP_NAME, JSON.stringify([]));break;
        }
        return JSON.parse(localStorage.getItem(APP_NAME))
    }
    static getAll() {
        if (ShopCat.has()) {
            return JSON.parse(localStorage.getItem(APP_NAME))
        } else {
            throw new Error('getAll需要APP_NAME对应的值!')
        }
    }
    static get(index) {
        let data = ShopCat.getAll()
        if (Array.isArray(data)) {
            return data[index]
        } else {
            throw new Error('get购物清单必须是数组类型!')
        }
    }
    static remove(index) {
        let data = ShopCat.getAll()
        if (Array.isArray(data)) {
            if (index < 0) {
                data.pop()
            } else {
                data.splice(index ,1)
            }
        } else {
            throw new Error('remove购物清单必须是数组类型')
        }
    }
    static removeAll() {
        if (ShopCat.has()) {
            localStorage.removeItem(APP_NAME)
        } else {
            throw new Error('removeAll购物清单必须是数组类型')
        }
    }
    static setAll(arr) {
        if (Array.isArray(arr)) {
            if (ShopCat.has()) {
                localStorage.removeItem(APP_NAME)
                localStorage.setItem(APP_NAME, JSON.stringify(arr))
            } else {
                localStorage.setItem(APP_NAME, JSON.stringify(arr))
            }
        } else{
            throw new Error('setAll的参数必须是数组!')
        }
    }
    static set(index, val) {
        let data = ShopCat.getAll()
        if (Array.isArray(data)) {
            if (index >= 0) {
                data.splice(index, 1, val)
            } else {
                data.push(val)
            }
            localStorage.setItem(APP_NAME, JSON.stringify(data))
        } else {
            throw new Error('get方法的参数必须是个数组!')
        }
    }
    static setObj(name, value) {
        let data = ShopCat.init('object')
        data[name] = value
        localStorage.setItem(APP_NAME, JSON.stringify(data))
    }
    static setArr(index, value) {
        let data = ShopCat.init('array')
        console.log('value', value);
        console.log('data1', data);
        if (index < 0) {
            if (Utils.repeatData(data, 'id', value['id'])){
                data.push(value)
            }
            
        } else {
            data.splice(index, 1, value)
            
        }
        console.log('data2', data);
        localStorage.removeItem(APP_NAME)
        localStorage.setItem(APP_NAME, JSON.stringify(data))
    }
    static setAllArr(arr) {
        localStorage.setItem(APP_NAME, JSON.stringify(arr))
    }
    static getObj(name) {
        let data = ShopCat.init('object')
        return data[name]
    }
    static getArr(index) {
        let data = ShopCat.init('array')
        if (index < 0) {
            return data[data.length - 1]
        } else {
            return data[index]
        }
    }
    static getAllArr() {
        return ShopCat.init('array')
    }
    static removeObj(name) {
        let data = ShopCat.init('object')
        Reflect.deleteProperty(data, name)
        localStorage.setItem(APP_NAME, JSON.stringify(data))
    }
    static removeArr(index) {
        let data = ShopCat.init('array')
        if (data.length > 0) {
            if (index < 0) {
                data.pop()
            } else {
                data.splice(index, 1)
            }
            localStorage.setItem(APP_NAME, JSON.stringify(data))
            return true
        } else{
            return false
        }
    }
    static clear() {
        localStorage.clear()
    }
}
export default ShopCat 