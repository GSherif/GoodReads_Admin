import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export const login = ({ username, password }) => {
    debugger;
    return axios.post(`${BACKEND_URL}/api/users/login`, {
        username,
        password
    })
        .then(res => res.data);
}


// export const getUsers = () => {
//     debugger;
//     return axios.get(`${BACKEND_URL}/api/users`, {
//         headers: {
//             authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
//     })
//         .then(res => res.data);
// }