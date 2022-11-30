import styled from "styled-components";

export default function RenderTypes({ id, type, selectType, setSelectType, filter, setFilter }) { 
    function moreThaOne() { 
        if(selectType === id) {
            setSelectType(null);
            setFilter({...filter, main: null})
        }
        else {
            setSelectType(id);
            if(id === 5) setFilter({...filter, main: "food-type"})
            else setFilter({...filter, main: type})
        }
    }

    return(
        <Item onClick={moreThaOne} selectType={selectType} id={id}>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
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
    border: ${props => props.selectType === props.id ? ("2px solid green") : ("none")};
    border-radius: 12px;
    margin-bottom: 4px;
    transition: ${props => props.selectType === props.id ? ("none") : ("background 1s")};

    span { 
        font-weight: bold;
        font-size 18px;
        color: black;
    }

    ion-icon { 
        display: ${props => props.selectType === props.id ? ("inline") : ("none")}; 
        color: green;
    }

    &:hover, 
    &:focus{ 
        cursor: pointer; 
        background: ${props => props.selectType === props.id ? ("white") : ("#CDCDCD")};
    }
  
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`