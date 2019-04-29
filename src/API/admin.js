import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export const login = ({ username, password }) => {
    debugger;
    return axios.post(`${BACKEND_URL}/api/admin/login`, {
        username,
        password
    })
        .then(res => res.data);
}