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
import RenderInputsCreatePlace from "../pages/RenderInputsCreatePlace";
import SearchBox from "../pages/SearchBox";
import { DebounceInput } from "react-debounce-input";
import notFound from "../styles/images/NotFound.png"

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
    const [logout,setLogout] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const user = JSON.parse(userData);
    const navigate = useNavigate();
    console.log(state);

    useEffect(async () => {
      try {
        const promiseType = await AxiosRequest.foodTypes();
        const promiseState = await AxiosRequest.states();
        console.log(promiseState);
        setTypes(promiseType);
        setStates(promiseState);
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

  async function searchCity(event) {
    setCity(event);
    const name = event;
    console.log(name);
    
    try {
        if(name.length>2) {
            const promise = await AxiosRequest.cities(state.id,city);
            setCities(promise);
            if(promise.length === 0) setCities(null);
        }
    } catch (error) {
        console.log(error);
        setCities([]);
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
          <span>{type ? (type.name):("Type (requeried)")}</span>
          {clickedType ? ( 
            <ion-icon name="chevron-up-outline" onClick={() => setClickedType(false)}></ion-icon>
          ) : ( 
            <ion-icon name="chevron-down-outline" onClick={() => setClickedType(true)}></ion-icon>
          )}
        </Selector>
        {clickedType ? (
        <>
        <Types>
          <ul>
            {types.map(typ => (
              <RenderInputsCreatePlace
                id = {typ.id}
                name = {typ.name}
                changeState = {setType}
                flag = "🍽️"
                modalInput = {setClickedType}
              />
            ))}
          </ul>
        </Types>
        </>
        ): ""}

        <Selector type={clickedState}>
          <span>{state ? (state.name) : ("State (requeried)")}</span>
          {clickedState ? ( 
            <ion-icon name="chevron-up-outline" onClick={() => setClickedState(false)}></ion-icon>
          ) : ( 
            <ion-icon name="chevron-down-outline" onClick={() => setClickedState(true)}></ion-icon>
          )}
        </Selector>
        {clickedState ? (
        <>
        <Types>
          <ul>
            {states.map(sta => (
              <RenderInputsCreatePlace 
                id = {sta.id}
                name = {sta.name}
                changeState = {setState}
                modalInput = {setClickedState}
              />
            ))}
          </ul>
        </Types>
        </>
        ) : ""}

        {state ? (
          <>
          <DebounceInput
            id="search"
            type="text"
            placeholder="City"
            minLength={0}
            debounceTimeout={400}
            value={city}
            onChange={(event) => searchCity(event.target.value)}
            required
          />
          <Places>
            {cities ? (
              <ul>
              {cities.map(place => (
                <RenderInputsCreatePlace 
                  id = {place.id}
                  name = {place.name}               
                />
              ))}
              </ul>
              ) : (
                <NotFound>
                  <img src={notFound} alt="Not Found"/>
                </NotFound>
              )}
          </Places>
          </>
        ) : ("")}

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
  margin-top: 130px; 
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

  input#search { 
    margin-bottom: 0px;
    border-radius: ${props => props.cities ? ("0px 20px"):("10px")}
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
const Places = styled.div`
    width: 80%; 
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    flex-direction: column;
    margin-bottom: 25px;
`
const NotFound = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`