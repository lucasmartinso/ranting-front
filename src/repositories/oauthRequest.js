import api from '../services/Api';

export async function gitHub(code) { 
    const { data } = await api.post(`/login/github`, { code });

    return data;
}