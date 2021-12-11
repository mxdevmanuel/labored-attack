import Link from 'next/link';
import Head from '@components/head';

export default function Custom404() {
  return (
    <div className="h-screen bg-sky-900 font-publicsans">
      <Head title="404 - Not found" />
      <div className="flex flex-col translate-y-1/2">
        <span className="text-orange-400 text-7xl text-center">Snipper</span>
        <div className="mx-auto py-10 animate__bounceIn">
          <span className="text-sky-600 text-8xl font-extrabold text-center">
            404
          </span>
        </div>
        <h1 className="text-orange-400 text-5xl text-center">Page not found</h1>
        <Link href="/">
          <a className="text-center text-white text-lg font-semibold my-4">
            Back
          </a>
        </Link>
      </div>
    </div>
  );
}
