import NavBar from '@components/navbar';
import { Fragment } from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="bg-sky-900"></main>
      <footer className=""></footer>
    </Fragment>
  );
}
