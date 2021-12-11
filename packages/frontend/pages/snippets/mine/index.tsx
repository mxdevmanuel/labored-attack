import UpIcon from '@components/icons/up';
import FloatingButton from '@components/floatingbutton';
import { Snippet } from '@data/snippet.dto';
import Head from '@components/head';
import Loading from '@components/loading';
import Navbar from '@components/navbar';
import List from '@components/list';
import Footer from '@components/footer';
import HttpClient from '@data/httpclient';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useState, useRef } from 'react';

interface MySnippetsProps {
  snippets: Snippet[];
}

export default function MySnippets(props: MySnippetsProps) {
  const [atTop, setAtTop] = useState<boolean>(true);

  const [snippets, setSnippets] = useState<Snippet[]>(null);
  const { current: client } = useRef(new HttpClient());
  const scrollContainer = useRef<HTMLDivElement>(null);
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

    client
      .listMySnippets()
      .then((snippets: Snippet[]) => {
        setSnippets(snippets);
        hljs.highlightAll();
      })
      .catch(console.error);
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

  if (snippets === null) return <Loading />;

  return (
    <>
      <Head title="snippets" />
      <div
        ref={scrollContainer}
        className="h-screen overflow-scroll bg-sky-900 pb-5 -mb-5"
      >
        <Navbar innerRef={topEl} />
        <div className="flex flex-row">
          <List className="w-3/4" snippets={snippets}></List>
        </div>
        <FloatingButton
          className="absolute right-10 bottom-20"
          visible={!atTop}
          onClick={() => {
            scrollContainer.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <UpIcon className="h-8 w-8 m-auto text-white" />
        </FloatingButton>
        <Footer />
      </div>
    </>
  );
}
