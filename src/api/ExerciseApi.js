import axios from 'axios';

export const BlogApi = {
    getBlogs: async () => {
        const response = await axios.get(`http://localhost:8000/api/blogs`);
        return response.data;
    },
    getBlogById: async (id) => {
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        return response.data;
    }
};
