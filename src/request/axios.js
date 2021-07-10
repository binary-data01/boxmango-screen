import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.31.38:3000'

const servie = axios.create({
    baseURL: "/api",
    // timeout: 5000
});


servie.interceptors.request.use(function (config) {
    // 在发送请求之前看看是否有token值
    // 获取token
    let token = sessionStorage.getItem('token');
    // 判断是否有token
    if (token) {
        // config参数,是唯一能够拿取请求头的途径 (把token值放在headers.Authorization上)
        config.headers['Access-Token'] = token;

    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 暴露axios
export default servie;