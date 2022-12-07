import api from './api';

export async function foodTypes() { 
    const promise = await api.get(`/types`);

    return promise.data;
}

export async function filter( main, metod ) { 
    const promise = await api.get(`places/${main}/${metod}`); 

    return promise.data;
}