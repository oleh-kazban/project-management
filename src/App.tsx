import { Navigate, Route, Routes } from 'react-router';

import ProjectsDashboard from './features/projects/ProjectsDashboard';
import ProjectView from './features/projects/ProjectView';
import Layout from './layout/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsDashboard />} />
        <Route path="/projects/:projectId" element={<ProjectView />} />
      </Route>
    </Routes>
  );
}

export default App;
