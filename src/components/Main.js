import { useContext } from "react";
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import { useNavigate } from "react-router-dom";

export default function MainScreen() { 
    const { userData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();
    console.log(userData);
    console.log(token);
    return(
        <Container>
            <Title>
                <span><ion-icon name="search-sharp"></ion-icon> Search</span>
                <img src={logo} alt="logo"/>
                {token ? (
                <UserProfile>
                    <span>Olá, son</span>
                    <img src="https://s.yimg.com/uu/api/res/1.2/yJgQLWYXVhVDgw.PFwCQ.g--~B/aD01MjE7dz03Njg7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/pt/afp.com.br/6eab9e01093eb739a7a12cfecd85b6b0" alt="profile"/>
                </UserProfile>
                ): (
                    <Sign>
                        <button id="sign-up" onClick={() => navigate("/sign-up")}>Sign-up</button>
                        <button id="login" onClick={() => navigate("/login")}>Login</button>
                    </Sign>
                )}
            </Title>

            <Main>
                <ul>
                    <Place>
                        <Overall>
                            <span>Paris 6</span>
                            <h3>4,7 ⭐</h3>
                        </Overall>
                        <Info>
                            <img src="https://s.yimg.com/uu/api/res/1.2/yJgQLWYXVhVDgw.PFwCQ.g--~B/aD01MjE7dz03Njg7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/pt/afp.com.br/6eab9e01093eb739a7a12cfecd85b6b0" alt="place"/>
                        </Info>
                                                
                    </Place>
                </ul>
            </Main>
        </Container>
    )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
    width: 90%; 
    height: 10%;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    position: fixed;
    top: 0;
    z-index: 1;

    span {
        display: flex; 
        align-items: center;
        color: white;
        font-weight: 500;

        ion-icon { 
            width: 25px; 
            height: 25px;
            margin-right: 5px;
        }

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
    }
`
const UserProfile = styled.div`
    display: flex;

    img { 
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin-left: 5px;
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
const Main = styled.div`
    width: 100%; 
    height: 100%; 

    ul { 
        width: 100%; 
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
`
const Place = styled.li`
    width: 90%;
    height: 350px;
    background-color: white;
    margin-top: 150px;
    border-radius: 12px;
    padding: 25px 0px 0px 0px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
    
`
const Overall = styled.div`
    width: 12%; 
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;

    span { 
        margin-bottom: 10px;
    }
`
const Info = styled.div`
    width: 88%; 
    height: 100%;
    display: flex;

    img { 
        width: 97%;
        height: 65%;
        object-fit: cover;
        border-radius: 6px;
    }
`