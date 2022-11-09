import api from './api';

export async function foodTypes() { 
    const promise = await api.get(`/types`);

    return promise.data;
}