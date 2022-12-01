import { useContext, useState } from "react"
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom";
import google from "../styles/images/google-icon.png";
import salad from '../styles/images/salad.gif';
import closed from '../styles/images/closed.gif';
import AuthContext from '../contexts/authContext';
import redirectToGithub, { userGitInfo } from "../hooks/OAuth/gitHub";
import { loginFunctions } from "../hooks/login";

export default function LoginScreen() { 
  const [usernameEmail,setUsernameEmail] = useState("");
  const [password,setPassword] = useState("");
  const [clicked,setClicked] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [gitClick, setGitClick] = useState(0);
  const [gitUser, setGitUser] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(password); 

  async function gitHub() {
    setGitClick(() => ++gitClick);
    if(gitClick>0) {

      try {
        redirectToGithub();
        const user = await userGitInfo();
        setGitUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  } 

  async function register(event) { 
    event.preventDefault();
    console.log("kkkk");
    try {
      await loginFunctions.register(usernameEmail,password,setClicked,setPassword,setAuth,setErrorMessage,setError)
      navigate("/main");
      window.location.reload();
    } catch (error) {
      console.log(error);
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
            {changeImage ? (
              <img src={closed} alt={closed} id='closed'/>
            ) : (
              <img src={salad} alt={salad} />
            )}
          </IteractiveImages>
          
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameEmail}
            onChange={(event) => setUsernameEmail(event.target.value)}
            onClick={() => setChangeImage(false)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onClick={() => setChangeImage(true)}
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

        <Line>
          <div>.</div>
        </Line>

        <OAuthBox>
          <ButtonAuth back="black" text="white" icon="white" onClick={() => gitHub(true)} working={true}>
            <ion-icon name="logo-github"></ion-icon>
            <span>Login with GitHub</span>
          </ButtonAuth>

          <ButtonAuth back="white" text="black" icon="black" working={false}>
            <img src={google} alt='google'/>
            <ion-icon name="logo-google" id="google"></ion-icon>
            <span>Login with Google</span>
          </ButtonAuth>

          <ButtonAuth back="#314A86" text="white" icon="white" working={false}>
            <ion-icon name="logo-facebook"></ion-icon>
            <span>Login with Facebook</span>
          </ButtonAuth>

          <ButtonAuth back="#2B9BF0" text="white" icon="white" working={false}>
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

  @media (max-width: 800px) {
    position: absolute;
  }
  
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

  @media (max-width: 800px) {
    margin-top: 330px;
    margin-bottom: 200px;
  }
`
const SignInContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    width: 100%;
    height: 50%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 250px;
  }
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
  transition: background 2s;

  img { 
    width: 96px; 
    height: 96px; 
    border-radius: 50%; 
  }

  img#closed { 
    width: 96px; 
    height: 96px; 
    border-radius: 50%; 
  }

  &:hover, 
  &:focus{  
    background: black;
  }
`
const Upright = styled.div`
    width: 1px;
    height: 100%;
    border: 1px solid #D4D4D4; 
    margin: 0px 30px;

    @media (max-width: 800px) {
      display: none;
    }
`
const Line = styled.div`
  display: none; 

  @media (max-width: 800px) {
    width: 100%; 
    height: 30px;
    display: flex; 
    justify-content: center;
    margin: 20px 0px;

    div {
      width: 70%;
      height: 1px;
      border: 1px solid #D4D4D4;
      margin-top: 15px;
      color: #359FE4;
    }

    div#logout { 
    margin-top: 7px;
    }
  }
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
  transition: background color 2s;

  ion-icon { 
    color: ${props => props.icon ? (`${props.icon}`) : ('red')};
    width: 30px;
    height: 30px;
  }

  ion-icon#google { 
    display: none;
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

  ${props => !props.working ? (`
    &:hover,   
    &:focus{ 
      cursor: not-allowed; 
      background-color: rgba(0, 0, 0, 0.58);
      span { 
        color: black;
      }
      ion-icon#google { 
        display: inline;
      }
      ion-icon { 
        display: inline;
        color: black;
      }
      img {
        display: none;
      } 
    }
  `): (`
    &:hover { 
      cursor: pointer;
    }
  `)}
  

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

  @media (max-width: 800px) {
    span { 
      margin: 0px 0px 40px 0px;
    }
  }
`