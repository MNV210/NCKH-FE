import axios from 'axios';

export const Categories = {
    async getCategories() {
        const response = await axios.get('https://nckh-new.vercel.app/api/api/categories');
        return response.data;
    },
    async getContentByCategoryId(id) {
        const response = await  axios.get(`https://nckh-new.vercel.app/api/api/contents?category_id=${id}`)
        return response.data;
    },
    async getCategoriesWithName(data) {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/categories?name=${data}`);
        return response.data;
    },
}

// https://nckh-new.vercel.app/api/