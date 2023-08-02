import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getOwnerPost = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/all`, {
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