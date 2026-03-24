import EditorHeader from "../components/EditorHeader.jsx";
import ModuleList from "../components/editor/ModuleList.jsx";
import CreateModuleButton from "../components/editor/CreateModuleButton";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getModules, getCourse, setNewCourseTitle } from "../api/courses";
import EditableTextBox from "../components/EditableTextBox.jsx";
import "../styles.css";

import { useLocation, useParams } from "react-router-dom";

function CourseEditorPage() {
  const location = useLocation();
  const { courseId } = useParams();

  const [course, setCourse] = useState(location.state?.course || null);

  const [editText, setEditText] = useState(course?.title || "");
  const [editDescription, setEditDescription] = useState(
    course?.description || "",
  );
  const [modules, setModules] = useState([]);

  const fetchCourseData = useCallback(async () => {
    try {
      const data = await getCourse(courseId);
      setCourse(data);
      setEditText(data?.title || "");
      setEditDescription(data?.description || "");
    } catch (err) {
      console.error("failed to load course", err);
    }
  }, [courseId]);

  useEffect(() => {
    if (course && course.id === courseId) return;
    (async () => {
      await fetchCourseData();
    })();
  }, [courseId, course, fetchCourseData]);

  useEffect(() => {
    if (!course?.id) return;

    async function fetchModules() {
      const data = await getModules(course.id);
      console.log("modules:", data);
      setModules(data ?? []);
    }

    fetchModules();
  }, [course]);

  const startEdit = (e) => {
    e.target.removeAttribute("readOnly");
  };

  const stopEdit = (e) => {
    e.target.setAttribute("readOnly", true);
  };

  const enterEdit = async (e) => {
    try {
      await setNewCourseTitle(course.id, editText, editDescription);
      console.log("title saved");

      await fetchCourseData();
    } catch (err) {
      console.error("failed to save title", err);
    }

    if (e && e.target) stopEdit(e);
  };

  const isDirty = useMemo(
    () =>
      !!course &&
      (editText !== (course.title || "") ||
        editDescription !== (course.description || "")),
    [editText, editDescription, course],
  );

  useEffect(() => {
    const handler = (e) => {
      if (!isDirty) return;
      e.preventDefault();

      e.returnValue =
        "Остались несохранённые изменения. Вы уверены, что хотите покинуть страницу?";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return (
    <div className="editor-page">
      <EditorHeader onSave={enterEdit} />

      <div className="editor-body">
        <EditableTextBox
          readOnly
          id="titlecore"
          className="course-title"
          placeholder="Введите название курса"
          value={editText}
          onDoubleClick={startEdit}
          onBlur={stopEdit}
          onEnter={enterEdit}
          onInput={(e) => setEditText(e.target.value)}
        />

        <textarea
          readOnly
          id="descriptioncore"
          className="course-description"
          placeholder="Введите описание курса"
          value={editDescription}
          defaultValue={course?.description}
          onDoubleClick={startEdit}
          onBlur={stopEdit}
          onInput={(e) => setEditDescription(e.target.value)}
        />
        <ModuleList modules={modules} />

        <CreateModuleButton
          courseId={course?.id}
          onCreated={(newModule) => {
            setModules((prev) => [...prev, newModule]);
          }}
        />
      </div>
    </div>
  );
}

export default CourseEditorPage;
