import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import logo from "../styles/images/Ranting.png";
import SearchBox from "../pages/SearchBox";

export default function PlaceScreen() { 
    const { userData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(userData);

    return(
        <>
        {openModal ? (
            <SearchBox 
                setOpenModal = {setOpenModal}
            />
        ): ""}
        <Container>
            <Title>
                <span onClick={() => setOpenModal(true)}><ion-icon name="search-sharp"></ion-icon> Search</span>
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

            <Photo>
                <img src="https://i0.wp.com/sarapateando.com.br/wp-content/uploads/2021/05/47b15ddd-6b2b-4926-a3b7-57bb9e08abda.jpg?fit=1280%2C960&ssl=1" alt="title"/>
            </Photo>

            <Line>
                <div>.</div>
            </Line>

            <Description>
                <h3>Paris 6 <ion-icon name="checkmark-circle"></ion-icon></h3>
            </Description>
        </Container>
        </>
    )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
`
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
        border-radius: 0px 0px 10px 10px;
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
const Photo = styled.div`
    width: 100%; 
    height: 100%;
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(150, 150, 150, 1);

    img { 
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 0px 0px 50px 50px;
        -webkit-mask-image: linear-gradient(360deg, transparent 0%, black 80%);
    }
`
const Line = styled.div`
    width: 100%; 
    height: 30px;
    display: flex; 
    justify-content: center;
    background-color: white;
    padding-bottom: 10px;

    div {
        width: 90%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top: 15px;
    }
`
const Description = styled.div`
    width: 100%; 
    display: flex; 
    align-items: center; 
    flex-direction: column;
    background-color: white;
    border-radius: 0px 0px 10px 10px;

    h3 { 
        display: flex; 
        align-items: center;
        margin-top: 20px;
        color: balck;;
        font-weight: 700;
        font-size: 30px;
        font-family: 'Playball', cursive;
        text-decoration: overline;

        ion-icon { 
            color: #3797F0;
            margin-left: 8px;
            width: 30px;
            height: 30px;
        }
    }
`