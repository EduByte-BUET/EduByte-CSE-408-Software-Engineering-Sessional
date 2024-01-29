import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const registerToCourse = async (course_id: any) => {
    const res = await api.post(`/courses/register?course_id=${course_id}`);
    return res;
}

const getCourseHome = async () => {
    const res = await api.get("/courses");
    return res;
}

const getCourse = async (course_id: any) => {
    const res = await api.get(`/courses?course_id=${course_id}`);
    return res;
};

const getBlockList = async (course_id: any) => {
    const res = await api.get(`/courses/blocks/?course_id=${course_id}`);
    return res;
}

export default { getCourse, getBlockList, getCourseHome, registerToCourse };