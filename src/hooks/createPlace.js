import * as  locationsApi from "../services/locationsApi";

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
    searchCity
}