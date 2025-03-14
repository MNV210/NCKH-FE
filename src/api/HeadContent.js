import axios from 'axios';
import { get } from 'react-hook-form';

export const HeadContent = {
    getHeadContent: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/head_contents?category_id=${id}`);
        return response.data;
    },
    getContentByCategoryId: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/contents?head_content=${id}`);
        return response.data;
    },
    getHeadContentByName: async (data) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/head_contents?title=${data}`);
        return response.data;
    },
    getHeadContentById: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/head_contents/${id}`);
        return response.data;
    },
};
