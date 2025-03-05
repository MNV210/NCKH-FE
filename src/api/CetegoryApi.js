import axios from 'axios';

export const Categories = {
    async getCategories() {
        const response = await axios.get('http://localhost:8000/api/categories');
        return response.data;
    },
    async getContentByCategoryId(id) {
        const response = await  axios.get(`http://localhost:8000/api/contents?category_id=${id}`)
        return response.data;
    },
    async getCategoriesWithName(data) {
        const response = await axios.get(`http://localhost:8000/api/categories?name=${data}`);
        return response.data;
    },
}

// http://localhost:8000/