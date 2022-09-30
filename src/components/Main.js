import styled from "styled-components"
import logo from "../styles/images/Ranting.png"

export default function MainScreen() { 
    return(
        <Container>
            <Title>
                <span>oi</span>
                <img src={logo} alt="logo"/>
                <span>zuckenberg</span>
            </Title>
        </Container>
    )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
    width: 90%; 
    height: 100%;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;

    img { 
        width: 140px;
        height: 70px;
    }
`