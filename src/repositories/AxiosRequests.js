import axios from "axios";

const URL = "http://localhost:5000"

export async function signup(userData) { 
    await axios.post(`${URL}/sign-up`,userData);
}

export async function login(userData) { 
    await axios.post(`${URL}/login`,userData);
}