import axios from 'axios';
import { get } from 'react-hook-form';

export const Tests = {
    getTests: async () => {
        const response = await axios.get('https://nckh-new.vercel.app/api/api/exercises');
        return response.data;
    },
    getQuestionByTestId: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/question?exercise_id=${id}`);
        return response.data;
    }
};
