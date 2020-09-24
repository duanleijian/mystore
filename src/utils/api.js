import { get, getHasHeader, post, postToken } from './request'
class ProductData {
    static validator(rules, params) {
        let result = true;
        for (let key in params) {
            if (!(ProductData.typeMapper(Object.prototype.toString.call(params[key])) == rules[key])) {
                result = false
                break
            }
        }
        return result
    }
    static typeMapper(property) {
        const mappper = {
            '[object Object]': 'object',
            '[object Array]': 'array',
            '[object Function]': 'function',
            '[object String]': 'string',
            '[object Number]': 'number',
            '[object Boolean]': 'boolean',
            '[object RegExp]': 'regexp'
        }
        return mappper[property]
    }
    static getSwiper() {
        return get('/api/swiper', { type: 2 })
    }
    static getNavigate() {
        return get('/api/navigate', { type: 2 })
    }
    static getGoodCategory() {
        return get('/api/goods_category', { type: 2 })
    }
    static getGoodRecommond() {
        return get('/api/goods/recommend', { type: 2 })
    }
    static getGoodList(params) {
        // console.log('param', params)
        // let rules = {
        //     cat_id: 'number',
        //     page: 'number',
        //     count: 'number'
        // }
        // if (!ProductData.validator(rules, params)) {
        //     throw new Error('请求参数类型错误！', rules)
        // }
        return get('/api/goods_list', Object.assign({ type: 2 }, params))
    }
    static getGoodDetail(goodId) {
        return get('/api/goods', { goods_id: goodId })
    }
    static register(userInfo) {
        return post('/shose/user/register', userInfo, {})
    }
    static login(userInfo) {
        return post('/shose/user/login', userInfo, {})
    }
    static getUserInfo(token) {
        console.log('token', token);
        return getHasHeader('/api/user', {}, { token })
    }
    static uploadHeaderImg(file, token) {
        let data = new FormData()
        data.append('image', file)
        console.log('data', data);
        return post('/api/user/avatar', data, {
            headers: {
                token,
                'Content-type': 'multipart/form-data',
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static getAddress(id = null, token) {
        let data = {}
        if (!id) {
            data.id = id
        }
        return getHasHeader('/shose/address', data, {
            token
        })
    }
    static addAddress(data, token) {
        return postToken('/shose/address/add', data, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static async updateAddress(data, token, id) {
        if (id) {
            data.id = id
        }
        return postToken('/shose/address/update', data, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })

    }
    static setDeafult(token, data, id) {
        if (id) {
            data.id = id
        }
        return postToken('/shose/address/default', data, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static deleteAddress(token, id) {
        return postToken('/shose/address/delete', { id }, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static getCoupon() {
        return get('/shose/coupon')
    }
    static getUserCoupon(token) {
        return getHasHeader('/shose/coupon/get', {}, {
            token
        })
    }
    static async receive(token , id) {
        return await postToken('/shose/coupon/get', {coupon_id: id},{
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        }) 
    }
    static addOrder(token, data) {
        return postToken('/shose/order', data, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static getOrderDetail(token, id) {
        return getHasHeader('/shose/order', {id}, {token})
    }
    static getOrderList(token, status, page = 1, count = 10) {
        return getHasHeader('/api/user/order', {
            type: status,
            page,
            count
        },{token})
    }
    static checkCollect(token, id) {
        return getHasHeader('/shose/collect/check', {goods_id: id}, {token})
    }
    static confirmCollect(token, id) {
        return postToken('/shose/collect/confirm', {goods_id: id}, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static cancelCollect(token, id) {
        return postToken('/shose/collect/cancel', {goods_id: id}, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static getUserCollect(token, page = 1, count = 5) {
        return getHasHeader('/shose/user/getCollect', {page, count}, {
            token,
            appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
        })
    }
    static setHistory(token, id) {
        return postToken('/shose/history/set', {goods_id: id}, {
            headers: {
                token,
                appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
            }
        })
    }
    static getHistoryTime(token) {
        return getHasHeader('/shose/history/time', {}, {token})
    }
    static getHistoryList(token, params) {
        return getHasHeader('/shose/history/get', params, {token})
    }
}
export default ProductData