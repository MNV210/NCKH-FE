import axios from 'axios';
import { get } from 'react-hook-form';

export const Tests = {
    getTests: async () => {
        const response = await axios.get('http://localhost:8000/api/exercises');
        return response.data;
    },
    getQuestionByTestId: async (id) => {
        const response = await axios.get(`http://localhost:8000/api/question?exercise_id=${id}`);
        return response.data;
    },
    historyMakeTest: async (data) => {
        const response = await axios.post('http://localhost:8000/api/history_test', data);
        return response.data;
    }
};
