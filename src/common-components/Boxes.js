import styled from "styled-components";

function ErrorMessage({ error, errorMessage, setError }) { 
    return(
        <>
        {error ? (
            <Error>
                <button>
                    <span>{errorMessage}</span>
                    <span id="x" onClick={() => setError(false)}>X</span>
                </button>
            </Error>
            ) : ""}
        </>
    )
}

function Close({ setUserModal, setOpenModal, setRatingModel, type }) { 
  
  function closeModal() { 
    setUserModal(false);
    setOpenModal(false);
    setRatingModel(false);
  }

  return( 
    <>
      <Cancel>
        <span onClick={closeModal}>X</span>
      </Cancel>
    </>
  )
}

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(111, 111, 111, 0.9);
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    left: 0; 
    top: 0;
    z-index: 2;
`
const Error = styled.div` 
  width: 100%; 
  height: 100px; 
  display: flex; 
  justify-content: center; 
  margin-top: 60px;

  button { 
    width: 80%; 
    height: 70px; 
    display: flex;
    align-items: center; 
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
    background-color: #FF7474;
    color: rgba(255,255,255,1);
    font-size: 20px;
    font-weight: bold;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    transition: 0.2s all;

   span#x { 
    &:hover { 
      cursor: pointer;
    }

    &:active {  
      transform: scale(0.98);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
   }
  }
`
const Cancel = styled.div`
    width: 100%; 
    height: 10%;
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
export const Components = {
  ErrorMessage,
  Close
}