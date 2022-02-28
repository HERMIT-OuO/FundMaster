import request from '@/utils/request'

export function getFundDetailList(data: any) {
    // 通过基金代码获取基金详情,包含基金历史变化信息,货币基金的数据与其他基金不同,获取数据后应先判断基金类型,再渲染数据
    return request({
        url: '/fund/detail/list',
        method: 'get',
        params: data
    })
}

export function fund(data: any) {
    // 支持批量查询,不包含历史数据
    return request({
        url: '/fund',
        method: 'get',
        params: data
    })
}

export function getFundDetail(data: any) {
    // 支持批量查询,不包含历史数据
    return request({
        url: '/fund/detail',
        method: 'get',
        params: data
    })
}

export function getAllFund(data: any) {
    //获取所有基金
    return request({
        url: '/fund/all',
        method: 'get',
        params: data
    })
}



