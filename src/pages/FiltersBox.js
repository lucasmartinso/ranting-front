import styled from "styled-components";
import { Background } from "../common-components/Boxes";

export default function FiltersBox({ setFilterModal }) { 
    return(
        <Background>
            <Box>
                <p>Bom dia</p>
            </Box>
        </Background>
    )
}

const Box = styled.div`
    width: 70%;
    height: 40%;
    background-color: white;
    border-radius: 12px;
`