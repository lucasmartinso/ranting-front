import api from '../services/Api';

export async function gitHub(code) { 
    const promise = await api.post(`/login/github`,null, {params: {code} });
    console.log('FOIIIIIII');
    

    return promise.data;
}