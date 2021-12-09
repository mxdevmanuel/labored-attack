import FloatingButton from '@components/floatingbutton';
import { Snippet } from '@data/snippet.dto';
import Head from '@components/head';
import Navbar from '@components/navbar';
import List from '@components/list';
import Footer from '@components/footer';
import HttpClient from '@data/httpclient';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useState, useRef } from 'react';

interface SnippetsProps {
  snippets: Snippet[];
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<SnippetsProps>
> {
  const client = new HttpClient();
  const snippets = await client.listSnippets();
  return { props: { snippets } };
}

export default function Snippets(props: SnippetsProps) {
  const [atTop, setAtTop] = useState<boolean>(true);

  const topEl = useRef<HTMLElement>(null);
  const topObserver = useRef<IntersectionObserver>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        setAtTop(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' },
    );
    topObserver.current = observer;

    hljs.highlightAll();
  }, []);

  useEffect(() => {
    const observer = topObserver.current;
    if (topEl.current) {
      observer.observe(topEl.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [topEl]);

  return (
    <>
      <Head title="snippets" />
      <div className="h-screen overflow-scroll bg-sky-900 pb-5 -mb-5">
        <Navbar innerRef={topEl} />
        <div className="flex flex-row">
          <List className="w-3/4" snippets={props.snippets}></List>
        </div>
        <FloatingButton
          className="absolute right-10 bottom-20"
          visible={!atTop}
          onClick={() => {}}
        ></FloatingButton>
        <Footer />
      </div>
    </>
  );
}
