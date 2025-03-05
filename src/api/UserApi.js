import axios from 'axios';

export const UserApi = {
    async CreateUser(data) {
        const response = await axios.post('http://localhost:8000/api/users',data);
        console.log(data)
        return response.data;
    },
    async Login(data) {
        const response = await axios.post('http://localhost:8000/api/login',data);
        return response.data;
    },

}

// http://localhost:8000/