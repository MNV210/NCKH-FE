import axios from 'axios';

export const HeadContent = {
    getHeadContent: async (id) => {
        const response = await axios.get(`http://localhost:8000/api/head_contents?category_id=${id}`);
        return response.data;
    },
    getContentByCategoryId: async (id) => {
        const response = await axios.get(`http://localhost:8000/api/contents?head_content=${id}`);
        return response.data;
    },
};
