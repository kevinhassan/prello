export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
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
    return fetch(url, {
        method: verb,
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((res) => {
            res.json();
        })
        .catch((error) => {
            // TODO : do something with fetch() errors !
            console.log(error);
        });
};
