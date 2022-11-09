import { useState } from "react";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import * as axiosRequest from "../services/AxiosRequests"
import RenderSearchPlaces from "../subpages/RenderSearchPlaces";
import notFound from "../styles/images/NotFound.png"

export default function SearchBox({setOpenModal}) { 
    const [search,setSearch] = useState("");
    const [places,setPlaces] = useState([]);

    async function searchPlace(event) {
        setSearch(event);
        const name = event;
        console.log(name);
        
        try {
            if(name.length>2) {
                const promise = await axiosRequest.search(name);
                setPlaces(promise);
                if(promise.length === 0) setPlaces(null);
            }
        } catch (error) {
            console.log(error);
            setPlaces([]);
        }
    }   

    return( 
        <Background>
            <Box>
                <Cancel>
                    <button onClick={() => setOpenModal(false)}>Cancel</button>
                    <span onClick={() => setOpenModal(false)}>X</span>
                </Cancel>
                <Search places={places}>
                    <ion-icon name="search-sharp"></ion-icon>
                    <DebounceInput
                        type="text"
                        placeholder="Place name..."
                        minLength={2}
                        debounceTimeout={400}
                        value={search}
                        onChange={(event) => searchPlace(event.target.value)}
                        required
                    />
                </Search>
            </Box>
            <Places>
                {places ? (
                <ul>
                {places.map(place => (
                        <RenderSearchPlaces 
                            id = {place.id}
                            name = {place.name}
                            score = {place.score}    
                            mainPhoto = {place.mainPhoto} 
                            verify = {place.verify}               
                        />
                    ))}
                </ul>
                ) : (
                    <NotFound>
                        <img src={notFound} alt="Not Found"/>
                    </NotFound>
                )}
            </Places>
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
    height: 100px;
    background-color: white;
    border-radius: 10px 10px 0px 0px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    align-items: center;
    flex-direction: column;
`
const Search = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    ion-icon { 
        width: 25px;
        height: 25px;
    }

    input { 
        width: 90%;
        height: 40px;
        font-size: 24px;
        font-weight: 700;
        padding-left: 10px;
        display: flex;
        justify-content: center;
        border: none;
    }
`
const Cancel = styled.div`
    width: 100%; 
    height: 40%;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 0px 20px;
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
const Places = styled.div`
    width: 60%; 
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    flex-direction: column;
    padding-top: 20px;
`
const NotFound = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`