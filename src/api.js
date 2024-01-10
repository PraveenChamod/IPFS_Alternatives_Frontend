import axios from 'axios';

const uploadFile = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/upload/file', formData);
        return response;
    } catch (error) {
        throw error;
    }
};

export { uploadFile };
