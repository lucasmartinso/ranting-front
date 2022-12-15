import styled from "styled-components";

export default function RenderReviews(reviewData) { 
    const score = (reviewData.food + reviewData.price + reviewData.attendance + reviewData.environment)/4;

    return(
        <Review key={reviewData.id} score={score}>
            <ProfileRating>
            {reviewData.mainPhoto ? (
                        <img src={reviewData.mainPhoto} alt="profile"/>
                    ): ( <ion-icon name="person-circle-sharp"></ion-icon> )}
                <p><strong>@{reviewData.username}</strong></p>
                <p id="score">{score.toFixed(1)} ⭐</p>
                <p id="score">{score===5 ? ("😍") : score>4.5 ? ("🤩") : score>=4 ? ("😄") : score>=3 ? ("🙄") : ("😓")}</p>
            </ProfileRating>
            <ReviewInfo>
                <UserComment comment={reviewData.comment}>
                    <p>{reviewData.name}</p> 
                    <span>{reviewData.comment}</span>
                </UserComment>
                <MainInfo comment={reviewData.comment}>
                    <Ratings>
                        <Rating>
                            <Grade>
                                <span>Food: 🍔</span>
                                <h4>{Number(reviewData.food).toFixed(1)} ⭐</h4>
                            </Grade> 
                            <Upright>.</Upright>
                            <Grade>
                                <span id="price">Price: 💸</span>
                                <h4>{Number(reviewData.price).toFixed(1)} ⭐</h4>
                            </Grade>
                        </Rating>
                        <Line></Line>
                        <Rating>
                            <Grade>
                                <span>Attendance: 👨‍🍳</span>
                                <h4>{Number(reviewData.attendance).toFixed(1)} ⭐</h4>
                            </Grade> 
                            <Upright>.</Upright>
                            <Grade>
                                <span>Environment: 🍽️​</span>
                                <h4>{Number(reviewData.environment).toFixed(1)} ⭐</h4>
                            </Grade>
                        </Rating>
                    </Ratings>
                </MainInfo>
            </ReviewInfo>
        </Review>
    )
}

const Review = styled.li`
  width: 1000px;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: 16px 16px 16px 16px;
  margin-bottom: 18px;

  @media (max-width: 1100px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 97%;
  }
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

    @media (max-width: 750px) { 
        p#score { 
            font-size: 16px;
        }
    }

    @media (max-width: 600px) { 
        p#score { 
            font-size: 15px;
        }
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
    width: 100%;
    height: 100%;
    display: flex; 
    flex-direction: column;
    align-items: center;
`
const Rating = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    span { 
        color: white;
        font-size: 16px;
        font-weight: 700;
    }

    span#price { 
        margin-left: 8px;
    }
`
const Line = styled.div`
    width: 99%; 
    height: 1px;
    border: 1px dashed #D4D4D4;
`
const Grade = styled.div`
    text-align: center;
    margin-right: 20px;
    font-size: 25px;
    border: none;

    span {
        font-weight: 500;
    }

    span#price { 
        margin-left: 10px;
    }

    h4 { 
        padding-top: 5px;
        color: white;
        font-size: 20px;
    }
`
const Upright = styled.div`
    width: 1px;
    height: 90%;
    border: 1px dashed #D4D4D4; 
`


