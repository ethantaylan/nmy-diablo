import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/accueil';
import { Forum } from './pages/forum';

interface AppRoutes {
  path: string;
  element: React.ReactElement;
}

export function App() {
  const AppRoutes: AppRoutes[] = [
    { path: '/', element: <Accueil /> },
    { path: '/forum', element: <Forum /> },
  ];

  return (
    <BrowserRouter>
      <div className="p-4">
        <Routes>
          {AppRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
