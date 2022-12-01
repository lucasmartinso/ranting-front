/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import UserContext from "../contexts/userContext";
import AuthContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import RenderRestaurants from "../pages/RenderRestaurants";
import * as ratingApi from "../services/ratingApi";
import * as usersApi from "../services/usersApi";
import SearchBox from "../pages/SearchBox";
import UserBox from "../pages/UserBox";
import FiltersBox from "../pages/FiltersBox";
import Title from "../common-components/Title";
import search from '../styles/images/search.gif';
import { authTest, authTime, configVar } from "../hooks/auth";

export default function MainScreen() { 
    const { userData, setUserData } = useContext(UserContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [places, setPlaces] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [logout,setLogout] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(userData);
    const config = configVar();

    useEffect(async () => {
        try {
            const promise = await ratingApi.getPlaces();
            setPlaces(promise);
            await usersApi.auth(config);
            setAuth(true);
        } catch (error) {
            console.log(error);
        }
    },[]);

    setInterval( async () => {
        authTest(config);
    }, authTime);

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

        {filterModal ? (
            <FiltersBox 
                setFilterModal= {setFilterModal}
                setPlaces={setPlaces}
            />
        ) 
        : ""}
        <Container>
            
            <Title 
                setOpenModal= {setOpenModal}
                setUserModal= {setUserModal}
                setLogout= {setLogout}
                logout= {logout}
                screen= "main"
            />
            

            { auth ? (
            <CreatePlace onClick={() => navigate("/create/place")}>
                <CreatePlaceMessage>
                    <p>Didn't find the place ?</p>
                    <p>Create it!</p>
                </CreatePlaceMessage>
                <ion-icon name="triangle" id="triangle"></ion-icon>
                <Circle>
                    <ion-icon name="add"></ion-icon>
                </Circle>
            </CreatePlace>
            ) : "" }

            <FilterContainer>
                <FilterBox onClick={() => setFilterModal(true)}>
                    <ion-icon name="filter"></ion-icon>
                    <span>Filters</span>
                </FilterBox>
            </FilterContainer>

            {places.length > 0 ? (
            <Main>
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
const CreatePlace = styled.div`
    width: 30%;
    height: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 130px;
    position: fixed; 
    bottom: 100px;
    right: 30px;
    transition: height 1s;

    ion-icon#triangle { 
        width: 25px;
        height: 25px;
        transform: rotate(90deg);
        color: red;
    }
    
    @media (max-width: 800px) {
        width: 45%;
    }

    &:hover,
    &:focus { 
        cursor: pointer;
        height: 8%;
    }
`
const CreatePlaceMessage = styled.div`
    display: none;
    width: 150px;
    height: 55px;
    background-color: red;
    border-radius: 12px; 
    text-align: left;
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center;

    p { 
        color: white;
        font-weight: bold;
        font-size: 13px;
        margin: 5px 0px 0px 0px;
    }
`
const Circle = styled.div`
    width: 50px;
    height: 50px;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    border-radius: 50%;
    background-color: red;

    ion-icon { 
        color: white;
        font-size: 30px;
    }
`
const Main = styled.div`
    width: 100%; 
    height: 100%; 
    margin: 0px 0px 80px 0px;

    ul { 
        width: 100%; 
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
`
const FilterContainer = styled.div`
    width: 60%; 
    display: flex; 
    justify-content: flex-start;
    margin: 120px 0px 30px 0px;

    @media (max-width: 1800px) {
        width: 70%;
    }

    @media (max-width: 1600px) {
        width: 80%;
    }

    @media (max-width: 1300px) {
        width: 90%;
    }
`
const FilterBox = styled.div`
    width: 150px;
    height: 30px;
    display: flex; 
    justify-content: center; 
    align-items: center;
    background-color: red;
    color: white;
    border-radius: 12px;
    font-weight: bold;
    transition: background 2s, color 1s;
    
    ion-icon { 
        margin-right: 12px;
        width: 20px;
        height: 20px;
    }

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        background: white;
        color: black;
    }
    
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }

    @media (max-width: 750px) { 
        width: 25%;
    }

    @media (max-width: 600px) { 
        width: 30%;
    }
`
const NotFound = styled.div`
    width: 100%; 
    height: 100%; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    margin-top: 100px;
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