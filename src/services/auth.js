import * as usersRequests from "../repositories/usersRequests";

export async function authTest(config, setAuth) { 
    try {
        await usersRequests.auth(config);
        setAuth(true);
    } catch (error) {
        setAuth(false);
    }
}