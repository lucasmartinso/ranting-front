/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../styles/images/Ranting.png";
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import AuthContext from "../contexts/authContext";
import { useContext, useEffect } from "react";
import * as usersRequests from "../services/usersApi";
import { authTest, authTime, configVar } from "../hooks/auth";

export default function MainTitle({ setOpenModal, setUserModal, setLogout, logout, screen }) { 
    const { userData } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);
    const { auth, setAuth } = useContext(AuthContext);
    const user = JSON.parse(userData);
    const config = configVar();

    const navigate = useNavigate();

    useEffect(async () => {
        try {
          await usersRequests.auth(config);
          setAuth(true);
        } catch (error) {
          console.log(error);
        }
    },[]);
    
    setInterval( async () => {
        authTest(config);
    }, authTime)

    function exit() { 
        setToken(null);
        localStorage.setItem("MY_TOKEN",null);
        setLogout(false);
        setAuth(false);
        if(screen==="create") navigate('/main');
    }

    return(
    <>
        <Title>
        <ExitAndSearch>
            <ion-icon name="home" id="home" onClick={() => navigate('/main')}></ion-icon>
            <span onClick={() => setOpenModal(true)} id="search"><ion-icon name="search-sharp"></ion-icon> Search</span>
        </ExitAndSearch>
        <img src={logo} alt="logo"/>
        {auth ? (
            <UserProfile>
            <span onClick={() => setUserModal(true)}>Hello, {user.name}</span>
            {user.mainPhoto ? (
                <img src={user.mainPhoto} alt="profile" onClick={() => setUserModal(true)}/>
                ): ( <ion-icon name="person-circle-sharp" id="photo"></ion-icon> )}
            {logout ? ( 
                <ion-icon name="chevron-up-outline" onClick={() => setLogout(false)}></ion-icon>
            ) : ( 
                <ion-icon name="chevron-down-outline" onClick={() => setLogout(true)}></ion-icon>
            )}
            </UserProfile>
        ): (
            <Sign>
                <button id="sign-up" onClick={() => navigate("/sign-up")}>Sign-up</button>
                <button id="login" onClick={() => navigate("/login")}>Login</button>
            </Sign>
        )}
        </Title>

        {logout ? (
        <Logout>
            <Line>
            <div id="logout">.</div>
            </Line>
            <span onClick={() => setUserModal(true)}>Change your photo</span>
            <Line>
            <div id="logout">.</div>
            </Line>
            <span id="logout" onClick={exit}>Logout</span>
        </Logout>
        ) : ""}
    </>
    )
}

const Title = styled.div`
  width: 100%; 
  height: 10%;
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 0px 30px;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #359FE4;
  border-radius: 0px 0px 10px 10px;

  span {
    display: flex; 
    align-items: center;
    color: white;
    font-weight: 500;

    &:hover { 
      cursor: pointer;
    }
    
    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }    
  }
  
  ion-icon { 
    width: 25px; 
    height: 25px;
    margin-right: 5px;

    &:hover { 
      cursor: pointer;
    }
    
    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }

  img { 
    width: 140px;
    height: 70px;
    border-radius: 0px 0px 10px 10px;
  }
`
const ExitAndSearch = styled.div`
  width: 140px;
  height: 100%; 
  display: flex; 
  justify-content: space-between;
  align-items: center;

  span#search { 
    transition: font-size 1s, width 1s, height 1s;

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        font-size: 20px;

        ion-icon { 
            width: 28px;
            height: 28px;
        }
    }
  }

  ion-icon#home { 
    width: 30px; 
    height: 30px;
    color: rgba(0, 0, 0, 0.58);
    transition: color 1s;

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        color: white;
    }

    @media (max-width: 600px) {
        width: 23px;
        height: 23px;
    }
  }

  @media (max-width: 600px) {
    width: 110px;
    ion-icon { 
        width: 20px;
        height: 20px;
    }
  }
`
const UserProfile = styled.div`
    display: flex;
    align-items: center;

    img { 
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
      margin-left: 5px;
    }

    ion-icon { 
      margin-left: 5px;
      width: 30px;
      height: 30px;
      color: white;
    }

    ion-icon#photo { 
        width: 40px;
        height: 40px;
        margin-left: 5px;
    }

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }

    @media (max-width: 600px) {
        span { 
            display: none;
        }
    }
`
const Sign = styled.div`
    display: flex;

    button { 
        width: 70px;
        height: 40px;
        margin-right: 10px;
        border: 1px solid #359FE4;
        border-radius: 15px;
        display: flex; 
        align-items: center; 
        justify-content: center;
        font-weight: bold;
        font-size: 16px;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    button#login { 
        background-color: black; 
        color: white; 
    } 

    button#sign-up { 
        background-color: white; 
        color: black; 
    }
`
const Logout = styled.div`
    width: 230px;
    height: 60px;
    background-color: white; 
    margin-top: 100px;
    position: fixed;
    right: 0;
    top: 0px;
    border-radius: 0px 0px 0px 10px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px 5px 5px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.25);
    z-index: 2;

    span { 
        font-weight: bold;
        font-size: 16px;

        &:hover{ 
            cursor: pointer; 
        }
        
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    span#logout { 
        color: red;
        margin-bottom: 3px;
    }

    @media (max-width: 600px) {
        width: 170px;

        span { 
            font-size: 14px;
        }
    }
`
export const Line = styled.div`
    width: 100%; 
    height: 1px;
    display: flex; 
    justify-content: center;
    background-color: white;
    padding-bottom: 10px;
    color: white;

    div {
        width: 90%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top:2px;
    }
`