import api from './api';

export async function foodTypes() { 
    const promise = await api.get(`/types`);

    return promise.data;
}

export async function filter( main, metod ) { 
    const promise = await api.get(``); 

    return promise.data;
}