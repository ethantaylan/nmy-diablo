import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/accueil';
import { Forum } from './pages/forum';
import { useGlobalDispatch } from './context/context';
import React from 'react';
import { supabase } from './config';
import { Navbar } from './components/navbar';
import { ConnectionModal } from './components/connection-modal';
import { SupabaseClient } from '@supabase/supabase-js';

interface AppRoutes {
  path: string;
  element: React.ReactElement;
}

export function App() {
  const [user, setUser] = React.useState<any>(() =>
    JSON.parse(
      localStorage.getItem('sb-mtpdbpclldolqxsljepu-auth-token') || 'null'
    )
  );
  const [userName, setUserName] = React.useState<string>('');
  const [userAvatar, setUserAvatar] = React.useState<string>('');
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
    if (user) {
      setUserName(user?.user?.user_metadata?.full_name);
      setUserAvatar(user?.user?.user_metadata?.avatar_url);
      dispatch({ type: 'SET_USER_NAME', userName });
      dispatch({ type: 'SET_USER_AVATAR', userAvatar });
    }
  }, [dispatch, user, userName, userAvatar]);

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
