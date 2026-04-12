import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftPanel from "../components/lesson/LeftPanel";
import MainEditor from "../components/lesson/MainEditor";
import RightPanel from "../components/lesson/RightPanel";

function LessonEditor() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lessonId) {
      setLesson({ id: lessonId, title: "Урок" });
    }
    setLoading(false);
  }, [lessonId]);

  const handleRightPanelAction = (action) => {
    console.log("Action:", action);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Загрузка...</div>;
  }

  return (
    <Container fluid className="lesson-editor-container">
      <Row className="h-100">
        <Col md={2} className="lesson-left-panel">
          <LeftPanel onBack={handleBack} />
        </Col>

        <Col md={8} className="lesson-main-editor">
          {lesson ? (
            <MainEditor lesson={lesson} />
          ) : (
            <div style={{ padding: "20px" }}>Урок не найден</div>
          )}
        </Col>

        <Col md={2} className="lesson-right-panel">
          {lesson && <RightPanel lesson={lesson} onAction={handleRightPanelAction} />}
        </Col>
      </Row>
    </Container>
  );
}
export default LessonEditor;
