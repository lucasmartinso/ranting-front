/* eslint-disable react-hooks/rules-of-hooks */
import * as usersRequests from "../services/usersRequests";
import TokenContext from "../contexts/tokenContext";
import AuthContext from "../contexts/authContext";
import { useContext } from "react";

export async function authTest(config) { 
    const { setAuth } = useContext(AuthContext);

    try {
        await usersRequests.auth(config);
        setAuth(true);
    } catch (error) {
        setAuth(false);
    }
}

export const authTime = 1000 * 60;

export function configVar() {
    const { token } = useContext(TokenContext);
    
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return config;
}