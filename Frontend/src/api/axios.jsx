import axios from 'axios';

const BASE_URL = "http://localhost:7271/story/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const accessToken = user ? user.token : "";
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const axiosPrivate = axiosInstance;

export const Story = {
    generateStoryGET: "/generate-story"
};

export const Summarization = {
    summarizeStoryPOST: "/summarize-story",
    summarizeStoryGET: "/summarize-story"
}

export default axiosPrivate;