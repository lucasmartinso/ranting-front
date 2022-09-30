import styled from "styled-components"
import logo from "../styles/images/Ranting.png"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import {faCoffee } from '@fortawesome/fontawesome-free-solid'
//import {  } from "@fortawesome/fontawesome-free-regular"
//import {  } from "@fortawesome/fontawesome-svg-core"

export default function MainScreen() { 

    return(
        <Container>
            <Title>
                <span><ion-icon name="search-sharp"></ion-icon> Search</span>
                <img src={logo} alt="logo"/>
                <UserProfile><span>Olá, son</span></UserProfile>
            </Title>
        </Container>
    )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
    width: 90%; 
    height: 10%;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    position: fixed;
    top: 0;
    z-index: 1;

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
    }
`
const UserProfile = styled.div`
    display: flex;

    
`