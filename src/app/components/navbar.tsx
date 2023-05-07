import { NavLink } from 'react-router-dom';
import { UserIcon } from '../icons/icons';

interface Links {
  title: string;
  href: string;
}

export const Navbar = () => {
  const Links: Links[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Roster', href: '/roster' },
    { title: 'Forum', href: '/forum' },
    { title: 'Contact', href: '/contact' },
  ];

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
      {UserIcon('h-5')}
    </div>
  );
};
