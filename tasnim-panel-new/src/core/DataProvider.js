import {APP_TOKEN, APP_URL} from './APP_URL'
import {query} from './Query'

const apiUrl = APP_URL + '/api/v2'
const HttpRequest = async (url, options) => {
    options.headers = {
        ...options.headers,
        'x-api-key': APP_TOKEN,
        Authorization:
            'Bearer ' + (sessionStorage.getItem('token') || localStorage.getItem('token')),
    }
    const data = await query({url: url, ...options})
    return data
}
export class DataProvider {
    static create = async (resource, params) => {
        const data = await HttpRequest(`${apiUrl}/${resource}`, {
            method: 'put',
            data: params.data,
            onUploadProgress: params.progress ? params.progress : null,
        })
        return data
    }
    static sendInformation = async (resource, params) => {
        let body = {method: 'post'}
        if (params) {
            body = {
                method: 'post',
                onUploadProgress: params.progress ? params.progress : null,
                ...params,
            }
        }
        const data = await HttpRequest(`${apiUrl}/${resource}`, body)
        return data
    }
    static getList = async (resource, params) => {
        var url = `${apiUrl}/${resource}`
        if (params) {
            url = url + '?'
            if (params.sort) {
                url =
                    url +
                    (params.sort.name ? `sort=${params.sort.name}&order=${params.sort.order}&` : '')
            }
            if (params.regex) {
                let regex = {}
                for (const [key, value] of Object.entries(params.regex)) {
                    if (value && value !== '') regex[key] = value
                }
                url = url + (regex && regex !== {} ? `regex=${JSON.stringify(regex)}&` : '')
            }
            if (params.filter) {
                let filter = {}
                for (const [key, value] of Object.entries(params.filter)) {
                    if (value && value !== '') {
                        filter[key] = value
                    }
                }
                url = url + (filter && filter !== {} ? `filter=${JSON.stringify(filter)}&` : '')
            }
            if (params.date) {
                let date = {}
                for (const [key, value] of Object.entries(params.date)) {
                    if (value && (value.from || value.to)) {
                        date[key] = value
                    }
                }
                url = url + (date && date !== {} ? `date=${JSON.stringify(date)}&` : '')
            }
            if (params.skip !== undefined) {
                url = url + `skip=${params.skip}&`
            }
            if (params.limit !== undefined) {
                url = url + `limit=${params.limit}`
            }
        }
        const data = await HttpRequest(url, {
            method: 'get',
            cancelToken: params ? params.cancelToken : null,
        })
        return data
    }

    static update = async (resource, params) => {
        const data = await HttpRequest(`${apiUrl}/${resource}`, {
            method: 'patch',
            ...params,
        })
        return data
    }

    static getOne = async (resource) => {
        const url = `${apiUrl}/${resource}`
        const data = await HttpRequest(url, {method: 'get'})
        return data
    }
    static delete = async (resource) => {
        const data = await HttpRequest(`${apiUrl}/${resource}`, {
            method: 'delete',
        })
        return data
    }
}
