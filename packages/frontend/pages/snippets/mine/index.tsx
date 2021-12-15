import FloatingButton from '@components/floatingbutton';
import Head from '@components/head';
import UpIcon from '@components/icons/up';
import List from '@components/list';
import Loading from '@components/loading';
import Navbar from '@components/navbar';
import Pagination from '@components/pagination';
import { take } from '@data/constants';
import HttpClient from '@data/httpclient';
import { Snippet } from '@data/snippet.dto';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import hljs from 'highlight.js';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import 'highlight.js/styles/github.css';

export default function MySnippets() {
  const { current: client } = useRef(new HttpClient());
  const scrollContainer = useRef<HTMLDivElement>(null);
  const topObserver = useRef<IntersectionObserver>();
  const router = useRouter();

  const [atTop, setAtTop] = useState<boolean>(true);
  const [snippets, setSnippets] = useState<Snippet[] | null>(null);
  const [top, setTop] = useState<HTMLElement | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const getSnippets = () => {
    client
      .listMySnippets({ skip: (page - 1) * take, take })
      .then((snippets: Snippet[]) => {
        console.log(snippets);
        setSnippets(snippets);
        hljs.highlightAll();
        return client.getMySnippetCount();
      })
      .then(setPageCount)
      .catch((err) => {
        console.error(err);

        if (err.name === 'AxiosError') {
          if (
            (err as AxiosError).response?.status ===
            HttpClient.HttpErrors.UNAUTHORIZED
          ) {
            router.replace({ pathname: routes.login });
          }
        }
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        setAtTop(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' },
    );
    topObserver.current = observer;
  }, []);

  useEffect(() => {
    console.log('get happy');
    getSnippets();
  }, [page]);

  useEffect(() => {
    const observer = topObserver.current;
    if (top) {
      observer?.observe(top);
    }
    return () => {
      observer?.disconnect();
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
        <div className="flex flex-col justify-center">
          <List
            className="mx-1 w-full lg:mx-auto lg:w-3/4"
            snippets={snippets}
          />
          <Pagination
            currentPage={page ?? 1}
            pageCount={pageCount}
            setPage={(page: number) => {
              setPage(page);
              router.push(
                {
                  pathname: routes.mine,
                  query: { page },
                },
                undefined,
                { shallow: true },
              );
            }}
          />
        </div>
        <FloatingButton
          className="absolute right-10 bottom-20"
          visible={!atTop}
          onClick={() => {
            scrollContainer.current?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <UpIcon className="h-8 w-8 m-auto text-white" />
        </FloatingButton>
      </div>
    </>
  );
}
