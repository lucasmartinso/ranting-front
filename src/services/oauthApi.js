import api from './api';

export async function gitHub(code) { 
    const promise = await api.post(`/login/github`,null, {params: {code} });

    return promise.data;
}