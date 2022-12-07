import * as  locationsApi from "../services/locationsApi";
import * as usersRequests from "../services/usersApi";
import * as  filtersAPi from "../services/filtersApi";

async function initial(config,setAuth,setTypes,setStates) { 
  try {
    await usersRequests.auth(config);
    setAuth(true);
    const promiseType = await filtersAPi.foodTypes();
    const promiseState = await locationsApi.states();
    setTypes(promiseType);
    setStates(promiseState);
  } catch (error) {
    console.log(error);
  }
}

// async function create(name,description,mainPhoto,type,city,address,token,setClicked,setErrorMessage,setError) { 
    
// }

async function searchCity(event,setCity,state,setCities) { 
  setCity({id: null,name: event});
  const name = event;
    
  try {
    const promise = await locationsApi.cities(state.id,name);
    setCities(promise);
    if(promise.length === 0) setCities(null);
  } catch (error) {
    console.log(error);
    setCities([]);
  }
}

export const createFunctions = { 
    initial,
    searchCity
}