import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import LeftPanel from "../components/lesson/LeftPanel";
import MainEditor from "../components/lesson/MainEditor";
import RightPanel from "../components/lesson/RightPanel";
import "../styles.css";
import {
  getPages,
  addElement,
  moveElement,
  getDefaultData,
} from "../api/lessons";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

function LessonEditor() {
  const location = useLocation();
  const lesson = location.state?.lesson;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [elements, setElements] = useState([]);

  const fetchPages = useCallback(async () => {
    if (!lesson?.id) {
      setLoading(false);
      return;
    }
    try {
      const pageData = await getPages(lesson.id);
      console.log("pages:", pageData);

      setPages(Array.isArray(pageData) ? pageData : []);
      setElements(Array.isArray(pages.elements) ? pages.elements : []);
    } catch (err) {
      console.error("failed to fetch pages", err);
      setPages([]);
      setElements([]);
    } finally {
      setLoading(false);
    }
  }, [lesson?.id]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (!lesson) return;
    if (lesson.isEmpty) {
      console.log("Lesson does not exist, redirecting...");
      navigate(-1);
    }
    setLoading(false);
  }, [lesson, navigate]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const handleRightPanelAction = (action) => {
    console.log("Action:", action);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Загрузка...</div>;
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    console.log("Drag ended. Active:", active, "Over:", over);
    if (!over) return;

    const data = active.data.current;
    const overData = over.data.current;
    console.log("Active data:", data, "Over data:", overData);
    if (data?.type === "tool") {
      const elementType = data.elementType;
      const pageid = over.id.replace("page-", "");
      console.log("Adding element of type:", elementType, "to page:", pageid);
      // default data per type
      const defaultData = getDefaultData(elementType);

      // 1. optimistic UI update
      const tempId = 112;

      const newElement = {
        id: tempId,
        pageid: pageid,
        type: elementType,
        data: defaultData,
        order: elements.length,
      };

      setElements((prev) => [...prev, newElement]);

      console.log(
        "Optimistically added element:",
        newElement,
        "to page:",
        pageid,
        "with tempid:",
        tempId,
      );
      const res = await addElement(
        newElement.pageid,
        newElement.elementType,
        newElement.data,
        newElement.order,
      );

      console.log("Real ID received:", res);
      setElements((prev) =>
        prev.map((el) => (el.id === tempId ? { ...el, id: res } : el)),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="editor-layout">
        <LeftPanel onBack={handleBack} />
        {lesson ? (
          <MainEditor pages={pages} setPages={setPages} lesson={lesson} />
        ) : (
          <div style={{ padding: "20px" }}>Урок не найден</div>
        )}
        {lesson && (
          <RightPanel lesson={lesson} onAction={handleRightPanelAction} />
        )}
      </div>
    </DndContext>
  );
}
export default LessonEditor;
