import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { supabase } from '../config';
import Login from './login';
import React from 'react';
import { error } from 'console';

export const ForumSideBar = () => {
  const [user, setUser] = React.useState<any>(
    // try to get user data from localStorage
    () => JSON.parse(localStorage.getItem('user') || 'null')
  );

  const signInWithDiscord = async () => {
     await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    // save user data to localStorage
    localStorage.setItem('user', JSON.stringify(data));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // remove user data from localStorage
    localStorage.removeItem('user');
  };

  return (
    <div className="text-white">
      <h1>FORUM</h1>
      <ul>
        <li>Guides</li>
        <li>Strats</li>
        <li>Autres</li>
      </ul>
      <hr />
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <Login />
      )}
      <button
        onClick={() => {
          signInWithDiscord();
        }}
      >
        Sign in with Discord
      </button>
      <p onClick={() => console.log(user)}>test</p>
    </div>
  );
};
