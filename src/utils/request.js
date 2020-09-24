import axios from 'axios'
const instance = new axios.create({
    baseURL: 'http://api.4yue.top/index.php'
})
export function get(url, params = {}) {
    return instance.get(url,{
        params,
        headers: {
            appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
        }
    })
}
export function getHasHeader(url, params, headers) {
    return instance.get(url, {
        params,
        headers: Object.assign({appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'}, headers)
    })
}
export function post(url, data, config) {
    return instance.post(url,data, Object.assign({
        headers: {
            appkey: 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM',
        }
    }, config))
}
export function postToken(url, data, config) {
    return instance.post(url, data, config)
}