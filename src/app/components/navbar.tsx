import { NavLink, useNavigate } from 'react-router-dom';
import { UserIcon } from '../icons/icons';
import { useGlobalContext } from '../context/context';
import NmyLogo from '../assets/logo.png';
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

  React.useEffect(() => {
    menu && window.addEventListener('click', () => setMenu(false));
  }, [menu]);

  return (
    <div className="w-100 flex h-20 items-center justify-between bg-neutral-950 px-4">
      <div
        onClick={() => navigate('/')}
        className="flex cursor-pointer items-center font-bold text-white"
      >
        <img className="w-11" src={NmyLogo} alt="NMY logo" />
        <span className="text-3xl font-black italic">ENEMY</span>
      </div>
      <ul className="flex">
        {Links.map((link, index) => (
          <li key={index} className="mx-4">
            <NavLink className="font-bold text-gray-400" to={link.href}>
              {link.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
      {userName ? (
        <div className="relative flex flex-col">
          <div
            onClick={(event) => {
              event.stopPropagation();
              setMenu(!menu);
            }}
            className="flex cursor-pointer items-center rounded-full"
          >
            <span className="me-3 text-neutral-400">{userName}</span>
            <img
              className="w-6 rounded-full border-2 border-zinc-500"
              src={userAvatar}
              alt="User avatar"
            />
          </div>
          {menu && (
            <ul
              style={{ top: 30, left: -40 }}
              className="absolute flex flex-col rounded-md bg-gray-100 text-black"
            >
              {Menus.map((menu, index) => (
                <li
                  key={index}
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
