import servie from '../request/axios'

// 登录
export function login(data) {   
    return servie({
        url: '/user/login',
        method: 'get',
        params: data
    })
}

// 人脸抓拍
export function monitoring(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/face/persons/monitoring',
        method: 'get',
        params: data
    })
}

// 非机动车抓拍
export function non_motor(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/vehicle/non-motor/monitoring',
        method: 'get',
        params: data
    })
}

// 非机动车抓拍
export function pedestrian(data) {    // pageNumber=0&pageSize=10&location=
    return servie({
        url: '/pedestrian/monitoring',
        method: 'get',
        params: data
    })
}