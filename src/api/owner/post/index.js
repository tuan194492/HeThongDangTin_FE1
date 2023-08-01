import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

function getFormData(object, formData) {
    Object.keys(object).forEach(key => formData.append(key, object[key]));
}

export const postCreate = async (token, data, images) => {
    try {
        console.log(data)
        console.log(images)
        const formData = new FormData();
        getFormData(data, formData);

        images.forEach((file, index) => {
            if (file) {
                formData.append(`file`, file);
            }
        });

        console.log(formData);

        const result = await axios.post(`${baseAdminURL}/advertisement`, formData, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Create Post successful'
        };
    } catch (error) {
        console.log(error)
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
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

export const getOwnerPost = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/my-advertisement`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data.data,
            message: 'Get post list successful'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
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

export const getPostById = async (token, id) => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/${id}`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Get post successful'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
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

export const deletePostById = async (token, id) => {
    try {
        console.log(id)
        const result = await axios.delete(`${baseAdminURL}/advertisement/${id}`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Delete post successful'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
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

