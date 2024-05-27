import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/users";

export const addUserWord = (userId, wordId) => {
    // return axios.post(`${USER_API_BASE_URL}/${userId}/words/${wordId}`);
    return axios.post(USER_API_BASE_URL + '/' + userId + '/words/' + wordId);
};

export const listUserWords = (userId) => {
    // return axios.get(`${USER_API_BASE_URL}/${userId}/words`);
    return axios.get(USER_API_BASE_URL + '/' + userId + '/words');
};