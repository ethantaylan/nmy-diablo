import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DisconnectIcon, UserIcon } from '../icons/icons';
import { useGlobalContext } from '../context/context';
import React from 'react';

export interface Links {
  title: string;
  href: string;
}

export interface NavbarProps {
  onConnect: () => void;
  onSignOut: () => void;
}

export interface Menus {
  title: string;
  onClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnect, onSignOut }) => {
  const [menu, setMenu] = React.useState<boolean>(false);

  const { userName, userAvatar } = useGlobalContext();
  const navigate = useNavigate();

  const Links: Links[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Roster', href: '/roster' },
    { title: 'Forum', href: '/forum' },
    { title: 'Contact', href: '/contact' },
  ];

  const Menus: Menus[] = [
    { title: 'Déconnecter', onClick: onSignOut },
    { title: 'Autres' },
  ];

  return (
    <div className="w-100 flex h-20 items-center justify-between bg-neutral-950 p-5 ">
      <span
        onClick={() => navigate('/')}
        className="cursor-pointer font-bold text-white"
      >
        ENEMY
      </span>
      <ul className="flex">
        {Links.map((link, index) => (
          <li key={index} className="mx-4">
            <NavLink className="text-gray-400 font-bold" to={link.href}>
              {link.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
      {userName ? (
        <div className="relative flex flex-col">
          <div
            onClick={() => setMenu(!menu)}
            className="flex cursor-pointer items-center rounded-full"
          >
            <span className="me-3 text-neutral-400">{userName}</span>
            <img
              className="w-6 rounded-full border-2 border-zinc-500"
              src={userAvatar}
              alt=""
            />
          </div>
          {menu && (
            <ul
              style={{ top: 30, left: -40 }}
              className="absolute flex flex-col rounded-md bg-gray-100 text-black"
            >
              {Menus.map((menu) => (
                <li
                  onClick={menu.onClick}
                  className="cursor-pointer px-4 hover:rounded-md hover:bg-slate-300"
                >
                  {menu.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <span className="cursor-pointer text-white" onClick={onConnect}>
          {UserIcon('h-5')}
        </span>
      )}
    </div>
  );
};
