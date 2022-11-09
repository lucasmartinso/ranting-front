import api from '../hooks/Api';

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

export async function foodTypes() { 
    const promise = await api.get(`/types`);

    return promise.data;
}

export async function states() { 
    const promise = await api.get(`/states`);

    return promise.data;
}

export async function cities(id,city) {
    const promise = await api.post(`/cities/${id}`,null, {params: {city}});

    return promise.data;
}