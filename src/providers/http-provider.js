import axios from 'axios';

const baseUrl = 'https://dev.tuten.cl/TutenREST/rest/user/';

const options = {
    Accept: 'application/json'
};

async function get(url, headers) {
    const fUrl = baseUrl + url;
    let response = {};
    let opt = { options, headers };
    await axios.get(fUrl, opt).then(res => {
        console.log('RESPONSE: ', res);
        response = res.data;
    });
    return response;
}

async function post(url, body, headers) {
    const fUrl = baseUrl + url;
    let response = {};
    let opt = { options, headers };
    await axios.post(fUrl, body, opt).then(res => {
        console.log('RESPONSE: ', res);
        response = res.data;
    });
    return response;
}

async function put(url, body, headers) {
    const fUrl = baseUrl + url;
    let response = {};
    let opt = { options, headers };
    console.log(opt);
    await axios.put(fUrl, body, opt).then(res => {
        console.log('RESPONSE: ', res);
        response = res.data;
    });
    return response;
}

async function erase(url, headers) {
    const fUrl = baseUrl + url;
    let response = {};
    let opt = { options, headers };
    await axios.delete(fUrl, opt).then(res => {
        console.log('RESPONSE: ', res);
        response = res.data;
    });
    return response;
}

export default {
    get: get,
    post: post,
    put: put,
    delete: erase
};
