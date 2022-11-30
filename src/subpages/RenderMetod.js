import styled from "styled-components";

export default function RenderMetod({ type, model, setModel, filter, setFilter }) { 
    function moreThaOne() { 
        if(model === type) {
            setModel(null);
            setFilter({...filter, type: null})
        }
        else {
            setModel(type);
            if(type==="Best to Worst 🔝") setFilter({...filter, type: "best"})
            else setFilter({...filter, type: "last"})
        }
    }

    return(
        <Item onClick={moreThaOne} model={model} type={type}>
            <span>{type}</span>
            <ion-icon name="checkmark-sharp"></ion-icon>
        </Item>
    )
}

const Item = styled.li`
    width: 90%;
    height: 30px;
    display: flex; 
    align-items: center;
    justify-content: space-between;
    padding: 20px 5px;
    border: ${props => props.model === props.type ? ("2px solid green") : ("none")};
    border-radius: 12px;
    margin: 15px 0px 10px 0px;
    transition: ${props => props.model === props.type ? ("none") : ("background 1s")};

    span { 
        font-weight: bold;
        font-size 20px;
        color: black;
    }

    ion-icon { 
        display: ${props => props.model === props.type ? ("inline") : ("none")}; 
        color: green;
    }

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        background: ${props => props.model === props.type ? ("white") : ("#CDCDCD")};
    }
  
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`