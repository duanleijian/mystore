
class Utils {
    static repeatData(arr, name, value) {
        let result = true
        for (let i = 0,len = arr.length; i < len; i++) {
            if(arr[i][name] === value) {
                result =  false
                break
            }
        }
        return result
    }
}
export default Utils