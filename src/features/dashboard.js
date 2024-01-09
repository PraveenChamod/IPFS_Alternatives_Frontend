import React, { useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFileToDolpin, uploadFileToCloudinary, uploadFileToPinata, uploadFileToStarton } from '../api';

const FileUploadForm = () => {
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const handleStorageChange = (selectedOption) => {
        setSelectedStorage(selectedOption);
        setErrors((prevErrors) => ({ ...prevErrors, storage: null }));
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
        setErrors((prevErrors) => ({ ...prevErrors, files: null }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedStorage.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, storage: 'Select storage cannot be empty.' }));
            toast.error('Select storage cannot be empty.');
            return;
        }

        if (!selectedFiles || selectedFiles.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, files: 'Select files cannot be empty.' }));
            toast.error('Select files cannot be empty.');
            return;
        }

        const isDolpinSelected = selectedStorage.some(option => option.value === 'Dolpin');
        const isCloudinarySelected = selectedStorage.some(option => option.value === 'Cloudinary');
        const isPinataSelected = selectedStorage.some(option => option.value === 'Pinata');
        const isStartonSelected = selectedStorage.some(option => option.value === 'Starton');

        try {
            if (isDolpinSelected) {
                const formData = new FormData();
                formData.append('files', selectedFiles[0]);
                const response = await uploadFileToDolpin(formData);
                if (response.status === 200) {
                    toast.success('File uploaded successfully to dolpin!');
                } else {
                    toast.error('Error uploading file to dolpin.');
                }
            }

            if (isCloudinarySelected) {
                const formData = new FormData();
                formData.append('file', selectedFiles[0]);
                const response = await uploadFileToCloudinary(formData);
                if (response.status === 200) {
                    toast.success('File uploaded successfully to cloudinary!');
                } else {
                    toast.error('Error uploading file to cloudinary.');
                }
            }

            if (isPinataSelected) {
                const formData = new FormData();
                formData.append('file', selectedFiles[0]);
                const response = await uploadFileToPinata(formData);
                if (response.status === 200) {
                    toast.success('File uploaded successfully to pinata!');
                } else {
                    toast.error('Error uploading file to pinata.');
                }
            }

            if (isStartonSelected) {
                const formData = new FormData();
                formData.append('file', selectedFiles[0]);
                const response = await uploadFileToStarton(formData);
                if (response.status === 200) {
                    toast.success('File uploaded successfully to starton!');
                } else {
                    toast.error('Error uploading file to starton.');
                }
            }
        } catch (error) {
            toast.error(errors);
        }
        setSelectedStorage([]);
    };

    const dataList = ['Dolpin', 'Cloudinary', 'Pinata', 'Starton'];

    const generateOptions = (dataList) => {
        return dataList.map((value) => ({ label: value, value: value }));
    };

    return (
        <div className='file-uploader'>
            <h2>File Upload Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Select Storage:</label>
                    <Select
                        isMulti
                        value={selectedStorage}
                        onChange={handleStorageChange}
                        options={generateOptions(dataList)}
                        placeholder={'Select Storage'}
                    />
                </div>
                <div className='form-group'>
                    <label>Choose Files:</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                <div className='form-group'>
                    <button type="submit">Upload</button>
                </div>
            </form>
            <ToastContainer position='bottom-right' autoClose={5000} />
        </div>
    );
};

export default FileUploadForm;
