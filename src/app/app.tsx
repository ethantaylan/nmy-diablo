import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Accueil } from './pages/accueil';
import { Forum } from './pages/forum';
import { GlobalContextProvider, useGlobalDispatch } from './context/context';
import React from 'react';
import { supabase } from './config';

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

  const dispatch = useGlobalDispatch();

  const AppRoutes: AppRoutes[] = [
    {
      path: '/',
      element: (
        <Accueil
          onSignOut={() => signOut()}
          onConnect={() => signInWithDiscord()}
        />
      ),
    },
    { path: '/forum', element: <Forum /> },
  ];

  const signInWithDiscord = async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    localStorage.setItem(
      'sb-mtpdbpclldolqxsljepu-auth-token',
      JSON.stringify(data)
    );
    setUser(data);
    localStorage.getItem('sb-mtpdbpclldolqxsljepu-auth-token') &&
      setTimeout(() => {
        window.location.reload();
      }, 500);
  };

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

  // React.useEffect(() => {
  //   if (user === null) {
  //     window.location.reload();
  //   }
  // }, [user]);

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
