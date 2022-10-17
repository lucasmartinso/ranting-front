import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpScreen from "./components/Signup";
import GlobalStyle from "./styles/globalStyles";
import LoginScreen from "./components/Login";
import TokenContext from"./contexts/tokenContext";
import UserContext from "./contexts/userContext"
import MainScreen from "./components/Main";
import PlaceScreen from "./components/Place";
import CreatePlaceScreen from "./components/CreatePlace";
import InitialScreen from "./components/Initial";

export default function App() {
  const [token,setToken] = useState(localStorage.getItem("MY_TOKEN"));
  const [userData, setUserData] = useState(localStorage.getItem("USER_DATA"));

  return (
    <TokenContext.Provider value={{token,setToken}}>
    <UserContext.Provider value={{userData,setUserData}}>
      <GlobalStyle />
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<InitialScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/main" element={<MainScreen />} />
              <Route path="/places/:id" element={<PlaceScreen />} />
              <Route path="/create/place" element={<CreatePlaceScreen />} />
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </TokenContext.Provider>
  );
}
