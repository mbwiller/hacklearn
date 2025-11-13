import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/layouts/AppLayout';
import { SplashPage } from './pages/SplashPage';
import { AccountPage } from './pages/AccountPage';
import { PromptEngineeringPage } from './pages/PromptEngineeringPage';
import { IDEPage } from './pages/IDEPage';
import { Dashboard } from './components/common/Dashboard';
import { ConceptDetailRouter } from './components/common/ConceptDetailRouter';
import { concepts } from './data/concepts';
import { useProgress } from './hooks/useProgress';

function App() {
  const { progress } = useProgress();

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Splash Page */}
            <Route path="/" element={<SplashPage />} />

            {/* Authentication Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* App Routes (with Header/Layout) - PROTECTED */}
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              {/* Dashboard - Default app route */}
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route
                path="dashboard"
                element={
                  <Dashboard
                    concepts={concepts}
                    progress={progress}
                    onConceptClick={() => {}} // Navigation now handled by ConceptDetailRouter
                  />
                }
              />

              {/* Prompt Engineering Section */}
              <Route path="prompt-engineering" element={<PromptEngineeringPage />} />

              {/* Account Page */}
              <Route path="account" element={<AccountPage />} />

              {/* Concept Detail Pages */}
              <Route path="concepts/:id" element={<ConceptDetailRouter />} />
              <Route path="prompt-concepts/:id" element={<ConceptDetailRouter />} />
            </Route>

            {/* IDE Route (Full-screen, no header) */}
            <Route path="/app/ide/:moduleId" element={<IDEPage />} />

            {/* Catch all - redirect to splash */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
