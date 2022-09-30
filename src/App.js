import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpScreen from "./components/Signup";
import GlobalStyle from "./styles/globalStyles";
import LoginScreen from "./components/Login";


export default function App() {
  const [token,setToken] = useState(localStorage.getItem("MY_TOKEN"));
  const [userData, setUserData] = useState(localStorage.getItem("USER_DATA"));
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
        <Routes>
            <Route path="/sign-up" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}
