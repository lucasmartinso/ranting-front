import styled from "styled-components"

export default function RenderTypes({id,name,setType}) { 
    
    return( 
        <Type id={id} onClick={() => setType(name)}>
            <span>{name}</span>
            <span id="icon">🍽️</span>
        </Type>
    )
}

const Type = styled.li`
  width: 100%;
  hieght: 30px;
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;

  span { 
    font-size: 20px;
    font-weight: bold;
  }

  span#icon { 
    font-size: 30px;
  }

  &:hover { 
    cursor: pointer;
  }

  &:active {  
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`