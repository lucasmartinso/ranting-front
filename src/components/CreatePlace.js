/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as locationsApi from "../services/locationsApi";
import * as usersRequests from "../services/usersApi";
import * as  filtersAPi from "../services/filtersApi";
import * as  placesApi from "../services/placesApi";
import Title from "../common-components/Title";
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import AuthContext from "../contexts/authContext";
import UserBox from "../pages/UserBox";
import RenderInputsCreatePlace from "../pages/RenderInputsCreatePlace";
import SearchBox from "../pages/SearchBox";
import { DebounceInput } from "react-debounce-input";
import notFound from "../styles/images/NotFound.png";
import { configVar } from "../hooks/auth";

export default function CreatePlaceScreen() { 
  const { userData, setUserData } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const { setAuth } = useContext(AuthContext);
  const [name,setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainPhoto, setMainPhoto] = useState("");
  const [type, setType] = useState("");
  const [clickedType,setClickedType] = useState(false);
  const [city, setCity] = useState({id: null, name: ""}); 
  const [cities, setCities] = useState([]);
  const [state,setState] = useState("");
  const [clickedState,setClickedState] = useState(false);
  const [states, setStates] = useState([]);
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [clicked,setClicked] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userModal, setUserModal] = useState("");
  const [types,setTypes] = useState([]);
  const [logout,setLogout] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  const config = configVar();

  useEffect(async () => {
    try {
      await usersRequests.auth(config);
      setAuth(true);
      const promiseType = await filtersAPi.foodTypes();
      const promiseState = await locationsApi.states();
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
      type: type.name,
      city : city.name,
      address
    }

    console.log(placeData);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      setClicked(true);
      await placesApi.createPlace(config,placeData);
      navigate("/main");
      setClicked(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
      setClicked(false);
      setError(true);
    }
  }

  async function searchCity(event) {
    setCity({id: null,name: event});
    const name = event;
    
    try {
      const promise = await locationsApi.cities(state.id,name);
      setCities(promise);
      if(promise.length === 0) setCities(null);
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
    
    <Title 
      setOpenModal= {setOpenModal}
      setUserModal= {setUserModal}
      setLogout= {setLogout}
      logout= {logout}
      screen= "create"
    />

    <CreatePlace>
      <span>Create a Place 🍽️</span>
    </CreatePlace>

    <ContainerCategory>
      <Categorys>
        <span><strong>Place Info:</strong> 📌</span>
      </Categorys>
    </ContainerCategory>

    <form onSubmit={register}>
      <Main error={error}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
        />
        <input
            type="url"
            placeholder="Url Place Photo"
            value={mainPhoto}
            onChange={(event) => setMainPhoto(event.target.value)}
            required
        />

        <Selector type={clickedType}>
          <span>{type ? (type.name):("Type")}</span>
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

        <ContainerCategory>
          <Categorys>
            <span><strong>Localization:</strong> 🌍​</span>
          </Categorys>
        </ContainerCategory>

        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
        />

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
            minLength={1}
            debounceTimeout={400}
            value={city.name}
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
                  changeState = {setCity}
                  modalInput = {setClickedState} 
                  chosed = {setCities}             
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

        <ContainerCategory>
          <Categorys>
            <span><strong>Aditional Info:</strong> 💬​</span>
          </Categorys>
        </ContainerCategory>

        <textarea 
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
        />
        <input
            type="url"
            placeholder="Website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
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
`
const CreatePlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 140px;

  span { 
    color: white;
    font-family: 'Playball', cursive;
    font-size: 80px;
  }

  @media (max-width: 600px) { 
    span { 
      font-size: 63px;
    }
  }
`
const ContainerCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  span {
    margin-top: 20px;
    color: white;
    font-weight: 700;
    font-size: 40px;
    font-family: 'Fuzzy Bubbles', cursive;
  }

  strong {
    text-decoration: underline;
  }
`
const Categorys = styled.div`
  width: 80%;
  margin-top: 40px;
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
    &:hover{ 
      cursor: pointer; 
    }
  
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
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

  input,textarea { 
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

  textarea { 
    height: 100px;
    padding: 15px 20px 10px 25px;
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
  margin-bottom: 50px;

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
