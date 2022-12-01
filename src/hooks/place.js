import * as placesApi from "../services/placesApi";
import * as usersApi from "../services/usersApi";

async function place(id,setPlace,setReviews,config,setAuth) { 
    const promise = await placesApi.getPlace(id);
    if(promise[0] !== undefined) {
        setPlace(promise[0]);
        setReviews(promise[0].ratings);
    } else { 
       setPlace(promise);
        console.log(promise);
    }

    try {
        await usersApi.auth(config);
        setAuth(true);
    } catch (error) {
        setAuth(false)
    }
}

export const placeFunctions = { 
    place
}