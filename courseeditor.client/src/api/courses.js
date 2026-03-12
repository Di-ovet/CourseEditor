import axios from "axios";

const API = "/api/courses";

export async function getCourses() {
  const res = await axios.get(`${API}/getcourses`);
  return res.data;
}

// fetch a single course by id; server should expose a corresponding endpoint
export async function getCourse(courseId) {
  const res = await axios.get(`${API}/getcourse/${courseId}`, {
    params: { courseId },
  });
  return res.data;
}

export async function getModules(courseId) {
  const res = await axios.get(`${API}/getmodules/${courseId}`, {
    params: { courseId },
  });
  return res.data;
}
export async function createCourse() {
  const res = await axios.post(`${API}/create`, {
    title: "Untitled course",
  });

  return res.data;
}
export async function createModule(courseId, OrderIndex = 0) {
  const res = await axios.post(`${API}/createmodule/${courseId}`, {
    courseId: courseId,
    title: "Untitled module",
    order: OrderIndex,
  });

  return res.data;
}
export async function getLessons(moduleId) {
  const res = await axios.get(`${API}/getlessons/${moduleId}`);
  return res.data;
}

export async function setNewCourseTitle(courseId, newTitle, newDescription) {
  const res = await axios.post(`${API}/edit/${courseId}`, {
    title: newTitle,
    description: newDescription,
  });
  return res.data;
}
