import styled from "styled-components";

export default function PlaceScreen() { 
    return(
        <Container>
            <Apresentation>
                <img src="https://i0.wp.com/sarapateando.com.br/wp-content/uploads/2021/05/47b15ddd-6b2b-4926-a3b7-57bb9e08abda.jpg?fit=1280%2C960&ssl=1" alt="title"/>
                <h3>Paris 6</h3>
            </Apresentation>
        </Container>
    )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  position: fixed;
  top: 0;
  background-color: black;
`
const Apresentation = styled.div`
    width: 100%; 
    height: 100%;

    img { 
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 0px 0px 5px 5px;
        -webkit-mask-image: linear-gradient(to top, transparent 0%, black 80%);
    }

    h3 { 
        color: white;
    }
`