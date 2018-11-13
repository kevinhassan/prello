const axios = require('axios');

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';
/*
    resource, String, uri to fetch from Prello API.
    params, Object, default = {}, Object with all the params to put in the body.
    verb, String, default = GET, HTTP verb to use for this request.
*/
export const fetchPrelloAPI = (resource, params = {}, verb = GET) => {
    if (process.env.REACT_APP_API_HOST === undefined && process.env.ENVIRONMENT !== 'production') {
        throw Error('REACT_APP_API_HOST in .env file not found.');
    }
    const url = process.env.REACT_APP_API_HOST + resource;
    return axios({
        data: params,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('prello_token')}`,
        },
        method: verb,
        responseType: 'json',
        url,
    });
};
