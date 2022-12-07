import * as ratingApi from "../services/ratingApi";

async function sendRating(token,food,environment,attendance,price,comment,id,setRatingModel,setErrorMessage,setError) { 
        
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const reviewData = { 
        food,
        environment,
        attendance,
        price,
        comment
    };

    try {
        await ratingApi.createReview(id,reviewData,config);
        setRatingModel(false);
        window.location.reload();
    } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data);
        setError(true);
    }
}

export const ratingFunctions = {
    sendRating
}