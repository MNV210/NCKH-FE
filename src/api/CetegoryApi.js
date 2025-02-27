import axios from 'axios';

export const Categories = {
    async getCategories() {
        const response = await axios.get('https://nckh-new.vercel.app/api/categories');
        return response.data;
    },
    async getContentByCategoryId(id) {
        const response = await  axios.get(`https://nckh-new.vercel.app/api/contents?category_id=${id}`)
        return response.data;
    },
    async getCategoriesWithName(data) {
        const response = await axios.get(`https://nckh-new.vercel.app/api/categories?name=${data}`);
        return response.data;
    },
}