import * as usersApi from "../services/usersApi"

async function register(name,username,email,password,confirmPassword,setClicked,setConfirmPassword,setPassword,setErrorMessage,setError) { 
    const userData = { 
        name,
        username,
        email,
        password,
        confirmPassword
      }
  
      try {
        setClicked(true);
        setConfirmPassword("");
        setPassword("");  
        await usersApi.signup(userData);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data);
        setClicked(false);
        setError(true);
      }
}

export const signupFunctions = { 
    register
}