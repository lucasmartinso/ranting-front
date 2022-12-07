import { useContext, useState } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/tokenContext";
import { Background, Components } from "../common-components/Boxes";
import { ratingFunctions } from "../hooks/rating";

export default function RatingBox({setRatingModel,user,id}) { 
    const [food,setFood] = useState(null);
    const [attendance,setAttendance] = useState(null);
    const [environment,setEnvironment] = useState(null);
    const [price,setPrice] = useState(null);
    const [comment,setComment] = useState(null);
    const { token } = useContext(TokenContext);
    const [error,setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return(
        <Background>
            <Box error={error}>

                <Cancel>
                    <span onClick={() => setRatingModel(false)}>X</span>
                </Cancel>
                
                <Welcome>
                    <span>Hello, <strong>{user.name}</strong></span>
                </Welcome>
                    <Rating>
                        <span id="header">Make your review:</span>
                        <span>
                            Food 🍔:
                            {food ? (
                               food===5 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setFood(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(3)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(4)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(5)}></ion-icon>
                                </>
                               ) : (food===4 ? (
                                <>
                                <ion-icon name="star" id="starfirst" onClick={() => setFood(1)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setFood(2)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setFood(3)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setFood(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setFood(5)}></ion-icon>
                            </>
                               ): (food===3 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setFood(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(5)}></ion-icon>
                                </>
                               ): (food===2 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setFood(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setFood(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(5)}></ion-icon>
                                </>
                               ): (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setFood(1)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setFood(5)}></ion-icon>
                                </>
                               ))))
                            ) : (
                                <>
                                <ion-icon name="star-outline" id="first" onClick={() => setFood(1)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setFood(2)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setFood(3)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setFood(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setFood(5)}></ion-icon>
                                </>
                            )}
                        </span>
                        <span>
                            Attendance 👨‍🍳:
                            {attendance ? (
                               attendance===5 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setAttendance(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(3)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(4)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                               ) : (attendance===4 ? (
                                <>
                                <ion-icon name="star" id="starfirst" onClick={() => setAttendance(1)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setAttendance(2)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setAttendance(3)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setAttendance(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                               ): (attendance===3 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setAttendance(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                               ): (attendance===2 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setAttendance(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setAttendance(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                               ): (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setAttendance(1)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                               ))))
                            ) : (
                                <>
                                <ion-icon name="star-outline" id="first" onClick={() => setAttendance(1)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setAttendance(2)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setAttendance(3)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setAttendance(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setAttendance(5)}></ion-icon>
                                </>
                            )}
                        </span>
                        <span>
                            Price 💸:
                            {price ? (
                               price===5 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setPrice(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(3)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(4)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(5)}></ion-icon>
                                </>
                               ) : (price===4 ? (
                                <>
                                <ion-icon name="star" id="starfirst" onClick={() => setPrice(1)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setPrice(2)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setPrice(3)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setPrice(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setPrice(5)}></ion-icon>
                                </>
                               ): (price===3 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setPrice(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(5)}></ion-icon>
                                </>
                               ): (price===2 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setPrice(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setPrice(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(5)}></ion-icon>
                                </>
                               ): (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setPrice(1)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setPrice(5)}></ion-icon>
                                </>
                               ))))
                            ) : (
                                <>
                                <ion-icon name="star-outline" id="first" onClick={() => setPrice(1)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setPrice(2)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setPrice(3)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setPrice(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setPrice(5)}></ion-icon>
                                </>
                            )}
                        </span>
                        <span>
                            Environment 🍽️:
                            {environment ? (
                               environment===5 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setEnvironment(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(3)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(4)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                               ) : (environment===4 ? (
                                <>
                                <ion-icon name="star" id="starfirst" onClick={() => setEnvironment(1)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setEnvironment(2)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setEnvironment(3)}></ion-icon>
                                <ion-icon name="star" id="star" onClick={() => setEnvironment(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                               ): (environment===3 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setEnvironment(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(2)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                               ): (environment===2 ? (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setEnvironment(1)}></ion-icon>
                                    <ion-icon name="star" id="star" onClick={() => setEnvironment(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                               ): (
                                <>
                                    <ion-icon name="star" id="starfirst" onClick={() => setEnvironment(1)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(2)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(3)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(4)}></ion-icon>
                                    <ion-icon name="star-outline" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                               ))))
                            ) : (
                                <>
                                <ion-icon name="star-outline" id="first" onClick={() => setEnvironment(1)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setEnvironment(2)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setEnvironment(3)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setEnvironment(4)}></ion-icon>
                                <ion-icon name="star-outline" onClick={() => setEnvironment(5)}></ion-icon>
                                </>
                            )}
                        </span>
                        <span id="comment">If you want to make an observation or comment (optional):</span>
                        <Comment>
                            <textarea
                                type="text"
                                placeholder="Click to comment..."
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                maxLength={100}
                                required
                            />
                        </Comment>
                    </Rating>

                    <Components.ErrorMessage 
                        error={error}
                        errorMessage={errorMessage}
                        setError={setError}
                    />

                    <Buttons error={error}>
                        <button id="save" onClick={() => ratingFunctions.sendRating(token,food,environment,attendance,price,comment,id,setRatingModel,setErrorMessage,setError)}>Publish</button>
                        <button id="cancel" onClick={() => setRatingModel(false)}>Cancel</button>
                    </Buttons>
            </Box>
        </Background>
    )
}


const Box = styled.div`
    width: 600px; 
    height: ${props => props.error ? ("780px") : ("650px")};
    background-color: white;
    border-radius: 12px;
    color: rgba(111, 111, 111, 1);
    display: flex; 
    align-items: center;
    flex-direction: column;

    @media (max-width: 800px) { 
        width: 80%;
    }
`
const Cancel = styled.div`
    width: 100%; 
    height: 6%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 18px 0px 0px;
    margin-bottom: 20px;

    button { 
        width: 15%;
        height: 90%;
        background-color: red;
        color: white;
        font-weight: 700;
        font-size: 20px;
        border: 1px solid black;
        border-radius: 12px;
        font-family: 'Playball', cursive;
        display: flex; 
        justify-content: center;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    span { 
        font-weight: 700;
        font-size: 20px;
        color: black;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }
`
const Welcome = styled.div`
    width: 90%;
    height: 5%;
    display: flex; 
    justify-content: flex-start; 

    span { 
        font-size: 22px;
        color: black;
    }
`
const Rating = styled.div`
    width: 90%;
    height: 40%;
    display: flex;
    flex-direction: column;
    margin-bottom: 125px;

    span { 
        font-size: 22px;
        margin-top: 30px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    span#header { 
        text-decoration: underline;
    }

    span#comment {
        font-size: 17px;
        margin-top: 40px;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    ion-icon { 
        width: 30px; 
        height: 30px;
        color: black;

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    ion-icon#first {
        margin-left: 20px;
    }

    ion-icon#starfirst {
        margin-left: 20px;
        color: yellow;
    }

    ion-icon#star {
        color: yellow;
    }
`
const Comment = styled.div`
    width: 490px;
    height: 100px;

    textarea { 
        width: 490px;
        height: 100px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: justify;
        padding: 8px 10px 5px 15px;
        font-size: 25px;
        border-radius: 8px;
        border: 1px dashed black;
    }

    @media (max-width: 700px) { 
        textarea { 
            width: 450px;
        }
    }

    @media (max-width: 650px) { 
        textarea { 
            width: 400px;
        }
    }

    @media (max-width: 550px) { 
        textarea { 
            width: 350px;
        }
    }
`
const Buttons = styled.div`
    width: 100%;
    display: flex;
    margin-top: ${props => props.error ? ("10px") : ("110px")};
    justify-content: flex-end;
    padding-right: 50px;

    button {
        width: 60px;
        height: 40px;
        border-radius: 8px;
        margin-left: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);

        &:hover { 
            cursor: pointer;
        }
    
        &:active {  
            transform: scale(0.98);
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
        }
    }

    button#cancel { 
        background-color: #EC7172;
        border: 1px solid #EC7172; 
        color: white; 
        font-weight: bold;
    }

    button#save { 
        width: 70px;
        background-color: #1A587F;
        border: 1px solid #1A587F; 
        color: white; 
        font-weight: bold;
    }

    @media (max-width: 700px) { 
        padding-right: 25px;
    }
`
