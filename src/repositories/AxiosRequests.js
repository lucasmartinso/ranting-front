import axios from "axios";

const URL = "http://localhost:5000"

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