/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import { useNavigate } from "react-router-dom";
import RenderRestaurants from "../pages/RenderRestaurants";
import * as axiosRequests from "../repositories/AxiosRequests";
import * as usersRequests from "../repositories/usersRequests";
import SearchBox from "../pages/SearchBox";
import UserBox from "../pages/UserBox";
import search from '../styles/images/search.gif';
import { authTest } from "../services/auth";

export default function MainScreen() { 
    const { userData, setUserData } = useContext(UserContext);
    const { token, setToken } = useContext(TokenContext);
    const [places, setPlaces] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [logout,setLogout] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(userData);
    const [auth, setAuth] = useState(false);
    const authTime = 1000 * 60;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    useEffect(async () => {
        try {
            const promise = await axiosRequests.getPlaces();
            setPlaces(promise);
            await usersRequests.auth(config);
            setAuth(true);
        } catch (error) {
            console.log(error);
        }
    },[]);

    function exit() { 
        setToken(null);
        localStorage.setItem("MY_TOKEN",null);
        setLogout(false);
        setAuth(false);
    }

    setInterval( async () => {
        authTest(config,setAuth);
    }, authTime)

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
                {auth ? (
                <UserProfile>
                    <span>Hello, {auth ? (user.name) : ("")}</span>
                    {user.mainPhoto ? (
                        <img src={user.mainPhoto} alt="profile" onClick={() => setUserModal(true)}/>
                    ): ( <ion-icon name="person-circle-sharp" onClick={() => setUserModal(true)} id="photo"></ion-icon> )}
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
                    <span id="logout" onClick={exit}>Logout</span>
                </Logout>
            ) : ""}

            { auth ? (
            <CreatePlace onClick={() => navigate("/create/place")}>
                <Circle>
                    <ion-icon name="add">
                </ion-icon></Circle>
            </CreatePlace>
            ) : "" }

            {places.length > 0 ? (
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
            ) : (
                <NotFound>
                    <img src={search} alt='not_found' />
                    <p id='bold'>No Restaurant Was Found</p>
                    <p>Make a new search or register a new restaurant</p>
                </NotFound>
            )}

            <LineCopright>
                <div>.</div>
                <h4>Copyright © Rating 2022</h4>
            </LineCopright>
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
    align-items: center;

    img { 
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin-left: 8px;
    }

    ion-icon { 
        margin-left: 10px;
        width: 30px;
        height: 30px;
        color : white;
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
    width: 20%;
    height: 5%;
    display: flex;
    justify-content: flex-end;
    margin-top: 130px;
    position: fixed; 
    bottom: 100px;
    right: 30px;
`
const Circle = styled.div`
    width: 50px;
    height: 50px;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    border-radius: 50%;
    background-color: #D74761;

    ion-icon { 
        color: white;
        font-size: 30px;
    }

    &:hover { 
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
    margin: 130px 0px 80px 0px;

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
        color: white;
    }
`
const NotFound = styled.div`
    width: 100%; 
    height: 100%; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    margin-top: 250px;
    flex-direction: column;

    img { 
        width: 500px;
        height: 300px;
        margin-bottom: 15px;
        object-fit: cover;
    }

    p { 
        color: white;
        margin-bottom: 10px;
        font-size: 18px;
    } 

    p#bold { 
        font-weight: bold;
        font-size: 30px;
    }
`
const LineCopright = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: column;
    align-items: center;
    background-color: #359FE4;
    padding-bottom: 10px;
    background-color: white;
    margin-top: 50px;
    position: fixed; 
    bottom: 0;
    left: 0;

    div {
        width: 90%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top: 5px;
    }

    h4 { 
        margin: 15px 0px 10px 0px;
    }
`