import styled from "styled-components";

export default function RenderReviews(reviewData) { 
    const score = (reviewData.food + reviewData.price + reviewData.attendance + reviewData.environment)/4;

    return(
        <Review key={reviewData.id}>
            <ProfileRating>
            {reviewData.mainPhoto ? (
                        <img src={reviewData.mainPhoto} alt="profile"/>
                    ): ( <ion-icon name="person-circle-sharp"></ion-icon> )}
                <p>@{reviewData.username}</p>
                <p id="score">{score.toFixed(1)} ⭐</p>
            </ProfileRating>
            <ReviewInfo>
                <UserComment comment={reviewData.comment}>
                    <p>{reviewData.name}</p> 
                    <span>{reviewData.comment}</span>
                </UserComment>
                <MainInfo comment={reviewData.comment}>
                    <Ratings>
                        <Rating>

                        </Rating>
                    </Ratings>
                </MainInfo>
            </ReviewInfo>
        </Review>
    )
}

const Review = styled.li`
  width: 100%;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: 16px 16px 16px 16px;
  margin-bottom: 18px;
`;
const ProfileRating = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
        object-fit: cover;
    }

    ion-icon {
        width: 50px;
        height: 50px;
        color: white;
    }

    p {
        margin-top: 8px;
        margin-bottom: 15px;
        font-size: 16px; 
        color: white;
    } 

    p#score { 
        font-size: 20px;
        font-weight: bold;
    }
 `
const ReviewInfo = styled.div`
    width: 90%;
    height: 100%; 
    display: flex; 
    flex-direction: column;
    align-items: space-around;
    margin-left: 18px;
 `
const UserComment = styled.div`
    width: 100%;
    height: ${props => props.comment ? ("33%") : ("15%")};

    p { 
        font-size: 19px; 
        color: rgba(255, 255, 255, 1);
        margin-bottom: 8px;
    } 

    span { 
        font-size: 19px; 
        color: rgba(183, 183, 183, 1); 
        line-height: 20px;
    }
`
const MainInfo = styled.div`
    width: 100%; 
    height: ${props => props.comment ? ("65%") : ("77%")}; 
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 12px; 
`
const Ratings = styled.div`

`
const Rating = styled.div`

`

