import tokenService from './tokenService';

const BASE_URL = '/api/trials/';

async function addTrial(data) {
    return fetch(BASE_URL + 'addtrial', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error Adding Trial ");
    });
}

async function getTrials() {
    return fetch(BASE_URL + 'gettrials', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error Getting Trials");
    });
}

async function findClients(id) {
    return fetch(BASE_URL + 'findclients/' + id, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error Getting Client Data");
    });
}




export default {
    addTrial,
    getTrials,
    findClients

};