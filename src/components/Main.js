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
    const user = JSON.parse(userData);
    console.log(user);
    console.log(token);
    return(
        <Container>
            <Title>
                <span><ion-icon name="search-sharp"></ion-icon> Search</span>
                <img src={logo} alt="logo"/>
                {token ? (
                <UserProfile>
                    <span>Olá, {user.name}</span>
                    {user.mainPhoto ? (
                        <img src={user.mainPhoto} alt="profile"/>
                    ): ( <ion-icon name="person-circle-sharp"></ion-icon> )}
                    
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
                        <Container2>
                            <Overall>
                                <span>Paris 6 <ion-icon name="checkmark-circle"></ion-icon></span>
                                <h3>4,7 ⭐</h3>
                            </Overall>
                            <Info>
                                <img src="https://i0.wp.com/sarapateando.com.br/wp-content/uploads/2021/05/47b15ddd-6b2b-4926-a3b7-57bb9e08abda.jpg?fit=1280%2C960&ssl=1" alt="place"/>
                            </Info>
                        </Container2>
                        <Ranting>
                            <TextBox>
                                <span>Carro chefe:</span>
                                <h4>Salmão</h4>
                            </TextBox> 
                            <TextBox>
                                <span>Número de avaliações:</span>
                                <h4>372</h4>
                            </TextBox>
                            <TextBox>
                                <span>Comida:</span>
                                <h4> 4,8 ⭐</h4>
                            </TextBox>
                            <TextBox>
                                <span>Atendimento:</span>
                                <h4> 4,8 ⭐</h4>
                            </TextBox>
                            <TextBox>
                                <span>Preço:</span>
                                <h4> 4,8 ⭐</h4>
                            </TextBox>
                            <TextBox>
                                <span>Ambiente:</span>
                                <h4> 4,8 ⭐</h4>
                            </TextBox>
                        </Ranting>                 
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

    ion-icon { 
        margin-left: 5px;
        width: 40px;
        height: 40px;
        color : white;
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
    margin-top: 150px;

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
    border-radius: 12px;
    padding: 25px 0px 0px 0px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`
const Container2 = styled.div`
    width: 100%; 
    height: 70%; 
    display: flex;
`
const Overall = styled.div`
    width: 15%; 
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 23px;
    font-weight: bold;
    margin-top: 20px;
    margin-right: 10px;
    font-family: 'Playball', cursive;

    span { 
        margin-bottom: 20px;
        text-decoration: overline;
        display: flex;

        ion-icon { 
            color: #3797F0;
            margin-left: 8px;
            transition: 0.2s all;
        }
    }

    h3 { 
        font-weight: black;
    }
`
const Info = styled.div`
    width: 85%; 
    height: 100%;
    display: flex;

    img { 
        width: 98%;
        height: 90%;
        object-fit: cover;
        border-radius: 6px;
    }
` 
const Ranting = styled.div`
    width: 100%; 
    display: flex;
    justify-content: center;
    padding: 10px 0px 0px 0px;
    font-family: 'Playball', cursive;
    font-size: 24px;
`
const TextBox = styled.li`
    text-align: center;
    margin-right: 20px;

    span {
        font-weight: 500;
    }
`