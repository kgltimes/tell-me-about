import fetch from 'node-fetch';

export function get(url: string) {
    return fetch(url).then(function (response) {
        // console.log(response.headers.get('Content-Type'));
        // console.log(response.headers.get('Date'));

        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.type);
        // console.log(response.url);
        let headers: { [key: string]: string | number | boolean } = {};
        response.headers.forEach((value, name) => {
            headers[name] = value;
        });
        return response.json().then(data => {
            return { headers, data };
        });
    })
        .catch(e => Promise.reject(e))
}

export function post(url: string, body: any) {
    return fetch(url, {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body
    }).then(function (response) {
        let headers: { [key: string]: string | number | boolean } = {};
        response.headers.forEach((value, name) => {
            headers[name] = value;
        });
        return response.json().then(data => {
            return { headers, data };
        });
    })
        .catch(e => Promise.reject(e))
}