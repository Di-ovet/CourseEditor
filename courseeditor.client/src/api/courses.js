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
    title: "Новый курс",
    description: "Описание нового курса",
  });

  return res.data;
}
export async function createModule(courseId, OrderIndex) {
  const res = await axios.post(`${API}/createmodule/${courseId}`, {
    courseId: courseId,
    title: "Новый модуль",
    orderIndex: OrderIndex,
  });

  return res.data;
}
export async function getLessons(moduleId) {
  const res = await axios.get(`${API}/getlessons/${moduleId}`);
  return res.data;
}

export async function setNewCourseTitle(courseId, newTitle, newDescription) {
  const res = await axios.post(`${API}/edit/${courseId}`, {
    courseId,
    Title: newTitle,
    description: newDescription,
  });
  return res.data;
}

export async function moveModule(moduleId, newOrderIndex) {
  const res = await axios.post(
    `${API}/movemodule/${moduleId}`,
    JSON.stringify(newOrderIndex),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}

export async function editModule(moduleId, newtitle) {
  const res = await axios.post(`${API}/editmodule/${moduleId}`, {
    id: moduleId,
    Title: newtitle,
  });
  return res.data;
}

export async function createLesson(moduleId, title = "", order) {
  const res = await axios.post(`${API}/createlesson/${moduleId}`, {
    title,
    order,
  });
  return res.data;
}

export async function moveLesson(lessonId, newOrderIndex) {
  const res = await axios.post(
    `${API}/movelesson/${lessonId}`,
    JSON.stringify(newOrderIndex),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}
