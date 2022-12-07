import styled from "styled-components";
import { filterFunctions } from "../hooks/filters";

export default function RenderTypes({id,name,changeState,flag,modalInput,chosed}) { 
    return( 
      <>
        <Line>
          <div>.</div>
        </Line>
        <Type id={id} onClick={filterFunctions.changes(changeState,id,name,modalInput,chosed)}>
            <span>{name}</span>
            <span id="icon">{flag}</span>
        </Type>
      </>
    )
}

const Type = styled.li`
  width: 100%;
  hieght: 30px;
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;
  transition: background 0.6s;

  span { 
    font-size: 20px;
    font-weight: bold;
  }

  span#icon { 
    font-size: 30px;
  }

  &:hover, 
  &:focus{ 
    cursor: pointer; 
    background: #CDCDCD;
  }

  &:active {  
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const Line = styled.div`
    width: 100%; 
    height: 2px;
    display: flex; 
    justify-content: center;
    background-color: white;

    div {
        width: 95%;
        height: 1px;
        border: 1px solid #D4D4D4;
        color: white
    }
`