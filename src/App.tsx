import { Navigate, Route, Routes, useLocation } from 'react-router';

import ProjectDetailsPage from './features/projects/ProjectDetailsPage';
import ProjectFormPage from './features/projects/ProjectFormPage';
import ProjectsDashboardPage from './features/projects/ProjectsDashboardPage';
import Layout from './layout/Layout';

function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsDashboardPage />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage key={location.pathname} />}
        />
        <Route path="/projects/:projectId/edit" element={<ProjectFormPage />} />
        <Route path="/projects/create" element={<ProjectFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
