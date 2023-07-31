import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

function getFormData(object, formData) {
    Object.keys(object).forEach(key => formData.append(key, object[key]));
}

export const postCreate = async (token, data) => {
    try {
        const formData = new FormData();
        getFormData(data, formData);
        data.forEach((file, index) => {
            if (file) {
                formData.append(`file`, file);
            }
        });
        const result = await axios.post(`${baseAdminURL}/advertisement`, data, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });
        return {
            success: true,
            data: result.data,
            message: result.message
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.error
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}


