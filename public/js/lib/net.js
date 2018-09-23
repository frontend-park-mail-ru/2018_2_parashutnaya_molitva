const noop = () => null;
export default function doReq({callback = noop, method = "GET", url = '/', body = '', credentials = 'omit',
                                  headers = {}} = {}) {
    fetch(url, {
        method,
        body,
        credentials,
        headers,
    }).then(callback)
}