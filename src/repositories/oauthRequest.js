import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.BACK_END_URL;

export async function gitHub() { 
    await axios.post(`${URL}/`)
}