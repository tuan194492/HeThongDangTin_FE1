import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getPayment = async (token, userId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/payment/${userId}`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });

        return {
            success: true,
            data: result.data,
            message: 'Get Data successfully!'
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

export const addAmtToPayment = async (token, userId, amt) => {
    try {
        const result = await axios.post(`${baseAdminURL}/payment/${userId}`, {amt: amt} , {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });
        return {
            success: true,
            data: result.data,
            message: 'Add money to account succesful!'
        };
    } catch (error) {
        console.log(error)
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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

export const getAddToAccountHistory = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/payment/add-history`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });

        return {
            success: true,
            data: result.data,
            message: 'Get Data successfully!'
        };
    } catch (error) {
        let message = '';
        console.log(error)
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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

export const getPaymentHistory = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/payment/pay-history`, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });

        return {
            success: true,
            data: result.data,
            message: 'Get Data successfully!'
        };
    } catch (error) {
        let message = '';
        console.log(error)
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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