/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import { useNavigate } from "react-router-dom";
import RenderRestaurants from "../pages/RenderRestaurants";
import * as axiosRequests from "../repositories/AxiosRequests";
import SearchBox from "../pages/SearchBox";
import UserBox from "../pages/UserBox";

export default function MainScreen() { 
    const { userData, setUserData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [places, setPlaces] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [logout,setLogout] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(userData);
    console.log(user);

    useEffect(async () => {
        try {
            const promise = await axiosRequests.getPlaces();
            setPlaces(promise);
        } catch (error) {
            console.log(error);
        }
    },[]);

    console.log(places);

    return(
        <>
        {openModal ? (
            <SearchBox 
                setOpenModal = {setOpenModal}
            />
        ): ""}

        {userModal ? (
            <UserBox 
                setUserModal = {setUserModal}
                user = {user}
                setUserData = {setUserData}
            />
        ): ""}
        <Container>
            <Title>
                <span onClick={() => setOpenModal(true)}><ion-icon name="search-sharp"></ion-icon> Search</span>
                <img src={logo} alt="logo"/>
                {token ? (
                <UserProfile>
                    <span>Hello, {user.name}</span>
                    {user.mainPhoto ? (
                        <img src={user.mainPhoto} alt="profile" onClick={() => setUserModal(true)}/>
                    ): ( <ion-icon name="person-circle-sharp" onClick={() => setUserModal(true)}></ion-icon> )}
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
                        <div>.</div>
                    </Line>
                    <span onClick={() => setUserModal(true)}>Change your photo</span>
                    <Line>
                        <div>.</div>
                    </Line>
                    <span id="logout">Logout</span>
                </Logout>
            ) : ""}

            { token ? (
            <CreatePlace>
                    <Box onClick={() => navigate("/create/place")}>Create an Place<ion-icon name="add-circle-sharp"></ion-icon></Box>
            </CreatePlace>
            ) : "" }

            <Main token = {token}>
                <ul>
                    {places.map(place => (
                        <RenderRestaurants 
                            id = {place.id}
                            name = {place.name}
                            mainPhoto = {place.mainPhoto}
                            score = {place.score}
                            typefood = {place.typefood}
                            food = {place.food}
                            price = {place.price}
                            attendance = {place.attendance}
                            environment = {place.environment}
                            ratings = {place.numberRatings}
                            verify = {place.verify}
                            type = {place.type}
                        />
                    ))}
                </ul>
            </Main>
        </Container>
        </>
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
    padding-top: 30px;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #359FE4;

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
        margin-left: 8px;
    }

    ion-icon { 
        margin-left: 5px;
        width: 40px;
        height: 40px;
        color : white;
    }

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
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
    right: 5%;
    top: 0px;
    border-radius: 0px 0px 0px 10px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px 5px 5px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.25);

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
    }
`
const CreatePlace = styled.div`
    width: 90%;
    height: 10%;
    display: flex;
    margin-top: 130px;
`
const Box = styled.button`
    width: 30%;
    height: 50px;
    font-size: 22px;
    font-weight: bold;
    color: white;
    background-color: #F5C127;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed black;
    box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.25);

    ion-icon { 
        margin-left: 5px;
        width: 30px;
        height: 30px;
        color: white;
    }
    
    &:hover{ 
        cursor: pointer; 
    }
    
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`
const Main = styled.div`
    width: 100%; 
    height: 100%; 
    margin-top: ${props => props.token ? ("40px") : ("130px")};

    ul { 
        width: 100%; 
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
`
const Line = styled.div`
    width: 100%; 
    height: 1px;
    display: flex; 
    justify-content: center;
    background-color: white;
    padding-bottom: 10px;

    div {
        width: 90%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top:2px;
    }
`