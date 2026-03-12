import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseEditorPage from "./pages/CourseEditorPage";
import HomePage from "./pages/HomePage";
import LessonEditor from "./pages/LessonEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/course/:courseId" element={<CourseEditorPage />} />
        <Route path="/lesson/:lessonId" element={<LessonEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
