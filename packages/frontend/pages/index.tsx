import Head from '@components/head';
import NavBar from '@components/navbar';
import Footer from '@components/footer';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Head title="Inicio" />
      <div className="bg-sky-900 min-h-screen">
        <NavBar />
        <main>
          <section></section>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
