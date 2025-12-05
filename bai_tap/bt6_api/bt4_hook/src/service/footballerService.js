import axios from "axios";


const URL_FOOTBALLER = "http://localhost:3000/footballerList";
const URL_POSITION = "http://localhost:3000/position";


export const getAllFootballers = async () => {
    try {

        const response = await axios.get(URL_FOOTBALLER);

        return response.data;
    } catch (e) {

        console.error("Lỗi lấy danh sách cầu thủ", e);
        return [];
    }
};


export const getAllPositions = async () => {
    try {
        const response = await axios.get(URL_POSITION);
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy danh sách vị trí", e);
        return [];
    }
};


export const addNewFootballer = async (footballer) => {
    try {

        await axios.post(URL_FOOTBALLER, footballer);
    } catch (e) {
        console.error("Lỗi thêm mới", e);
    }
};


export const findFootballerById = async (id) => {
    try {

        const response = await axios.get(`${URL_FOOTBALLER}/${id}`);
        return response.data;
    } catch (e) {
        console.error("Lỗi tìm kiếm theo ID", e);
        return null;
    }
};


export const updateFootballer = async (footballer) => {
    try {

        await axios.put(`${URL_FOOTBALLER}/${footballer.id}`, footballer);
    } catch (e) {
        console.error("Lỗi cập nhật", e);
    }
};


export const deleteFootballerById = async (id) => {
    try {

        await axios.delete(`${URL_FOOTBALLER}/${id}`);
    } catch (e) {
        console.error("Lỗi xóa", e);
    }
};


export const searchFootballerByName = async (name) => {
    try {

        const response = await axios.get(`${URL_FOOTBALLER}?name_like=${name}`);
        return response.data;
    } catch (e) {
        console.error("Lỗi tìm kiếm", e);
        return [];
    }
};