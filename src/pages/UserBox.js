import { useState } from "react";
import styled from "styled-components";
//import * as axiosRequest from "../repositories/AxiosRequests"

export default function UserBox({setUserModal}) { 
    const [photo,setPhoto] = useState(null);

    return(
        <Background>
            <Box>
                <Cancel>
                    <span onClick={() => setUserModal(false)}>X</span>
                </Cancel>
                <Welcome>
                    <span>Hello, <strong>Ronaldo</strong></span>
                </Welcome>
                <form>
                    <ChangePicture>
                        <span>If you change your profile photo send it into the box</span>
                        <input
                            type="url"
                            placeholder="Url Photo"
                            value={photo}
                            onChange={(event) => setPhoto(event.target.value)}
                            required
                        />
                    </ChangePicture>
                    <Buttons>
                        <button>Save</button>
                        <button>Cancel</button>
                    </Buttons>
                </form>
            </Box>
        </Background>
    )
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(111, 111, 111, 0.9);
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    left: 0; 
    top: 0;
    z-index: 2;
`
const Box = styled.div`
    width: 60%; 
    height: 300px;
    background-color: white;
    border-radius: 12px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    align-items: center;
    flex-direction: column;
`
const Cancel = styled.div`
    width: 100%; 
    height: 10%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 18px 0px 0px;
    margin-bottom: 20px;

    button { 
        width: 15%;
        height: 90%;
        background-color: red;
        color: white;
        font-weight: 700;
        font-size: 20px;
        border: 1px solid black;
        border-radius: 12px;
        font-family: 'Playball', cursive;
        display: flex; 
        justify-content: center;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    span { 
        font-weight: 700;
        font-size: 20px;
        color: black;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }
`
const Welcome = styled.div`
    width: 90%;
    height: 25%;
    display: flex; 
    justify-content: flex-start; 

    span { 
        font-size: 22px;
        color: black;
    }
`
const ChangePicture = styled.div`
    width: 90%;
    height: 90%;
    padding-left: 20px;

    span { 
        font-size: 18px;
    }

    input { 
        margin-top: 15px;
        width: 100%;
        height: 40px;
        font-size: 20px;
        padding-left: 10px;
        border-radius: 12px;
        background-color: 
    }
`
const Buttons = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;

    button {
        width: 60px;
        height: 40px;
        border-radius: 8px;
        margin-left: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
