import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/accueil';
import { Forum } from './pages/forum';
import { useGlobalDispatch } from './context/context';
import React from 'react';
import { supabase } from './config';
import { Navbar } from './components/navbar';
import { ConnectionModal } from './components/connection-modal';
import { DiscussionsGenerales } from './pages/forum/discussions-generales';

interface AppRoutes {
  path: string;
  element: React.ReactElement;
}

export function App() {
  const [user, setUser] = React.useState<any>(
    JSON.parse(
      localStorage.getItem('sb-mtpdbpclldolqxsljepu-auth-token') || 'null'
    )
  );
  const [modal, setModal] = React.useState<boolean>(false);

  const dispatch = useGlobalDispatch();

  const AppRoutes: AppRoutes[] = [
    {
      path: '/',
      element: <Accueil />,
    },
    { path: '/forum', element: <Forum /> },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
    localStorage.removeItem('sb-mtpdbpclldolqxsljepu-auth-token');
  };

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // SIGNED_IN
      // TOKEN_REFRESHED
      // ['SIGNED_IN', 'TOKEN_REFRESHED'].includes(event) &&
      setUser(session);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      const userName = user?.user?.user_metadata?.full_name;
      const userAvatar = user?.user?.user_metadata?.avatar_url;
      dispatch({ type: 'SET_USER_NAME', userName });
      dispatch({ type: 'SET_USER_AVATAR', userAvatar });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar onSignOut={() => signOut()} onConnect={() => setModal(true)} />
      <ConnectionModal show={modal} closeModal={() => setModal(false)} />
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
