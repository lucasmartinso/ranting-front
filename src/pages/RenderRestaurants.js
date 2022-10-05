import styled from "styled-components";

export default function RenderRestaurants(restaurantData) { 
    return( 
        <Place>
            <Container2>
                <Overall>
                    <span>{restaurantData.name} <ion-icon name="checkmark-circle"></ion-icon></span>
                    <h3>4,7 ⭐</h3>
                </Overall>
                <Info>
                    <img src="https://i0.wp.com/sarapateando.com.br/wp-content/uploads/2021/05/47b15ddd-6b2b-4926-a3b7-57bb9e08abda.jpg?fit=1280%2C960&ssl=1" alt="place"/>
                </Info>
            </Container2>
            <Ranting>
                <TextBox>
                    <span>Carro chefe:</span>
                    <h4>Salmão</h4>
                </TextBox> 
                <TextBox>
                    <span>Número de avaliações:</span>
                    <h4>372</h4>
                </TextBox>
                <TextBox>
                    <span>Comida:</span>
                    <h4> 4,8 ⭐</h4>
                </TextBox>
                <TextBox>
                    <span>Atendimento:</span>
                    <h4> 4,8 ⭐</h4>
                </TextBox>
                <TextBox>
                    <span>Preço:</span>
                    <h4> 4,8 ⭐</h4>
                </TextBox>
                <TextBox>
                    <span>Ambiente:</span>
                    <h4> 4,8 ⭐</h4>
                </TextBox>
            </Ranting>                 
        </Place>
    )
}

const Place = styled.li`
    width: 90%;
    height: 350px;
    background-color: white;
    border-radius: 12px;
    padding: 25px 0px 0px 0px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 25px;

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
`
const Container2 = styled.div`
    width: 100%; 
    height: 70%; 
    display: flex;
`
const Overall = styled.div`
    width: 15%; 
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 23px;
    font-weight: bold;
    margin-top: 20px;
    margin-right: 10px;
    font-family: 'Playball', cursive;

    span { 
        margin-bottom: 20px;
        text-decoration: overline;
        display: flex;

        ion-icon { 
            color: #3797F0;
            margin-left: 8px;
            transition: 0.2s all;
        }
    }

    h3 { 
        font-weight: black;
    }
`
const Info = styled.div`
    width: 85%; 
    height: 100%;
    display: flex;

    img { 
        width: 98%;
        height: 90%;
        object-fit: cover;
        border-radius: 6px;
    }
` 
const Ranting = styled.div`
    width: 100%; 
    display: flex;
    justify-content: center;
    padding: 10px 0px 0px 0px;
    font-family: 'Playball', cursive;
    font-size: 24px;
`
const TextBox = styled.li`
    text-align: center;
    margin-right: 20px;

    span {
        font-weight: 500;
    }
`