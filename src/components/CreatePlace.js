/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as AxiosRequest from "../repositories/AxiosRequests";
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import UserBox from "../pages/UserBox";
import RenderTypes from "../pages/RenderTypes";

export default function CreatePlaceScreen() { 
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [mainPhoto, setMainPhoto] = useState("");
    const [type, setType] = useState("");
    const [clickedType,setClickedType] = useState(false);
    const [city, setCity] = useState(""); 
    const [cities, setCities] = useState([]);
    const [state,setState] = useState("");
    const [clickedState,setClickedState] = useState(false);
    const [states, setStates] = useState([]);
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [clicked,setClicked] = useState(false);
    const [error,setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [userModal, setUserModal] = useState("");
    const [types,setTypes] = useState([]);
    const user = JSON.parse(userData);
    const navigate = useNavigate();

    useEffect(async () => {
      try {
        const promise = await AxiosRequest.foodTypes();
        console.log(promise);
        setTypes(promise);
      } catch (error) {
        console.log(error);
      }
    },[]);

    useEffect(async () => {
      try {
        const promise = await AxiosRequest.foodTypes();
        console.log(promise);
        setTypes(promise);
      } catch (error) {
        console.log(error);
      }
    },[]);

    async function register(event) { 
        event.preventDefault();

    const placeData = { 
      name,
      description,
      mainPhoto, 
      type,
      city,
      address
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      setClicked(true);
      await AxiosRequest.createPlace(config,placeData);
      navigate("/");
      setClicked(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
      setClicked(false);
      setError(true);
    }
  }

  return(
    <>
    {userModal ? (
      <UserBox 
          setUserModal = {setUserModal}
          user = {user}
          setUserData = {setUserData}
      />
    ): ""}

    <Container>

      <Title>
        <img src={logo} alt="logo"/>
      </Title>

     <ContainerApresentation>
        <Apresentation>
            <span>⭐⭐ <strong id="message">You can create an Place here:</strong></span>
            <UserProfile onClick={() => setUserModal(true)}>
                    <span>Olá, <strong>{user.name}</strong></span>
                    {user.mainPhoto ? (
                        <img src={user.mainPhoto} alt="profile"/>
                    ): ( <ion-icon name="person-circle-sharp" onClick={() => setUserModal(true)}></ion-icon> )}
            </UserProfile>
        </Apresentation>
    </ContainerApresentation>

      <form onSubmit={register}>
      <Main error={error}>
        <input
            type="text"
            placeholder="Name (required)"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
        />
        <input
            type="url"
            placeholder="Url Place Photo (required)"
            value={mainPhoto}
            onChange={(event) => setMainPhoto(event.target.value)}
            required
        />
         <input
            type="text"
            placeholder="Address (required)"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
        />
        <Selector type={clickedType}>
          <span>Type (requeried)</span>
          {clickedType ? ( 
            <ion-icon name="chevron-up-outline" onClick={() => setClickedType(false)}></ion-icon>
          ) : ( 
            <ion-icon name="chevron-down-outline" onClick={() => setClickedType(true)}></ion-icon>
          )}
        </Selector>
        {clickedType ? (
        <>
        <Line>
          <div>.</div>
        </Line>
        <Types>
          <ul>
            {types.map(typ => (
              <RenderTypes 
                id = {typ.id}
                name = {typ.name}
                setType = {setType}
              />
            ))}
          </ul>
        </Types>
        </>
        ): ""}
        <Selector type={clickedState}>
          <span>State (requeried)</span>
          {clickedState ? ( 
            <ion-icon name="chevron-up-outline" onClick={() => setClickedState(false)}></ion-icon>
          ) : ( 
            <ion-icon name="chevron-down-outline" onClick={() => setClickedState(true)}></ion-icon>
          )}
        </Selector>
        {clickedState ? (
        <>
        <Line>
          <div>.</div>
        </Line>
        <Types>
          <ul>
            {types.map(typ => (
              <RenderTypes 
                id = {typ.id}
                name = {typ.name}
                setType = {setType}
              />
            ))}
          </ul>
        </Types>
        </>
        ) : ""}
        <input
            type="url"
            placeholder="Website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            required
        />
        <input 
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
        />
        <button>
          {clicked ? (
            <ThreeDots color="white" height={80} width={100} />
          ) : ("Create")}
        </button>
      </Main>
      </form>
      
      {error ? (
      <Error>
          <button>
            <span>{errorMessage}</span>
            <span id="x" onClick={() => setError(false)}>X</span>
          </button>
      </Error>
      ) : ""}
    </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
`
const Title = styled.div`
  width: 100%; 
  height: 100%;
  display: flex; 
  justify-content: center;
  margin-top: 40px;

  img { 
    width: 70x;
    height: 90px;
  }
`
const ContainerApresentation =styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 20px;
`
const Apresentation = styled.div`
    width: 85%; 
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span { 
        font-size: 22px;
        color: white;

        strong#user { 
            text-decoration: underline;
        }
    }

    strong#message { 
        font-weight: 700;
        color: black;
        font-size: 35px;
        text-decoration: underline;
        font-family: 'Playball', cursive;
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
        margin-left: 10px;
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
const Selector = styled.div`
  width: 80%; 
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*border: 2px solid rgba(120, 177, 89, 0.25);*/
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${props => props.type ? ("10px 10px 0px 0px"):("10px")};
  padding: 0px 20px 0px 20px;
  font-size: 20px;
  color: grey;
  margin-bottom: ${props => props.type ? ("0px") : ("25px")};
  background-color: white;

  ion-icon { 
    background-color: red;
  }
`
const Types = styled.div`
  width: 80%;
  background-color: white;
  margin-bottom: 25px;
  border-radius: 0px 0px 10px 10px;
  padding-bottom: 5px;
`
const Main = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center;
  flex-direction: column;
  margin-bottom: ${props => props.error ? ("25px") : ("35px")};

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
    width: 80%; 
    height: 70px; 
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: #000000;
    color: rgba(255,255,255,1);
    font-size: 30px;
    font-weight: bold;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
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
const Error = styled.div` 
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 

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
const Line = styled.div`
    width: 80%; 
    height: 2px;
    display: flex; 
    justify-content: center;
    background-color: white;

    div {
        width: 95%;
        height: 1px;
        border: 1px solid #D4D4D4;
    }
`