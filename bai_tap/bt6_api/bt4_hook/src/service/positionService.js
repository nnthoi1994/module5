import axios from "axios";


const URL_BE = "http://localhost:3000";

export async function getAllPositions() {
    try {

        const response = await axios.get(`${URL_BE}/position`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}