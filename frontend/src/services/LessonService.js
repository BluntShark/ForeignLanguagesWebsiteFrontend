import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/lessons';
const REST_API_DIFFICULTLY_LEVEL_URL = 'http://localhost:8080/difficultlyLevels';
const REST_API_LESSON_CATRGORY_URL = 'http://localhost:8080/lessonCategories';

export const listLessons = () => axios.get(REST_API_BASE_URL);
export const listDifficultyLevels = () => axios.get(REST_API_DIFFICULTLY_LEVEL_URL);
export const listLessonCategories = () => axios.get(REST_API_LESSON_CATRGORY_URL);

export const createLesson = (lesson) => axios.post(REST_API_BASE_URL, lesson);

export const getLesson = (lessonId) => axios.get(REST_API_BASE_URL + '/' + lessonId);

export const updateLesson = (lessonId, lesson) => axios.put(REST_API_BASE_URL + '/' + lessonId, lesson);

export const deleteLesson = (lessonId) => axios.delete(REST_API_BASE_URL + '/' + lessonId);