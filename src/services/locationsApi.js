import api from './api';

export async function states() { 
    const promise = await api.get(`/states`);

    return promise.data;
}

export async function cities(id,city) {
    const promise = await api.post(`/cities/${id}`,null, {params: {city}});

    return promise.data;
}