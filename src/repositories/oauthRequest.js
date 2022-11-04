import api from '../services/Api';

export async function gitHub() { 
    await api.post(`/login/github`)
}