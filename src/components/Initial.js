import styled from "styled-components";
import gif from "../styles/images/Ranting.gif";
import { Vortex } from "react-loader-spinner"
import { useNavigate } from "react-router-dom";

export default function InitialScreen() {
    const navigate = useNavigate();
    
    setTimeout(() => {
        navigate("/main");
    },5000)

    return(
        <Container>
            <img src={gif} alt="intro" />
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
            <span>Wait some seconds...</span>
        </Container>
    )
}

const Container = styled.div`
    width: 100%; 
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img { 
        width: 600px;
        height: 300px;
    }

    span {
        color: white;
        font-size: 22px;
        margin-top: 10px;
        font-weight: bold;
    }
`