import axios from 'axios';

export const Tests = {
    getTests: async () => {
        const response = await axios.get('https://nckh-new.vercel.app/api/api/exercises');
        return response.data;
    },
    getQuestionByTestId: async (id) => {
        const response = await axios.get(`https://nckh-new.vercel.app/api/api/question?exercise_id=${id}`);
        return response.data;
    },
    historyMakeTest: async (data) => {
        const response = await axios.post('https://nckh-new.vercel.app/api/api/history_test', data);
        return response.data;
    },
    getHistoryMakeTest: async (data) => {
        const response = await axios.post('https://nckh-new.vercel.app/api/api/history_make_test', data);
        return response.data;
    }
};
