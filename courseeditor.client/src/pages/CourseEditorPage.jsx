import EditorHeader from "../components/EditorHeader.jsx";
import ModuleList from "../components/editor/ModuleList.jsx";
import CreateModuleButton from "../components/editor/CreateModuleButton";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getModules, getCourse, setNewCourseTitle } from "../api/courses";
import EditableTextBox from "../components/EditableTextBox.jsx";
import "../styles.css";

import { useLocation, useParams } from "react-router-dom";

function CourseEditorPage() {
  // read course from location state (pushed by CourseCard).  fall back
  // to server fetch when state is missing or after a full reload.
  const location = useLocation();
  const { courseId } = useParams();

  const [course, setCourse] = useState(location.state?.course || null);
  // track editable/text description values and dirty flag
  const [editText, setEditText] = useState(course?.title || "");
  const [editDescription, setEditDescription] = useState(
    course?.description || "",
  );
  const [modules, setModules] = useState([]);
  // compute dirty flag instead of storing it in state
  // (derived from course and editable fields)

  // helper for loading course data from API and initializing edit fields
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

  // load course when we don't have it or when the id changes
  useEffect(() => {
    if (course && course.id === courseId) return; // already have correct course
    (async () => {
      await fetchCourseData();
    })();
  }, [courseId, course, fetchCourseData]);

  // reload modules whenever we have a course (initial load or after refresh)
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
    // send the updated title/description
    try {
      await setNewCourseTitle(course.id, editText, editDescription);
      console.log("title saved");

      // re-fetch course data from server to keep everything in sync
      await fetchCourseData();
    } catch (err) {
      console.error("failed to save title", err);
    }
    // if called from an event, restore readOnly state
    if (e && e.target) stopEdit(e);
  };

  // compute dirty flag based on current values
  const isDirty = useMemo(
    () =>
      !!course &&
      (editText !== (course.title || "") ||
        editDescription !== (course.description || "")),
    [editText, editDescription, course],
  );

  // prompt on unload if there is unsaved data
  useEffect(() => {
    const handler = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      // standard message will be shown in most browsers
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
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
          placeholder="Enter course title"
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
          placeholder="Enter course description"
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
