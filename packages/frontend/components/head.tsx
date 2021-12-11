import Head from 'next/head';

interface BubblesProps {
  title: string;
}
export default function Bubbles(props: BubblesProps) {
  return (
    <Head>
      <title>Snipper - {props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
