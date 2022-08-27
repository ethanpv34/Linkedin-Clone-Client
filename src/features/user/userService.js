import axios from 'axios';

const API_URL = 'https://linkedin-backend-heroku.herokuapp.com/api/user';

const register = async (data) => {
    try {
        const res = await axios.post(API_URL, data);
        if(res.data) {
            localStorage.setItem("user", JSON.stringify(res.data))
        };
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const login = async (data) => {
    try {
        const req_url = `${API_URL}/login`;
        const res = await axios.post(req_url, data);
        if(res.data) {
            localStorage.setItem("user", JSON.stringify(res.data))
        };
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const logout = () => {
    localStorage.removeItem("user");
};

const userService = {
    register,
    login,
    logout
};

export default userService;