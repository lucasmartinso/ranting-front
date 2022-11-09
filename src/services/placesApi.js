import api from './api';

export async function search(name) {
    const promise = await api.post(`/places/search`, null, {params: {name}});

    return promise.data;
}

export async function getPlace(id) { 
    const promise = await api.get(`/places/${id}`);
    
    return promise.data;
}

export async function createPlace(config,placeData) { 
    await api.post(`/places/create`,placeData,config);
}