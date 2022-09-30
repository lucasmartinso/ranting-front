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
`
const Title = styled.div`
    width: 100%; 
    height: 100%;

    img { 
        width: 100px;
        height: 70px;
    }
`