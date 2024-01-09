import axios from 'axios';
import { DOLPIN_API_URL, CLOUDINARY_API_URL, PINATA_API_URL, STARTON_API_URL } from './apiHelper';

const uploadFileToDolpin = async (formData) => {
    try {
        const response = await axios.post(DOLPIN_API_URL, formData);
        return response;
    } catch (error) {
        throw error;
    }
};

const uploadFileToCloudinary = async (formData) => {
    try {
        const response = await axios.post(CLOUDINARY_API_URL, formData);
        return response;
    } catch (error) {
        throw error;
    }
};

const uploadFileToPinata = async (formData) => {
    try {
        const response = await axios.post(PINATA_API_URL, formData);
        return response;
    } catch (error) {
        throw error;
    }
};

const uploadFileToStarton = async (formData) => {
    try {
        const response = await axios.post(STARTON_API_URL, formData);
        return response;
    } catch (error) {
        throw error;
    }
};



export { uploadFileToDolpin, uploadFileToCloudinary, uploadFileToPinata, uploadFileToStarton };
