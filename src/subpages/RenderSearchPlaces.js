import styled from "styled-components"

export default function RenderSearchPlaces(placeData) { 
    return(
        <Place id={placeData.id}>
            <span>{placeData.name}<ion-icon name="checkmark-circle"></ion-icon></span>
            <span>{Number(placeData.score) !== 0 ? (`${Number(placeData.score).toFixed(1).replace(".",",")} ⭐`) : ("⭐ NEW ⭐")}</span>
        </Place>
    )
}

const Place = styled.li`
    width: 100%;
    height: 40px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0px 20px 0px 20px;

    span { 
        font-weight: 700;
        display: flex; 
        align-items: center;
        font-size: 20px;

        ion-icon { 
            color: #3797F0;
            margin-left: 8px;
            transition: 0.2s all;
            width: 20px;
            height: 20px;
        }
    }

    &:hover { 
        cursor: pointer;
    }

    &:active {  
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
` 