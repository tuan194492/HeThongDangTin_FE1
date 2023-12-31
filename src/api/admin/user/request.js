import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getAllUser = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/users/all`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Get User Data successfully!'
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

export const activeUser = async (token, userId) => {
    try {
        const result = await axios.post(`${baseAdminURL}/users/active/${userId}`, {}, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Active User Data successfully!'
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

export const disableUser = async (token, userId) => {
    try {
        const result = await axios.post(`${baseAdminURL}/users/disable/${userId}`, {} , {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Disable User successfully!'
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
