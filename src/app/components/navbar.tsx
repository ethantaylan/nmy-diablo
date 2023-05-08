import { NavLink } from 'react-router-dom';
import { UserIcon } from '../icons/icons';
import { useGlobalContext } from '../context/context';
import React from 'react';

interface Links {
  title: string;
  href: string;
}

interface NavbarProps {
  onClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  const Links: Links[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Roster', href: '/roster' },
    { title: 'Forum', href: '/forum' },
    { title: 'Contact', href: '/contact' },
  ];

  const { userName } = useGlobalContext();

  return (
    <div className="w-100 flex justify-between text-white">
      <NavLink to="/">ENEMY</NavLink>
      <ul className="flex">
        {Links.map((link, index) => (
          <li key={index} className="mx-4">
            <NavLink to={link.href}>{link.title.toUpperCase()}</NavLink>
          </li>
        ))}
      </ul>
      {userName && <span className='text-white'>{userName}</span>}
      <span onClick={onClick}>{UserIcon('h-5')}</span>
    </div>
  );
};
