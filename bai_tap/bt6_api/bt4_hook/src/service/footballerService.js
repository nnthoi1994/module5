import axios from "axios";

const URL_BE = "http://localhost:3000";


export async function getAllFootballers() {
    try {
        const response = await axios.get(`${URL_BE}/footballerList?_sort=name&_order=asc`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}

export async function addNewFootballer(footballer) {
    try {
        const response = await axios.post(`${URL_BE}/footballerList`, footballer);

        return response.status === 201;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}


export async function updateFootballer(footballer) {
    try {
        const response = await axios.put(`${URL_BE}/footballerList/${footballer.id}`, footballer);

        return response.status === 200;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}


export async function findFootballerById(id) {
    try {
        const response = await axios.get(`${URL_BE}/footballerList/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}


export async function deleteFootballerById(id) {
    try {
        const response = await axios.delete(`${URL_BE}/footballerList/${id}`);
        return response.status === 200;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}


export async function searchFootballerByName(name) {
    try {
        const response = await axios.get(`${URL_BE}/footballerList?name_like=${name}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}