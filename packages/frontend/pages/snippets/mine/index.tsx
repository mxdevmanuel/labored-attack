import UpIcon from '@components/icons/up';
import FloatingButton from '@components/floatingbutton';
import { Snippet } from '@data/snippet.dto';
import Head from '@components/head';
import Loading from '@components/loading';
import Navbar from '@components/navbar';
import List from '@components/list';
import HttpClient from '@data/httpclient';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import hljs from 'highlight.js';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import 'highlight.js/styles/github.css';

interface MySnippetsProps {
  snippets: Snippet[];
}

export default function MySnippets(props: MySnippetsProps) {
  const { current: client } = useRef(new HttpClient());
  const scrollContainer = useRef<HTMLDivElement>(null);
  const topObserver = useRef<IntersectionObserver>(null);
  const router = useRouter();

  const [atTop, setAtTop] = useState<boolean>(true);
  const [snippets, setSnippets] = useState<Snippet[]>(null);
  const [top, setTop] = useState<HTMLElement>(null);

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
      .catch((err) => {
        if (err.name === 'AxiosError') {
          if (
            (err as AxiosError).response.status ===
            HttpClient.HttpErrors.UNAUTHORIZED
          ) {
            router.replace({ pathname: routes.login });
          }
        }
      });
  }, []);

  useEffect(() => {
    const observer = topObserver.current;
    if (top) {
      observer.observe(top);
    }
    return () => {
      observer.disconnect();
    };
  }, [top]);

  if (snippets === null) return <Loading />;

  return (
    <>
      <Head title="snippets" />
      <div
        ref={scrollContainer}
        className="h-screen overflow-y-scroll bg-sky-900 pb-5 -mb-5"
      >
        <Navbar innerRef={setTop} />
        <div className="flex flex-row justify-center">
          <List
            className="mx-1 w-full lg:mx-auto lg:w-3/4"
            snippets={snippets}
          ></List>
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
      </div>
    </>
  );
}
