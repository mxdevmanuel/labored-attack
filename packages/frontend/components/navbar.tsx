import { useRouter } from 'next/router';
import { useState, useEffect, RefObject } from 'react';
import isNil from 'lodash/isNil';
import HttpClient from '@data/httpclient';
import UserMenu from '@components/usermenu';
import { Profile } from '@data/user.dto';
import Link from 'next/link';
import clsx from 'clsx';
import routes from '@routing/routes';

// * link: classes right side links
const link =
  'hover:text-white text-2xl px-4 py-2 mx-1 cursor-pointer selection-none';
// * linkButton: classes for an outline link as a button
const linkButton = 'border-2 border-indigo-200 hover:border-white rounded-lg';

interface NavBarProps {
  showAuthAction?: boolean;
  user?: Profile;
  innerRef?: RefObject<HTMLElement>;
}

const client = new HttpClient();

export default function NavBar({
  showAuthAction = true,
  user,
  innerRef,
}: NavBarProps) {
  const [username, setUsername] = useState(user?.username);
  const router = useRouter();

  useEffect(() => {
    if (isNil(username) && showAuthAction) {
      client
        .profile()
        .then((profile: Profile) => setUsername(profile.username))
        .catch(() => {
          console.log('Not Authenticated');
        });
    }
  }, []);
  const isAuthenticated = !isNil(username);
  return (
    <nav
      ref={innerRef}
      className="flex flex-row w-full bg-sky-900 p-6 items-center justify-start font-publicsans"
    >
      <div className="flex-grow ">
        <Link href="/">
          <span className="text-orange-400 text-5xl cursor-pointer">
            Snipster
          </span>
        </Link>
      </div>
      <Link href={routes.root}>
        <span className={clsx(link, 'font-bold text-indigo-200')}>New</span>
      </Link>
      <Link href={routes.snippets}>
        <span className={clsx(link, 'text-indigo-200')}>Explore</span>
      </Link>
      <div
        className={clsx({
          hidden: !isAuthenticated,
        })}
      >
        <UserMenu
          caption={username}
          logoutHandler={() =>
            client.logout().then((success: boolean) => {
              if (success) {
                router.reload();
              }
            })
          }
        />
      </div>
      <Link href="/login">
        <span
          className={clsx(link, linkButton, 'text-indigo-200', {
            hidden: !showAuthAction || isAuthenticated,
          })}
        >
          Sign Up
        </span>
      </Link>
    </nav>
  );
}
