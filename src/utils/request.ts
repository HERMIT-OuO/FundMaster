import axios from 'axios'

const service = axios.create({
    baseURL: 'https://api.doctorxiong.club/v1/', // url = base url + request url
    timeout: 5000
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

service.interceptors.response.use(
    response => {
        // 拦截
        const res = response.data;
        return res;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

export default service