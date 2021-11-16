import tokenService from './tokenService';

const BASE_URL = '/api/clients/';

async function addClient(data) {
    return fetch(BASE_URL + 'addclient', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error Adding Client - Possible duplicate wallet address");
    });
}



export default {
    addClient
};