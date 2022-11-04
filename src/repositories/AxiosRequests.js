import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.BACK_END_URL;

export async function signup(userData) { 
    await axios.post(`${URL}/sign-up`,userData);
}

export async function login(userData) { 
    const promise = await axios.post(`${URL}/login`,userData);
    
    return promise.data;
}

export async function getPlaces() {
    const promise = await axios.get(`${URL}/places`)

    return promise.data;
}

export async function search(name) {
    const promise = await axios.post(`${URL}/places/search`, null, {params: {name}});

    return promise.data;
}

export async function getPlace(id) { 
    const promise = await axios.get(`${URL}/places/${id}`);
    
    return promise.data;
}

export async function changePhoto(config,mainPhoto) { 
    const promise = await axios.put(`${URL}/user/photo`,mainPhoto,config);

    return promise;
}

export async function createPlace(config,placeData) { 
    await axios.post(`${URL}/places/create`,placeData,config);
}

export async function createReview(id,reviewData,config) {
    await axios.post(`${URL}/rating/${id}`,reviewData,config);
}

export async function foodTypes() { 
    const promise = await axios.get(`${URL}/types`);

    return promise.data;
}

export async function states() { 
    const promise = await axios.get(`${URL}/states`);

    return promise.data;
}

export async function cities(id,city) {
    console.log(id);
    const promise = await axios.post(`${URL}/cities/${id}`,null, {params: {city}});

    return promise.data;
}