/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as AxiosRequest from "../repositories/AxiosRequests";
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import AuthContext from "../contexts/authContext";
import UserBox from "../pages/UserBox";
import RenderInputsCreatePlace from "../pages/RenderInputsCreatePlace";
import SearchBox from "../pages/SearchBox";
import { DebounceInput } from "react-debounce-input";
import notFound from "../styles/images/NotFound.png";
import { authTest, authTime, configVar } from "../services/auth";

export default function CreatePlaceScreen() { 
  const { userData, setUserData } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const { auth, setAuth } = useContext(AuthContext);
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
      const promiseType = await AxiosRequest.foodTypes();
      const promiseState = await AxiosRequest.states();
      setTypes(promiseType);
      setStates(promiseState);
    } catch (error) {
      console.log(error);
    }
  },[]);

  function exit() { 
    setToken(null);
    localStorage.setItem("MY_TOKEN",null);
    setLogout(false);
    setAuth(false);
    navigate('/main');
  }

  setInterval( async () => {
      authTest(config);
  }, authTime)

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
      await AxiosRequest.createPlace(config,placeData);
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
      const promise = await AxiosRequest.cities(state.id,name);
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
    
    <Title>
      <span onClick={() => setOpenModal(true)}><ion-icon name="search-sharp"></ion-icon> Search</span>
      <img src={logo} alt="logo"/>
      {auth ? (
        <UserProfile>
          <span>Hello, {user.name}</span>
          {user.mainPhoto ? (
            <img src={user.mainPhoto} alt="profile" onClick={() => setUserModal(true)}/>
            ): ( <ion-icon name="person-circle-sharp" id="photo"></ion-icon> )}
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
          <div id="logout">.</div>
        </Line>
        <span onClick={() => setUserModal(true)}>Change your photo</span>
        <Line>
          <div id="logout">.</div>
        </Line>
        <span id="logout" onClick={exit}>Logout</span>
      </Logout>
    ) : ""}

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

        <input 
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
