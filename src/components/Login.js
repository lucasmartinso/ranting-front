import { useState } from "react"
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom";
import * as AxiosRequest from "../repositories/AxiosRequests"

export default function LoginScreen() { 
  const [usernameEmail,setUsernameEmail] = useState("");
  const [password,setPassword] = useState("");
  const [clicked,setClicked] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function register(event) { 
    event.preventDefault();

    const userData = { 
      usernameEmail,
      password
    }

    try {
      setClicked(true);
      setPassword("");  
      const promise = await AxiosRequest.login(userData);
      localStorage.setItem("MY_TOKEN",promise.token);
      
      const userInfo = JSON.stringify({
        "id": promise.user.id,
        "name": promise.user.name,
        "username": promise.user.username,
        "mainPhoto": promise.user.mainPhoto
      });

      localStorage.setItem("USER_DATA",userInfo);
      navigate("/main");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
      setClicked(false);
      setError(true);
    }
  }

  return(
    <Container>

      <Title>
        <img src={logo} alt="logo"/>
      </Title>

      <form onSubmit={register}>
      <Main error={error}>
         <input
            type="text"
            placeholder="Username or email"
            value={usernameEmail}
            onChange={(event) => setUsernameEmail(event.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
        />
        <button>
          {clicked ? (
            <ThreeDots color="white" height={80} width={100} />
          ) : ("Login")}
        </button>
      </Main>
      </form>
      
      {error ? (
      <Error>
          <button>
            <span>{errorMessage}</span>
            <span id="x" onClick={() => setError(false)}>X</span>
          </button>
      </Error>
      ) : ""}

      <Message onClick={() => navigate("/sign-up")}>
        <span>First time? Sign-up!</span>
      </Message>
    </Container>
  )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
`
const Title = styled.div`
  width: 100%; 
  height: 100%;
  display: flex; 
  justify-content: center;
  margin-top: 50px;

  img { 
    width: 500px;
    height: 300px;
  }
`
const Main = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center;
  flex-direction: column;
  margin-bottom: ${props => props.error ? ("25px") : ("35px")};

  input { 
    width: 80%; 
    height: 70px;
    display: flex;
    align-items: center;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-left: 20px;
    font-size: 20px;
    font-color: #D5D5D5;
    font-color: rgba(0, 0, 0, 1);
    margin-bottom: 25px;
  }

  button { 
    width: 80%; 
    height: 70px; 
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: #000000;
    color: rgba(255,255,255,1);
    font-size: 30px;
    font-weight: bold;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    transition: 0.2s all;

    &:hover { 
      cursor: pointer;
    }

    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
`
const Error = styled.div` 
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 

  button { 
    width: 80%; 
    height: 70px; 
    display: flex;
    align-items: center; 
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
    background-color: #FF7474;
    color: rgba(255,255,255,1);
    font-size: 20px;
    font-weight: bold;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    transition: 0.2s all;

   span#x { 
    &:hover { 
      cursor: pointer;
    }

    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
   }
  }
`
const Message = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 

  span {
    color: white; 
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
    text-decoration-color: #359FE4;
    margin-bottom: 70px;
    margin-top: 30px;

    &:hover{ 
      cursor: pointer; 
    }
  
    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
`