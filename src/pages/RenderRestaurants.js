import styled from "styled-components";

export default function RenderRestaurants(restaurantData) { 
    return( 
        <Place>
            <Container2>
                <Overall>
                    <span>{restaurantData.name} <ion-icon name="checkmark-circle"></ion-icon></span>
                    <h3>{Number(restaurantData.score) !== 0 ? (`${Number(restaurantData.score).toFixed(1).replace(".",",")} ⭐`) : ("⭐ NEW ⭐")}</h3>
                </Overall>
                <Info>
                    <img src={restaurantData.mainPhoto} alt="place"/>
                </Info>
            </Container2>

            {Number(restaurantData.score) !== 0 ? (
                <Ranting>
                    <TextBox>
                        <span>Specialty Food:</span>
                        <h4>{restaurantData.typefood}</h4>
                    </TextBox> 
                    <TextBox>
                        <span>Reviews:</span>
                        <h4>{restaurantData.ratings}</h4>
                    </TextBox>
                    <TextBox>
                        <span>Food:</span>
                        <h4> {Number(restaurantData.food).toFixed(1)} ⭐</h4>
                    </TextBox>
                    <TextBox>
                        <span>Attendance:</span>
                        <h4> {Number(restaurantData.attendance).toFixed(1)} ⭐</h4>
                    </TextBox>
                    <TextBox>
                        <span>Price:</span>
                        <h4> {Number(restaurantData.price).toFixed(1)} ⭐</h4>
                    </TextBox>
                    <TextBox>
                        <span>Environment:</span>
                        <h4> {Number(restaurantData.environment).toFixed(1)} ⭐</h4>
                    </TextBox>
                </Ranting>  
            ): (<NoRanting>
                    <New><span>⭐NEW⭐</span></New>
                    <TextBox>
                        <span>Specialty Food:</span>
                        <h4>{restaurantData.type}</h4>
                    </TextBox> 
                    <New><span>⭐NEW⭐</span></New>
                </NoRanting>
                )}               
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

    h4 { 
        color: red;
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
const NoRanting = styled.div`
    width: 100%; 
    display: flex;
    justify-content: space-around;
    padding: 10px 0px 0px 0px;
    font-family: 'Playball', cursive;
    font-size: 24px;
`
const New = styled.div`
    text-align: center;
    margin-right: 20px;

    span { 
        font-weight: 700;
    }
`
const TextBox = styled.li`
    text-align: center;
    margin-right: 20px;

    span {
        font-weight: 500;
    }

    h4 { 
        padding-top: 5px;
    }
`