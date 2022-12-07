/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Background, Components } from "../common-components/Boxes";
import RenderTypes from "../subpages/RenderTypes";
import RenderMetod from "../subpages/RenderMetod";
import RenderFilterTypes from "../subpages/RenderFilterTypes";
import { filterFunctions } from "../hooks/filters";

export default function FiltersBox({ setFilterModal }) { 
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ select, setSelect ] = useState(null);
    const [ model, setModel ] = useState(null);
    const [ selectType, setSelectType ] = useState(null)
    const [ types, setTypes ] = useState([]);
    const [ filter, setFilter ] = useState({ main: null, metod: null });

    const filterTypes = [
        {
           id: 1,
           type: 'food'
        },
        {
            id: 2,
            type: 'attendance'
        },
        {
            id: 3,
            type: 'environment', 
        },
        {
            id: 4,
            type: 'price', 
        },
        {
            id: 5,
            type: 'place Type'
        }
    ]

    useEffect(async () => {
        await filterFunctions.types(setTypes);
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
                            {filterTypes.map(type => (
                                <RenderFilterTypes 
                                    id={type.id}
                                    type={type.type}
                                    selectType={selectType}
                                    setSelectType={setSelectType}
                                    filter={filter}
                                    setFilter={setFilter}
                                />
                            ))}
                        </ul>
                    </TypeMetod>
                    <Upright>.</Upright>
                    {filter.main === "food-type" ? (
                    <TypeMetod>
                        <p>Metod</p>
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
                    ) : (
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
                    )}
                </FilterBox>

                <Components.ErrorMessage 
                    error={error}
                    errorMessage={errorMessage}
                    setError={setError}
                />

                <Buttons error={error}>
                    <button id="save" onClick={() => filterFunctions.filtering(filter, setErrorMessage, setError, setFilterModal)}>Apply</button>
                    <button id="cancel" onClick={() => setFilterModal(false)}>Cancel</button>
                </Buttons>
            </Box>
        </Background>
    )
}

const Box = styled.div`
    width: 700px; 
    height: ${props => props.error ? ("550px") : ("400px")};
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
const Buttons = styled.div`
    width: 100%;
    display: flex;
    margin-top: ${props => props.error ? ("10px") : ("30px")};
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
        width: 70px;
        background-color: #EC7172;
        border: 1px solid #EC7172; 
        color: white; 
        font-weight: bold;
    }

    button#save { 
        width: 70px;
        background-color: #1A587F;
        border: 1px solid #1A587F; 
        color: white; 
        font-weight: bold;
    }

    @media (max-width: 700px) { 
        padding-right: 25px;
    }
`
