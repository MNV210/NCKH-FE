import axios from 'axios';

export const BlogApi = {
    getBlogs: async () => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/blogs`);
        return response.data;
    },
    getBlogById: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/blogs/${id}`);
        return response.data;
    }
};
