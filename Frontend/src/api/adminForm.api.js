import axios from 'axios';

const API_URL = "https://www.nikhilmotors.com/api/";


export const submitAdminForm = async (formData) => {
    return await axios.post(`${API_URL}/details`, formData);
}