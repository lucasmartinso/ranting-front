import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpScreen from "./components/Signup";
import GlobalStyle from "./styles/globalStyles";


export default function App() {
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<SignUpScreen />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}
