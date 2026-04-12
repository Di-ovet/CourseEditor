import axios from "axios";

const LESSON_API = "/api/lessons";
const PAGES_API = "/api/pages";
const ELEMENTS_API = "/api/elements";

// ===== Pages =====
export async function getPages(lessonId) {
  const res = await axios.get(`${PAGES_API}/getpages/${lessonId}`);
  return res.data;
}

export async function createPage(lessonId, title) {
  const res = await axios.post(`${PAGES_API}/createpage/${lessonId}`, {
    lessonId: lessonId,
    title: title,
  });
  return res.data;
}

export async function movePage(pageId, newOrderIndex) {
  const res = await axios.post(
    `${PAGES_API}/movepage/${pageId}`,
    JSON.stringify(newOrderIndex),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}

// ===== Elements =====
export async function getElements(pageId) {
  const res = await axios.get(`${ELEMENTS_API}/page/${pageId}`);
  return res.data;
}

export async function addElement(pageId, type, data) {
  const res = await axios.post(`${ELEMENTS_API}/addelement/${pageId}`, {
    Type: type,
    Data: data,
  });
  return res.data;
}

export async function updateElement(elementId, data) {
  const res = await axios.put(`${ELEMENTS_API}/update/${elementId}`, {
    Data: data,
  });
  return res.data;
}

export async function deleteElement(elementId) {
  const res = await axios.delete(`${ELEMENTS_API}/${elementId}`);
  return res.data;
}

export async function moveElement(elementId, newOrderIndex) {
  const res = await axios.post(
    `${ELEMENTS_API}/moveelement/${elementId}`,
    JSON.stringify(newOrderIndex),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}
export async function editLesson(lessonId, newtitle) {
  const res = await axios.put(`${LESSON_API}/edittitle/${lessonId}`, {
    id: lessonId,
    Title: newtitle,
  });
  return res.data;
}
