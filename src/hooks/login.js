import * as usersApi from "../services/usersApi";

async function register(usernameEmail,password,setClicked,setPassword,setAuth,setErrorMessage,setError) { 
    const userData = { 
      usernameEmail,
      password
    }

    console.log(userData);

    try {
      setClicked(true);
      setPassword("");  
      const promise = await usersApi.login(userData);
      console.log(promise);
      localStorage.setItem("MY_TOKEN",promise.token);
      
      const userInfo = JSON.stringify({
        "id": promise.user.id,
        "name": promise.user.name,
        "username": promise.user.username,
        "mainPhoto": promise.user.mainPhoto
      });

      localStorage.setItem("USER_DATA",userInfo);
      setAuth(true);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setErrorMessage(error.response.data);
      setClicked(false);
      setError(true);
    }
}

export const loginFunctions = { 
    register
}