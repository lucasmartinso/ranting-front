/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Background } from "../common-components/Boxes";
import RenderTypes from "../subpages/RenderTypes";
import RenderMetod from "../subpages/RenderMetod";
import * as  filtersAPi from "../services/filtersApi";

export default function FiltersBox({ setFilterModal }) { 
    const [ error, setError ] = useState(false);
    const [ select, setSelect ] = useState(null);
    const [ model, setModel ] = useState(null);
    const [ types, setTypes ] = useState([]);
    const [ filter, setFilter ] = useState({});
    const filterTypes = [
        {
           id: 1,
           type: 'Food' 
        },
        {
            id: 2,
            type: 'Attendance' 
        },
        {
            id: 3,
            type: 'Environment' 
        },
        {
            id: 4,
            type: 'Price' 
        },
        {
            id: 5,
            type: 'Place Type' 
        }
    ]
    console.log(filter);

    useEffect(async () => {
        try {
            const promise = await filtersAPi.foodTypes();
            setTypes(promise);
        } catch (error) {
            console.log(error);
        }
    },[]);


    return(
        <Background>
            <Box error={error}>
                <Cancel>
                    <span onClick={() => setFilterModal(false)}>X</span>
                </Cancel>
                <ChooseMessage>
                    <p>Choose <strong>one type</strong> and <strong>one metod</strong></p>
                </ChooseMessage>
                <FilterBox>
                    <TypeMetod>
                        <p>Type</p>
                        <ul>
                            {types.map(type => (
                                <RenderTypes 
                                    id={type.id}
                                    name={type.name}
                                    select={select}
                                    setSelect={setSelect}
                                    filter={filter}
                                    setFilter={setFilter}
                                />
                            ))}
                        </ul>
                    </TypeMetod>
                    <Upright>.</Upright>
                    <TypeMetod>
                        <p>Metod</p>
                        <ul>
                            <RenderMetod 
                                type="Best to Worst 🔝"
                                model={model}
                                setModel={setModel}
                                filter={filter}
                                setFilter={setFilter}
                            />
                            <RenderMetod 
                                type="Worst to Best 👎"
                                model={model}
                                setModel={setModel}
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </ul>
                    </TypeMetod>
                </FilterBox>
            </Box>
        </Background>
    )
}

const Box = styled.div`
    width: 700px; 
    height: ${props => props.error ? ("780px") : ("400px")};
    background-color: white;
    border-radius: 12px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    align-items: center;
    flex-direction: column;

    @media (max-width: 800px) { 
        width: 80%;
    }
`
const Cancel = styled.div`
    width: 100%; 
    height: 6%;
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
const ChooseMessage = styled.div`
    width: 90%;

    p { 
        font-size: 20px;
    }
`
const FilterBox = styled.div`
    width: 90%;
    display: flex; 
    justify-content: center;
    margin-top: 40px;
`
const TypeMetod = styled.div`
    width: 50%;
    height: 200px;

    p { 
        font-weight: bold;
        font-size: 25px;
    }

    ul { 
        width: 100%;
        height: 150px;
        margin: 20px 0px;
        display: flex; 
        flex-direction: column; 
        align-items: center;
        overflow-y: scroll;
    }
`
const Upright = styled.div`
    width: 1px;
    height: 100%;
    border: 1px solid #D4D4D4; 
    margin: 0px 15px;

    @media (max-width: 800px) {
      display: none;
    }
`
