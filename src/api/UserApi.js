import axios from 'axios';

export const UserApi = {
    async CreateUser(data) {
        const response = await axios.post('https://nckh-new.vercel.app/api/api/users',data);
        console.log(data)
        return response.data;
    },
    async Login(data) {
        const response = await axios.post('https://nckh-new.vercel.app/api/api/login',data);
        return response.data;
    },

}

// https://nckh-new.vercel.app/api/