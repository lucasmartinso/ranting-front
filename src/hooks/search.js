import * as placesApi from "../services/placesApi"

async function searchPlace(event,setSearch,setPlaces) {
    setSearch(event);
    const name = event;
    console.log(name);
    
    try {
        if(name.length>2) {
            const promise = await placesApi.search(name);
            setPlaces(promise);
            if(promise.length === 0) setPlaces(null);
        }
    } catch (error) {
        console.log(error);
        setPlaces(null);
    }
}   

export const searchFunctions = { 
    searchPlace
}