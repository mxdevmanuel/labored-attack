import {
  useAlert,
  generateWarningAlert,
  generateSuccessAlert,
} from '@components/alerts';
import Head from '@components/head';
import NavBar from '@components/navbar';
import Viewer from '@components/viewer';
import HttpClient from '@data/httpclient';
import { Snippet } from '@data/snippet.dto';
import { Profile } from '@data/user.dto';
import routes from '@routing/routes';
import clsx from 'clsx';
import capitalize from 'lodash/capitalize';
import isArray from 'lodash/isArray';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef, useEffect, useState } from 'react';

interface SnippetByIdProps {
  snippet: Snippet;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<SnippetByIdProps>
> {
  try {
    const client = new HttpClient();

    let snippetId = params.id;
    if (isArray(params.id)) {
      snippetId = params.id[0];
    }
    const ret: SnippetByIdProps = {
      snippet: await client.getSnippet(snippetId as string),
    };
    return { props: ret };
  } catch (err: any) {
    return { notFound: true };
  }
}

export default function SnippetById({ snippet }: SnippetByIdProps) {
  const { current: client } = useRef(new HttpClient());
  const [profile, setProfile] = useState<Profile>(null);
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [alert, addAlert] = useAlert();

  useEffect(() => {
    client.profile().then(setProfile).catch(console.error);
    if (isArray(router.query.id)) {
      setId(router.query.id[0]);
    } else {
      setId(router.query.id as string);
    }
  }, []);

  return (
    <Fragment>
      <Head title={snippet.title ?? 'Snippet'} />
      {alert}
      <div className="bg-sky-900 min-h-screen">
        <NavBar user={profile} />
        <main className="font-publicsans">
          <section className="mx-auto flex flex-col place-content-center">
            <div className="w-5/6 lg:w-2/3 2xl:w-1/2 mx-auto px-4 my-1">
              <h2 className="text-4xl text-orange-400">{snippet.title}</h2>
            </div>
            <div
              className={
                'flex flex-row justify-end w-5/6 lg:w-2/3 2xl:w-1/2 mx-auto px-4'
              }
            >
              <div className="flex-grow">
                <span
                  className={clsx('text-2xl ', {
                    'text-sky-600': snippet.title,
                    'text-orange-400': !snippet.title,
                  })}
                >
                  {capitalize(snippet.language)}
                </span>
              </div>
              <Link
                href={{ pathname: routes.editsnippet, query: router.query }}
              >
                <a
                  className={clsx(
                    'text-xl text-indigo-200 hover:text-indigo-400 cursor-pointer mx-2',
                    { hidden: !profile },
                  )}
                >
                  Edit
                </a>
              </Link>
              <a
                href="#"
                className={clsx(
                  'text-xl text-red-500 hover:text-red-400 cursor-pointer mx-2',
                  { hidden: !profile },
                )}
                onClick={() => {
                  addAlert(
                    generateWarningAlert(
                      'Are you sure you want to delete this snippet',
                      {
                        confirmText: 'Confirm',
                        onCancel: () => {
                          console.log('Cancelled');
                        },
                        onConfirm: () => {
                          client
                            .deleteSnippet(id)
                            .then((success: true) => {
                              if (success) {
                                addAlert(
                                  generateSuccessAlert(
                                    'Snippet successfully deleted',
                                  ),
                                );
                              }
                            })
                            .catch(console.error);
                        },
                      },
                    ),
                  );
                }}
              >
                Delete
              </a>
            </div>
            <Viewer snippet={snippet} />
          </section>
        </main>
      </div>
    </Fragment>
  );
}
