import FloatingButton from '@components/floatingbutton';
import Head from '@components/head';
import UpIcon from '@components/icons/up';
import List from '@components/list';
import Navbar from '@components/navbar';
import Pagination from '@components/pagination';
import { take } from '@data/constants';
import HttpClient from '@data/httpclient';
import { PaginationDTO } from '@data/pagination.dto';
import { Snippet } from '@data/snippet.dto';
import hljs from 'highlight.js';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState, useRef } from 'react';
import 'highlight.js/styles/github.css';

interface SnippetsProps {
  snippets: Snippet[];
  pages: number;
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<SnippetsProps>
> {
  const client = new HttpClient();
  const q: PaginationDTO = { take, skip: 0 };
  if (query.page) {
    let page = query.page;
    if (Array.isArray(page)) {
      page = page[0];
    }
    q.skip = (parseInt(page) - 1) * take;
  }
  const snippets = await client.listSnippets(q);
  const count = await client.getCount();
  const pages = Math.ceil(count / take);
  return { props: { snippets, pages } };
}

export default function Snippets(props: SnippetsProps) {
  const [atTop, setAtTop] = useState<boolean>(true);

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
      <div
        ref={scrollContainer}
        className="h-screen overflow-y-scroll bg-sky-900 pb-5 -mb-5"
      >
        <Navbar innerRef={topEl} />
        <div className="flex flex-col justify-center">
          <List
            className="w-full mx-5 lg:mx-auto lg:w-3/4"
            snippets={props.snippets}
          />
          <Pagination
            currentPage={1}
            pages={[1, 2, 3]}
            setPage={(page: number) => {}}
            onPrev={() => {}}
            onNext={() => {}}
          />
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
