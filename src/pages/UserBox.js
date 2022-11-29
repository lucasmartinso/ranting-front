import { useContext, useState } from "react";
import styled from "styled-components";
import * as usersRequests from "../services/usersApi";
import TokenContext from "../contexts/tokenContext";
import { Background, Components } from "../common-components/Boxes";

export default function UserBox({setUserModal,user,setUserData}) { 
    const { token } = useContext(TokenContext);
    const [ photo, setPhoto ] = useState(null);
    const [ error, setError ] = useState(false);
    const [errorMessage, setErrorMessage ] = useState("");


    async function changePhoto() { 
        
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const mainPhoto = { mainPhoto: photo };

        try {
            await usersRequests.changePhoto(config,mainPhoto);

            setUserData(JSON.stringify({
                "id": user.id,
                "name": user.name,
                "username": user.username,
                "mainPhoto": photo
            }))

            setUserModal(false);
            setPhoto("");
            localStorage.setItem("USER_DATA",JSON.stringify({
                "id": user.id,
                "name": user.name,
                "username": user.username,
                "mainPhoto": photo
            }));
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data);
            setError(true);
        }
    }

    return(
        <Background>
            <Box error={error}>
            
                <Components.Close 
                    setUserModal= {setUserModal}
                    type= 'userModal'
                />

                <Welcome>
                    <span>Hello, <strong>{user.name}</strong></span>
                </Welcome>

                <ChangePicture>
                    <span>If you want to change your profile photo send it into the box:</span>
                    <input
                        type="url"
                            placeholder="Url Photo"
                            value={photo}
                            onChange={(event) => setPhoto(event.target.value)}
                            required
                    />
                </ChangePicture>

                <Components.ErrorMessage 
                    error={error}
                    errorMessage={errorMessage}
                    setError={setError}
                />

                <Buttons error={error}>
                    <button id="save" onClick={changePhoto}>Save</button>
                    <button id="cancel" onClick={() => setUserModal(false)}>Cancel</button>
                </Buttons>
            </Box>
        </Background>
    )
}

const Box = styled.div`
    width: 700px;
    height: ${props => props.error ? ("430px") : ("320px")};
    background-color: white;
    border-radius: 12px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    align-items: center;
    flex-direction: column;

    @media (max-width: 1200px) { 
        width: 60%;
    }

    @media (max-width: 700px) { 
        width: 80%;
    }
`
const Welcome = styled.div`
    width: 90%;
    height: 20%;
    display: flex; 
    justify-content: flex-start; 
    margin-bottom: 30px;

    span { 
        font-size: 22px;
        color: black;
    }
`
const ChangePicture = styled.div`
    width: 90%;
    height: 35%;

    span { 
        font-size: 22px;
    }

    input { 
        margin-top: 20px;
        width: 100%;
        height: 40px;
        font-size: 20px;
        padding-left: 10px;
        border-radius: 12px; 
    }
`
const Buttons = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: ${props => props.error ? ('30px') : ('20px')};
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;

    button {
        width: 60px;
        height: 40px;
        border-radius: 8px;
        margin-left: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    button#cancel { 
        background-color: #EC7172;
        border: 1px solid #EC7172; 
        color: white; 
        font-weight: bold;
    }

    button#save { 
        background-color: #1A587F;
        border: 1px solid #1A587F; 
        color: white; 
        font-weight: bold;
    }

    @media (max-width: 1000px) { 
        padding-right: 25px;
    }
`
