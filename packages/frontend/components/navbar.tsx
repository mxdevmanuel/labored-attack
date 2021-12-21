import BurguerIcon from '@components/icons/burguer';
import CloseIcon from '@components/icons/close';
import UserMenu from '@components/usermenu';
import HttpClient from '@data/httpclient';
import { Profile } from '@data/user.dto';
import { Transition } from '@headlessui/react';
import routes from '@routing/routes';
import clsx from 'clsx';
import isNil from 'lodash/isNil';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, RefObject, Dispatch, Fragment } from 'react';

// * link: classes right side links
const link =
  'hover:text-white text-2xl px-4 py-2 mx-1 cursor-pointer selection-none';

interface NavBarProps {
  showAuthAction?: boolean;
  user?: Profile;
  innerRef?: RefObject<HTMLElement> | Dispatch<HTMLElement>;
}

const Logo = () => (
  <div className="flex-grow">
    <Link href="/">
      <span className="text-orange-400 text-5xl cursor-pointer font-black">
        Snipper{' '}
        <small className="text-indigo-200 font-thin text-xs lg:text-sm hover:text-indigo-100">
          by <a href="https://github.com/mxdevmanuel">@mxdevmanuel</a>{' '}
        </small>
      </span>
    </Link>
  </div>
);

const client = new HttpClient();

export default function NavBar({
  showAuthAction = true,
  user,
  innerRef,
}: NavBarProps) {
  const [username, setUsername] = useState(user?.username);
  const [open, setOpen] = useState(false);
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
  const entries = (
    <Fragment>
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
          className={clsx(
            link,
            'text-indigo-200 lg:border-2 border-indigo-200 hover:border-white rounded-lg',
            {
              hidden: !showAuthAction || isAuthenticated,
            },
          )}
        >
          Sign Up
        </span>
      </Link>
    </Fragment>
  );
  return (
    <nav ref={innerRef} className="w-full bg-sky-900 font-publicsans">
      <div className="flex flex-col lg:hidden bg-sky-900">
        <div className={clsx('flex flex-row h-full bg-sky-900 p-6 z-20', {})}>
          <Logo />
          <button onClick={() => setOpen(!open)}>
            {
              /* TODO: Change this to a css animation */
              open ? (
                <CloseIcon className="text-indigo-200 hover:text-orange-400 w-9 h-9 m-auto cursor-pointer" />
              ) : (
                <BurguerIcon className="text-indigo-200 hover:text-orange-400 w-12 h-12 m-auto cursor-pointer" />
              )
            }
          </button>
        </div>
        <Transition
          show={open}
          className="flex flex-col origin-top z-10 py-2"
          style={{
            boxShadow:
              'inset 0 0 10px rgba(0,0,0,0.5),inset 0 0 10px rgba(0,0,0,0.5)',
          }}
          enter="transition-transform transform"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform transform"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          {entries}
        </Transition>
      </div>
      <div className="hidden lg:flex flex-row items-center justify-start p-6 bg-sky-900">
        <Logo />
        {entries}
      </div>
    </nav>
  );
}
