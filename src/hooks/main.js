import * as ratingApi from "../services/ratingApi";
import * as usersApi from "../services/usersApi";
import * as  filtersApi from "../services/filtersApi";

async function main(filter,setPlaces,config,setAuth) { 
    try {
        if(filter) { 
            const promise = await filtersApi.filter(filter.main,filter.metod);
            setPlaces(promise);
        } else {
            const promise = await ratingApi.getPlaces();
            setPlaces(promise);
        }
        await usersApi.auth(config);
        setAuth(true);
    } catch (error) {
        console.log(error);
    }
}

export const mainFunctions = { 
    main
}