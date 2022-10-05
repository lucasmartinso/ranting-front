import styled from "styled-components"

export default function SearchBox({setOpenModal}) { 
    return( 
        <Background>
            <Box>
                <span onClick={() => setOpenModal(false)}>X</span>
            </Box>
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
    position: fixed;
    left: 0; 
    top: 0;
    z-index: 2;
`
const Box = styled.div`
    width: 60%; 
    height: 700px;
    background-color: white;
    border-radius: 10px;
    color: rgba(111, 111, 111, 1);
    position: relative;

    span { 
        font-weight: 700;
        font-size: 20px;
        position: absolute;
        right: 15px;
        top: 15px;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }
`