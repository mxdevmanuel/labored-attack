interface NavBarProps {
  showSignUpButton?: boolean;
}

export default function NavBar({ showSignUpButton = true }: NavBarProps) {
  return (
    <nav className="flex flex-row w-full bg-sky-900 p-6 items-center justify-start">
      <span className="text-orange-400 font-publicsans text-5xl">Snipster</span>
      <span className="text-indigo-200 text-3xl ml-auto">Explore</span>
      <span className="text-indigo-200 text-3xl">Sign Up</span>
    </nav>
  );
}
