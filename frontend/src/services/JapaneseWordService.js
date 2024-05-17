import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/japaneseWords';

export const listJapaneseWords = () => axios.get(REST_API_BASE_URL);

export const createJapaneseWord = (japaneseWord) => axios.post(REST_API_BASE_URL, japaneseWord);