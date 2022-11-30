import { useState } from "react";
import styled from "styled-components";

export default function RenderTypes() { 
    const [ select, setSelect ] = useState(false);

    return(
        <Item onClick={() => setSelect(!select)} select={select}>
            <span>Food</span>
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
    padding: 0px 5px;
    border: ${props => props.select ? ("2px solid green") : ("none")};
    
    span { 
        font-weight: bold;
        font-size 18px;
    }

    ion-icon { 
        display: ${props => props.select ? ("inline") : ("none")}; 
        color: green;
    }

    &:hover { 
        cursor: pointer;
    }
  
    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`