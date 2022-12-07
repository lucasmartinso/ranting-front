import api from './api';

export async function getPlaces() {
    const promise = await api.get(`/places`)

    return promise.data;
}

export async function createReview(id,reviewData,config) {
    await api.post(`/rating/${id}`,reviewData,config);
}