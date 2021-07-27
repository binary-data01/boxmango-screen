import servie from '../request/axios'

// 登录
export function login(data) {   
    return servie({
        url: '/api/user/login',
        method: 'get',
        params: data
    })
}

// 人脸抓拍
export function monitoring(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/api/face/persons/monitoring',
        method: 'get',
        params: data
    })
}

// 非机动车抓拍
export function non_motor(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/api/vehicle/non-motor/monitoring',
        method: 'get',
        params: data
    })
}

// 非机动车抓拍
export function pedestrian(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/api/pedestrian/monitoring',
        method: 'get',
        params: data
    })
}

export function livestream(data) {
    return servie({
        url: '/api/livestream/play',
        method: 'get',
        params: data,
    })
}

// 场地日情况
export function boxDevice(data) {    // http://192.168.31.127:5000/aibox/BoxDevice
    return servie({
        url: '/aibox/BoxDevice',
        method: 'get',
        headers: {
            Authorization: 'eymmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDU4NjAxMCwianRpIjoiZTJiOGUyZDgtMmRlOC00NzcyL'
        },
        params: data,
    })  
}

// 异常功率曲线
export function abnormalOrder(data) {    // http://192.168.31.127:5000/aibox/AbnormalOrder
    return servie({
        url: '/aibox/AbnormalOrder',
        method: 'get',
        headers: {
            Authorization: 'eymmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDU4NjAxMCwianRpIjoiZTJiOGUyZDgtMmRlOC00NzcyL'
        },
        params: data
    })  
}

// 日使用人数
export function dayDevice(data) {    // http://192.168.31.127:5000/aibox/DayDevice
    return servie({
        url: '/aibox/DayDevice',
        method: 'get',
        headers: {
            Authorization: 'eymmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDU4NjAxMCwianRpIjoiZTJiOGUyZDgtMmRlOC00NzcyL'
        },
        params: data
    })  
}
