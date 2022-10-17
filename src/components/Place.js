/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import logo from "../styles/images/Ranting.png";
import SearchBox from "../pages/SearchBox";
import * as axiosRequest from "../repositories/AxiosRequests";
import RenderReviews from "../pages/RenderReviews";
import UserBox from "../pages/UserBox";
import RatingBox from "../pages/RatingBox";

export default function PlaceScreen() { 
    const { userData, setUserData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [openModal, setOpenModal] = useState(false);
    const [place, setPlace] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [userModal, setUserModal] = useState(false);
    const [ratingModel,setRatingModel] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(userData);

    useEffect(async() => { 
        const promise = await axiosRequest.getPlace(id);
        if(promise[0] !== undefined) {
            setPlace(promise[0]);
            setReviews(promise[0].ratings);
        } else { 
            setPlace(promise);
            console.log(promise)
        }
    },[]);

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
            <Title>
                <span onClick={() => setOpenModal(true)}><ion-icon name="search-sharp"></ion-icon> Search</span>
                <img src={logo} alt="logo"/>
                {token ? (
                <UserProfile onClick={() => setUserModal(true)}>
                    <span>Hello, {user.name}</span>
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

            <Line1>
                <div>.</div>
            </Line1>


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
                        <span>Website:</span>
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
                        <h4 id="score">{Number(place.score).toFixed(1).replace(".",",")} ⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Specialty Food:</span>
                        <h4>{place.type}</h4>
                    </TextBox>  
                    <TextBox>
                        <span>Food:</span>
                        <h4>{Number(place.food).toFixed(1).replace(".",",")} ⭐</h4>
                    </TextBox>  
                    <TextBox>
                        <span>Price:</span>
                        <h4>{Number(place.price).toFixed(1).replace(".",",")} ⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Attendance:</span>
                        <h4>{Number(place.attendance).toFixed(1).replace(".",",")} ⭐</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Environment:</span>
                        <h4>{Number(place.environment).toFixed(1).replace(".",",")} ⭐</h4>
                    </TextBox> 
                </Rating>
                </>
                 ) : ""}
            </Main>

            {token ? (    
            <Container2>
                <Review>
                    <Box onClick={() => setRatingModel(true)}>Make an Review<ion-icon name="star"></ion-icon></Box>
                </Review>
            </Container2>
            ) : ""}

            {place.score !== "0"  ? (
            <Reviews token={token}>
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
                <h4>©</h4>
            </LineCopright>
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
const Photo = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(150, 150, 150, 1);

    img { 
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;;
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
const Line1 = styled.div`
    width: 100%; 
    height: 28px;
    display: flex; 
    justify-content: center;
    margin-top: 78px;

    div {
        width: 98%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top: 15px;
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

    span#score {
        font-weight: 700;
        font-size: 30px;
    }

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
    margin-top: ${props => props.token ? ("0px") : ("70px")};
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
`
const Container2 = styled.div`
    width: 100%; 
    height: 190px;
    display: flex; 
    justify-content: center;
`
const Review = styled.div`
    width: 90%; 
    height: 100%;
    display: flex;
    align-items: center;
`
const Box = styled.button`
    width: 30%;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    color: balck;
    background-color: #F5C127;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed black;
    box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.25);

    ion-icon { 
        margin-left: 5px;
        width: 24px;
        height: 24px;
        color: black;
    }
    
    &:hover{ 
        cursor: pointer; 
    }
    
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`
const LineCopright = styled.div`
    width: 100%; 
    height: 30px;
    display: flex; 
    justify-content: center;
    background-color: #359FE4;
    padding-bottom: 10px;

    div {
        width: 90%;
        height: 1px;
        border: 1px solid #D4D4D4;
        margin-top: 5px;
    }
`