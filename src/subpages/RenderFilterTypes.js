import styled from "styled-components";

export default function RenderTypes({ id, name, select, setSelect, filter, setFilter }) { 
    function moreThaOne() { 
        if(select === id) {
            setSelect(null);
            setFilter({...filter, id: null})
        }
        else {
            setSelect(id);
            setFilter({...filter, id})
        }
    }

    return(
        <Item onClick={moreThaOne} select={select} id={id}>
            <span>{name}</span>
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
    padding: 5px 5px;
    border: ${props => props.select === props.id ? ("2px solid green") : ("none")};
    border-radius: 12px;
    margin-bottom: 4px;
    transition: ${props => props.select === props.id ? ("none") : ("background 1s")};

    span { 
        font-weight: bold;
        font-size 18px;
        color: black;
    }

    ion-icon { 
        display: ${props => props.select === props.id ? ("inline") : ("none")}; 
        color: green;
    }

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        background: ${props => props.select === props.id ? ("white") : ("#CDCDCD")};
    }
  
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`