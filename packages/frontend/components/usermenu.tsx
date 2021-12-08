import { Popover } from '@headlessui/react';
import Link from 'next/link';
import routes from '@routing/routes';

// menuItem: style for menu items on the popup
const menuItem = 'font-semibold hover:text-indigo-50';

interface UserMenuProps {
  caption: string;
  logoutHandler: () => void;
}
export default function UserMenu({ caption, logoutHandler }: UserMenuProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="text-orange-400 hover:text-orange-300 text-2xl px-4 py-2 mx-1">
        {caption}
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-sky-700 border-4 border-sky-800 text-indigo-200 rounded-lg p-4 flex flex-col w-full">
        <Link href={routes.mine}>
          <a className={menuItem}>My snippets</a>
        </Link>
        <hr className="my-2 border-orange-400" />
        <a href="#" onClick={logoutHandler} className={menuItem}>
          Logout
        </a>
      </Popover.Panel>
    </Popover>
  );
}
