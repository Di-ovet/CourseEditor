import axios from "axios";

const LESSON_API = "/api/lessons";
const PAGES_API = "/api/pages";
const ELEMENTS_API = "/api/elements";

// ===== Pages =====
export async function getPages(lessonId) {
  const res = await axios.get(`${PAGES_API}/getpages/${lessonId}`);
  const pages = res.data;

  await Promise.all(
    pages.map(async (page) => {
      const elements = await getElements(page.id);
      page.elements = elements;
    }),
  );

  return pages;
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
export async function deletePage(pageId) {
  const res = await axios.delete(`${PAGES_API}/${pageId}`);
  return res.data;
}
export async function editPageTitle(pageId, newTitle) {
  const res = await axios.put(`${PAGES_API}/editpagetitle/${pageId}`, {
    id: pageId,
    Title: newTitle,
  });
  return res.data;
}

// ===== Elements =====
export async function getElements(pageId) {
  const res = await axios.get(`${ELEMENTS_API}/getelements/${pageId}`);
  return res.data;
}

export async function addElement(pageId, type, data, order) {
  const res = await axios.post(`${ELEMENTS_API}/addelement/${pageId}`, {
    Type: type,
    Data: JSON.stringify(data),
    OrderIndex: order,
  });
  return res.data;
}

export async function updateElement(elementId, data) {
  const res = await axios.put(`${ELEMENTS_API}/update/${elementId}`, {
    Type: null,
    Data: JSON.stringify(data),
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

export function getDefaultData(type) {
  switch (type) {
    case "Text":
      return { text: "New text" };
    case "Image":
      return { url: "", caption: "" };
    default:
      return {};
  }
}

export async function editLesson(lessonId, newtitle) {
  const res = await axios.put(`${LESSON_API}/edittitle/${lessonId}`, {
    id: lessonId,
    Title: newtitle,
  });
  return res.data;
}
