import api from '../hooks/Api';

export async function signup(userData) { 
    await api.post(`/sign-up`,userData);
}

export async function login(userData) { 
    const promise = await api.post(`/login`,userData);
    
    return promise.data;
}

export async function changePhoto(config,mainPhoto) { 
    const promise = await api.put(`/user/photo`,mainPhoto,config);

    return promise;
}

export async function auth(config) { 
    const promise = await api.post('/auth',null,config);

    return promise.data;
}