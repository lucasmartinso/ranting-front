import { useState } from "react"
import styled from "styled-components"
import logo from "../styles/images/Ranting.png"

export default function SignUpScreen() { 
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  return(
    <Container>

      <Title>
        <img src={logo} alt="logo"/>
      </Title>

      <form >
      <Main>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />
         <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
        />
        <button>Register</button>
      </Main>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column;
`

const Title = styled.div`
  width: 100%; 
  height: 100%;
  display: flex; 
  justify-content: center;
  margin-top: 70px;

  img { 
    width: 500px;
    height: 300px;
  }
`
const Main = styled.div`
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center;
  flex-direction: column;
  margin-bottom: 80px;

  input { 
    width: 80%; 
    height: 70px;
    display: flex;
    align-items: center;
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-left: 20px;
    font-size: 20px;
    font-color: #D5D5D5;
    font-color: rgba(0, 0, 0, 1);
    margin-bottom: 25px;
  }

  button { 
    width: 80%; 
    height: 70px; 
    display: flex;
    background-color: #000000;
    font-color: rgba(255,255,255,1);
    border: 2px solid rgba(120, 177, 89, 0.25);
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
`