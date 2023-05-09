import { NavLink } from 'react-router-dom';
import { DisconnectIcon, UserIcon } from '../icons/icons';
import { useGlobalContext } from '../context/context';
import React from 'react';

interface Links {
  title: string;
  href: string;
}

interface NavbarProps {
  onConnect: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnect, onSignOut }) => {
  const Links: Links[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Roster', href: '/roster' },
    { title: 'Forum', href: '/forum' },
    { title: 'Contact', href: '/contact' },
  ];

  const { userName, userAvatar } = useGlobalContext();

  const [menu, setMenu] = React.useState<boolean>(false);

  return (
    <div className="w-100 flex items-center justify-between text-white">
      <NavLink to="/">ENEMY</NavLink>
      <ul className="flex">
        {Links.map((link, index) => (
          <li key={index} className="mx-4">
            <NavLink to={link.href}>{link.title.toUpperCase()}</NavLink>
          </li>
        ))}
      </ul>
      {userName ? (
        <div className="relative flex flex-col">
          <div
            onClick={() => setMenu(!menu)}
            className="flex cursor-pointer items-center rounded-full text-white"
          >
            <span className="me-3 font-bold">{userName}</span>
            <img
              className="w-6 rounded-full border-2 border-zinc-500"
              src={userAvatar}
              alt=""
            />
          </div>
          {menu && (
            <div
              style={{ top: 30, left: -40 }}
              className="absolute flex flex-col rounded-md bg-gray-100 text-black"
            >
              <h1
                className="px-4 cursor-pointer hover:rounded-md hover:bg-slate-300"
                onClick={onSignOut}
              >
                Déconnecter
              </h1>
              <h1
                className="px-4 hover:rounded-md hover:bg-slate-300"
              >
                Autres
              </h1>
            </div>
          )}
        </div>
      ) : (
        <span onClick={onConnect}>
          {UserIcon('h-5')}
        </span>
      )}
    </div>
  );
};
