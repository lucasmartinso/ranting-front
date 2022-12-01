/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import AuthContext from "../contexts/authContext";
import Title from "../common-components/Title";
import SearchBox from "../pages/SearchBox";
import * as placesApi from "../services/placesApi";
import * as usersApi from "../services/usersApi";
import RenderReviews from "../pages/RenderReviews";
import UserBox from "../pages/UserBox";
import RatingBox from "../pages/RatingBox";
import { authTest, authTime, configVar } from "../hooks/auth";

export default function PlaceScreen() { 
    const { userData, setUserData } = useContext(UserContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [place, setPlace] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [logout, setLogout] = useState(false);
    const { id } = useParams();
    const [userModal, setUserModal] = useState(false);
    const [ratingModel,setRatingModel] = useState(false);
    const user = JSON.parse(userData);
    const config = configVar();

    useEffect(async() => { 
        const promise = await placesApi.getPlace(id);
        if(promise[0] !== undefined) {
            setPlace(promise[0]);
            setReviews(promise[0].ratings);
        } else { 
            setPlace(promise);
            console.log(promise);
        }

        try {
            await usersApi.auth(config);
            setAuth(true);
        } catch (error) {
            setAuth(false)
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

        {ratingModel ? (
            <RatingBox 
                setRatingModel = {setRatingModel}
                user = {user}
                id = {id}
            />
        ): ""}

        <Container>
            <Title 
                setOpenModal= {setOpenModal}
                setUserModal= {setUserModal}
                setLogout= {setLogout}
                logout= {logout}
                screen= "place"
            />

            <Photo>
                <img src={place.mainPhoto} alt="title"/>
            </Photo>

            <Line>
                <div>.</div>
            </Line>
            
            <Main>
                <h3>{place.name} <ion-icon name="checkmark-circle"></ion-icon></h3>    
                <TagName><h3>Description:</h3></TagName>
                <Rating>
                    <TextBox>
                        <span>Address:</span>
                        <h4>{place.address}</h4>
                    </TextBox> 
                    <TextBox>
                        <span>City:</span>
                        <h4>{place.city}</h4>
                    </TextBox> 
                    {place.description ? ( 
                    <TextBox>
                        <span>Description:</span>
                        <h4>{place.description}</h4>
                    </TextBox>
                    ) : ""}  
                    {place.website ? (
                    <TextBox>
                        <span id="website">Website:</span>
                        <h4 id="website" onClick={() => window.open(place.website)}>{place.website}</h4>
                    </TextBox> 
                    ) : ""}
                </Rating>
                
                {place.score !== "0"  ? (
                <>
                <TagName><h3>Stats:</h3></TagName>
                <Rating>
                    <TextBox>
                        <span id="score">Total Score:</span>
                        <h4 id="score">{Number(place.score).toFixed(1).replace(".",",")}⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span id="type">Specialty Food:</span>
                        <h4 id="type">{place.type}</h4>
                    </TextBox>  
                    <TextBox>
                        <span>Food:</span>
                        <h4>{Number(place.food).toFixed(1).replace(".",",")}⭐</h4>
                    </TextBox>  
                    <TextBox>
                        <span>Price:</span>
                        <h4>{Number(place.price).toFixed(1).replace(".",",")}⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Attendance:</span>
                        <h4>{Number(place.attendance).toFixed(1).replace(".",",")}⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Environment:</span>
                        <h4>{Number(place.environment).toFixed(1).replace(".",",")}⭐</h4>
                    </TextBox> 
                </Rating>
                </>
                 ) : ""}
            </Main>
            
            {auth ? (
                <Container2>
                    <Review>
                        <Box onClick={() => setRatingModel(true)}>Make a Review</Box>
                    </Review>
                </Container2>
            ) : ('')}

            {place.score !== "0"  ? (
            <Reviews auth={auth}>
                <ul>
                    {reviews.map(review => (
                        <RenderReviews 
                            userId = {review.userId}
                            username = {review.username}
                            name = {review.name}
                            mainPhoto = {review.mainPhoto}
                            food = {review.food}
                            price = {review.price}
                            attendance = {review.attendance}
                            environment = {review.environment}
                            comment = {review.comment}
                        />
                    ))}
                </ul>
            </Reviews>
            ) : (
                <New>
                    <span>⭐⭐ New ⭐⭐</span>
                </New>
            ) }
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
`
const Photo = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(150, 150, 150, 1);
    margin-top: 88px;

    img { 
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
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
        color: white;
    }

    div#logout { 
        margin-top: 7px;
    }
`
const Main = styled.div`
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
        font-size: 60px;
        font-family: 'Playball', cursive;
        text-decoration: overline;

        ion-icon { 
            color: #3797F0;
            margin-left: 12px;
            width: 45px;
            height: 45px;
        }
    }

    h3#description {
        display: flex;
        justify-content: flex-start;
    }
`
const Rating = styled.div`
    width: 90%; 
    height: 100%;
    font-family: 'Playball', cursive;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
`
const TextBox = styled.div`
    text-align: center;
    margin-right: 20px;
    font-size: 25px;

    span {
        font-weight: 500;
    }

    h4 { 
        padding-top: 5px;
    }

    span#score,
    h4#score {
        font-weight: 700;
        font-size: 30px;
    }

    h4#website { 
        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    @media (max-width: 750px) { 
        span#website,
        h4#website,
        span#type,
        h4#type { 
            display: none;
        }

        font-size: 19px;
    }
`
const TagName = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center; 
    padding-left: 40px;

    h3 {
        margin-top: 20px;
        color: balck;;
        font-weight: 700;
        font-size: 30px;
        font-family: 'Playball', cursive;
        text-decoration: underline;
    }
`
const Reviews = styled.div`
    width: 100%; 
    height: 100%; 
    margin-top: ${props => props.auth ? ("0px") : ("70px")};

    ul { 
        display: flex;
        flex-direction: column; 
        align-items: center;
    }
`
const New = styled.div`
    width: 100%; 
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: white;
    margin-top: 30px;

    span { 
        font-weight: bold;
        font-size: 70px;
    }

    @media (max-width: 600px) { 
        span { 
            font-size: 55px;
        }
    }
`
const Container2 = styled.div`
    width: 100%; 
    height: 190px;
    display: flex; 
    justify-content: center;
`
const Review = styled.div`
    width: 70%; 
    height: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 1100px) { 
        width: 90%;
    }

    @media (max-width: 600px) { 
        margin-left: 30px;
    }
`
const Box = styled.button`
    width: 26%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid black;
    border-radius: 30px;
    box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.25);
    transition: background color 2s;
    
    &:hover, 
    &:focus{ 
        cursor: pointer; 
        background: black;
        color: white;
    }
    
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }

    @media (max-width: 750px) { 
        width: 50%;
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