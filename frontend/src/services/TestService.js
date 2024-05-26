import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/tests';

export const listTests = () => axios.get(REST_API_BASE_URL);

export const createTest = (test) => axios.post(REST_API_BASE_URL, test);

// export const getWord = (wordId) => axios.get(REST_API_BASE_URL + '/' + wordId);

// export const updateWord = (wordId, word) => axios.put(REST_API_BASE_URL + '/' + wordId, word);

// export const deleteWord = (wordId) => axios.delete(REST_API_BASE_URL + '/' + wordId);