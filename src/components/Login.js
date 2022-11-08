import { useState } from "react"
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom";
import * as usersRequests from "../repositories/usersRequests";
import google from "../styles/images/google-icon.png";
import salad from '../styles/images/salad.gif';
import redirectToGithub, { userGitInfo } from "../services/OAuth/gitHub";

export default function LoginScreen() { 
  const [usernameEmail,setUsernameEmail] = useState("");
  const [password,setPassword] = useState("");
  const [clicked,setClicked] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [gitClick, setGitClick] = useState(0);
  const [gitUser, setGitUser] = useState([]);
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
      const promise = await usersRequests.login(userData);
      localStorage.setItem("MY_TOKEN",promise.token);
      
      const userInfo = JSON.stringify({
        "id": promise.user.id,
        "name": promise.user.name,
        "username": promise.user.username,
        "mainPhoto": promise.user.mainPhoto
      });

      localStorage.setItem("USER_DATA",userInfo);
      navigate("/main");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
      setClicked(false);
      setError(true);
    }
  }

  async function gitHub() {
    setGitClick(() => ++gitClick);
    if(gitClick>0) {

      try {
        redirectToGithub();
        const user = userGitInfo();
        setGitUser(user);
        console.log("Deu bom");
      } catch (error) {
        console.log(error);
      }
    }
  } 

  return(
    <Container>

      <Title>
        <img src={logo} alt="logo"/>
      </Title>

      <SignInContainer>
        <form onSubmit={register}>
        <Main error={error}>
          <IteractiveImages>
            <img src={salad} alt={salad} />
          </IteractiveImages>
          
          <input
            type="text"
            placeholder="Username or Email"
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
            ) : ("LOGIN")}
          </button>
        </Main>
        </form>

        <Upright>.</Upright>

        <OAuthBox>
          <ButtonAuth back="black" text="white" icon="white" onClick={() => gitHub(true)}>
            <ion-icon name="logo-github"></ion-icon>
            <span>Login with GitHub</span>
          </ButtonAuth>

          <ButtonAuth back="white" text="black" icon="black">
            <img src={google} alt='google'/>
            <span>Login with Google</span>
          </ButtonAuth>

          <ButtonAuth back="#314A86" text="white" icon="white">
            <ion-icon name="logo-facebook"></ion-icon>
            <span>Login with Facebook</span>
          </ButtonAuth>

          <ButtonAuth back="#2B9BF0" text="white" icon="white">
            <ion-icon name="logo-twitter"></ion-icon>
            <span>Login with Twiter</span>
          </ButtonAuth>

        </OAuthBox>
      </SignInContainer>
      
      {error ? (
      <Error>
          <button>
            <span>{errorMessage}</span>
            <span id="x" onClick={() => setError(false)}>X</span>
          </button>
      </Error>
      ) : ""}

      <Message>
        <span onClick={() => navigate("/sign-up")}>First time? Sign-up!</span>
      </Message>
    </Container>
  )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  position: fixed; 
  top: 0; 
  left: 0;
  display: flex;
  align-items: center; 
  justify-content: center; 
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
const SignInContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
const Main = styled.div`
  width: 400px; 
  height: 100%; 
  display: flex; 
  align-items: center;
  flex-direction: column;
  background-color: white;
  margin-bottom: ${props => props.error ? ("25px") : ("35px")};
  border-radius: 12px;
  padding-top: 30px;

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
    width: 50%; 
    height: 50px; 
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: #000000;
    color: rgba(255,255,255,1);
    font-size: 22px;
    font-weight: bold;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
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
const IteractiveImages = styled.div`
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  border: 2px solid black;
  display: flex;
  justify-content: center; 
  align-items: center;
  margin-bottom: 20px;

  img { 
    width: 96px; 
    height: 96px; 
    border-radius: 50%; 
  }
`
const Upright = styled.div`
    width: 1px;
    height: 100%;
    border: 1px solid #D4D4D4; 
    margin: 0px 30px;
`
const OAuthBox = styled.div`
  width: 400px;
  height: 100%;
  background-color: white;
  padding-top: 40px;
  border-radius: 12px;
  display: flex; 
  flex-direction: column;
  align-items: center;
`
const ButtonAuth = styled.div`
  width: 85%;
  height: 60px;
  background-color: ${props => props.back ? (`${props.back}`) : ('red')};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

  ion-icon { 
    color: ${props => props.icon ? (`${props.icon}`) : ('red')};
    width: 30px;
    height: 30px;
  }

  span { 
    color: ${props => props.text ? (`${props.text}`) : ('red')};
    margin-left: 20px;
    font-weight: bold;
  }

  img { 
    width: 40px;
    height: 30px;
  }

  &:hover { 
    cursor: pointer;
  }

  &:active {  
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const Error = styled.div` 
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 
  margin-top: 30px;

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
    margin: 30px 0px 230px 0px;

    &:hover{ 
      cursor: pointer; 
    }
  
    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
`