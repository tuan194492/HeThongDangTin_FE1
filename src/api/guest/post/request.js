import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getAllPostForGuest = async (currentPage, pageLimit) => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/guest/?pageLimit=${pageLimit}&page=${currentPage}`, {
            headers: {
                accept: '*/*',
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
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

export const getRelatedPostForGuest = async () => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/guest/related`, {
            headers: {
                accept: '*/*',
                'content-type': 'application/json'
            }
        });
        return {
            success: true,
            data: result.data,
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

export const getPostById = async (id) => {
    try {
        const result = await axios.get(`${baseAdminURL}/advertisement/guest/post/${id}`);

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