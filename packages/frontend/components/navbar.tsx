import Link from 'next/link';
import clsx from 'clsx';

/*
 * styles
 * link: classes right side links
 * linkButton: classes for an outline link as a button
 */
const link =
  'text-indigo-200 hover:text-white text-2xl px-4 py-2 mx-2 cursor-pointer selection-none';
const linkButton = 'border-2 border-indigo-200 hover:border-white rounded-lg';

interface NavBarProps {
  showSignUpButton?: boolean;
}

export default function NavBar({ showSignUpButton = true }: NavBarProps) {
  return (
    <nav className="flex flex-row w-full bg-sky-900 p-6 items-center justify-start font-publicsans">
      <div className="flex-grow ">
        <Link href="/">
          <span className="text-orange-400 text-5xl cursor-pointer">
            Snipster
          </span>
        </Link>
      </div>
      <span className={link}>Explore</span>
      <Link href="/login">
        <span className={clsx(link, linkButton, { hidden: !showSignUpButton })}>
          Sign Up
        </span>
      </Link>
    </nav>
  );
}
