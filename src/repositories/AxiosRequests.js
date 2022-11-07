import api from '../services/Api';

export async function signup(userData) { 
    await api.post(`/sign-up`,userData);
}

export async function login(userData) { 
    const promise = await api.post(`/login`,userData);
    
    return promise.data;
}

export async function getPlaces() {
    const promise = await api.get(`/places`)

    return promise.data;
}

export async function search(name) {
    const promise = await api.post(`/places/search`, null, {params: {name}});

    return promise.data;
}

export async function getPlace(id) { 
    const promise = await api.get(`/places/${id}`);
    
    return promise.data;
}

export async function changePhoto(config,mainPhoto) { 
    const promise = await api.put(`/user/photo`,mainPhoto,config);

    return promise;
}

export async function createPlace(config,placeData) { 
    await api.post(`/places/create`,placeData,config);
}

export async function createReview(id,reviewData,config) {
    await api.post(`/rating/${id}`,reviewData,config);
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