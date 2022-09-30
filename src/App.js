import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpScreen from "./components/Signup";
import GlobalStyle from "./styles/globalStyles";
import LoginScreen from "./components/Login";


export default function App() {
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
