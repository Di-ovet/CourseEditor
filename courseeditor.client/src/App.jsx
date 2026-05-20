import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./components/lesson/page/AuthPage";
import CourseEditorPage from "./pages/CourseEditorPage";
import HomePage from "./pages/HomePage";
import LessonEditor from "./pages/LessonEditor";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute>
                <CourseEditorPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <LessonEditor />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
