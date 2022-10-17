import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&family=Inconsolata:wght@200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400&family=Oswald:wght@300;400;500;600;700&family=Passion+One:wght@400;700;900&family=Playball&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    box-sizing:border-box;
  }
  body{
    background-color:#359FE4;
    font-family: 'Raleway', sans-serif;
  }
  html{
    @media (max-width:612px) {
      width:100% !important;
    };
  }
`;

export default GlobalStyle;
