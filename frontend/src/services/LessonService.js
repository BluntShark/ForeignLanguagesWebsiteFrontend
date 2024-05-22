import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/lessons';

export const listLessons = () => axios.get(REST_API_BASE_URL);

export const createLesson = (lesson) => axios.post(REST_API_BASE_URL, lesson);