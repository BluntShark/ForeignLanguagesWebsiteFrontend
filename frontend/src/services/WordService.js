import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/words';

export const listWords = () => axios.get(REST_API_BASE_URL);

export const createWord = (word) => axios.post(REST_API_BASE_URL, word);

export const getWord = (wordId) => axios.get(REST_API_BASE_URL + '/' + wordId);

export const updateWord = (wordId, word) => axios.put(REST_API_BASE_URL + '/' + wordId, word);

export const deleteWord = (wordId) => axios.delete(REST_API_BASE_URL + '/' + wordId);