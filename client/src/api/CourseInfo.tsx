import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const getCourse = async (course_id: any) => {
    const res = await api.get(`/courses?course_id=${course_id}`);
    return res;
};

const getBlockList = async (course_id: any) => {
    const res = await api.get(`/courses/blocks/?course_id=${course_id}`);
    return res;
}

export default { getCourse, getBlockList };