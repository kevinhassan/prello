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
    /* TODO: To decomment later, right now .env is not read

    if (process.env.API_HOST === undefined && process.env.ENVIRONMENT !== 'production') {
        throw Error('API_HOST in .env file not found.');
    }
    */

    // const url = process.env.API_HOST + resource;
    const url = `http://localhost:9090/${resource}`;
    return axios({
        data: params,
        headers: {
            'Content-type': 'application/json',
        },
        method: verb,
        responseType: 'json',
        url,
    });
};
