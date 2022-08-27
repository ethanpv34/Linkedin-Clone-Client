import axios from 'axios';

const API_URL = 'https://linkedin-backend-heroku.herokuapp.com/api/posts';

const getPosts = async () => {
    try {
        const res = await axios.get(API_URL);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
const createPost = async (data, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const res = await axios.post(API_URL, data, config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
const deletePost = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorizaton: `Bearer ${token}`
            }
        };
        const req_url = `${API_URL}/${id}`;
        const res = await axios.delete(req_url, config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const postService = {
    getPosts,
    createPost,
    deletePost
};

export default postService;