import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
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
      <BrowserRouter>
        <Routes>
          {/* Splash Page */}
          <Route path="/" element={<SplashPage />} />

          {/* App Routes (with Header/Layout) */}
          <Route path="/app" element={<AppLayout />}>
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
    </ThemeProvider>
  );
}

export default App;
