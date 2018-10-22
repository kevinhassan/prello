export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

/*
    resource, String, uri to fetch from Prello API.
    params, Object, default = {}, Object with all the params to put in the body.
    verb, String, default = GET, HTTP verb to use for this request.
*/
export const fetchPrelloAPI = (resource, params = {}, verb = GET) => {
    const url = process.env.API_HOST + resource
    return fetch(url, {
        method: verb,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}
