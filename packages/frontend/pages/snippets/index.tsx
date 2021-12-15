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
import routes from '@routing/routes';
import hljs from 'highlight.js';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import 'highlight.js/styles/github.css';

interface SnippetsProps {
  snippets: Snippet[];
  pageCount: number;
  page: number;
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<SnippetsProps>
> {
  const client = new HttpClient();
  const q: PaginationDTO = { take, skip: 0 };
  let page = 1;
  if (query.page) {
    let pageStr = query.page;
    if (Array.isArray(pageStr)) {
      pageStr = pageStr[0];
    }
    page = parseInt(pageStr);
    q.skip = (page - 1) * take;
  }
  const snippets = await client.listSnippets(q);
  const count = await client.getCount();
  const pageCount = Math.ceil(count / take);
  return { props: { snippets, pageCount, page } };
}

export default function Snippets(props: SnippetsProps) {
  const [atTop, setAtTop] = useState<boolean>(true);

  const scrollContainer = useRef<HTMLDivElement>(null);
  const topEl = useRef<HTMLElement>(null);
  const topObserver = useRef<IntersectionObserver>();
  const router = useRouter();

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
    hljs.highlightAll();
  }, [props.page]);

  useEffect(() => {
    const observer = topObserver.current;
    if (topEl.current) {
      observer?.observe(topEl.current);
    }
    return () => {
      observer?.disconnect();
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
            currentPage={props.page ?? 1}
            pageCount={props.pageCount}
            setPage={(page: number) =>
              router.push({
                pathname: routes.snippets,
                query: { page },
              })
            }
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
