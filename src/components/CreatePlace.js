import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as AxiosRequest from "../repositories/AxiosRequests";
import logo from "../styles/images/Ranting.png"
import UserContext from "../contexts/userContext";
import TokenContext from "../contexts/tokenContext";
import UserBox from "../pages/UserBox";

export default function CreatePlaceScreen() { 
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [mainPhoto, setMainPhoto] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState(""); 
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [clicked,setClicked] = useState(false);
    const [error,setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [userModal, setUserModal] = useState("")
    const user = JSON.parse(userData);
    const navigate = useNavigate();

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
      console.log("Foi");
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
        <input 
            type="text"
            placeholder="City (required)"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
        />
        <input 
            type="text"
            placeholder="Type (required)"
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
        />
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
const Message = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 

  span {
    color: white; 
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
    text-decoration-color: #359FE4;
    margin-bottom: 70px;
    margin-top: 30px;

    &:hover{ 
      cursor: pointer; 
    }
  
    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
`