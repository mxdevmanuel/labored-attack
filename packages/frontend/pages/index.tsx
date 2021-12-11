import isNil from 'lodash/isNil';
import { useRouter } from 'next/router';
import Head from '@components/head';
import NavBar from '@components/navbar';
import Editor from '@components/editor';
import {
  validateSnippetPostBody,
  SnippetPostDTO,
  Snippet,
} from '@data/snippet.dto';
import HttpClient from '@data/httpclient';
import {
  useAlert,
  generateErrorAlert,
  generateSuccessAlert,
  validationToMsg,
} from '@components/alerts';
import { Fragment, useRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import routes from '@routing/routes';

type ValidationError = { name: string; errors: Record<string, string[]> };

export default function Home() {
  const router = useRouter();
  const { current: client } = useRef(new HttpClient());
  const [alerts, addAlert] = useAlert();
  const [snippet, setSnippet] = useState<Snippet>(null);
  const onSave = (body: SnippetPostDTO) =>
    validateSnippetPostBody(body)
      .then((errors: Record<string, string[]>) => {
        if (isNil(errors)) {
          return client.createSnippet(body);
        } else {
          return Promise.reject({
            name: 'ValidationError',
            errors,
          });
        }
      })
      .then((snippet: Snippet) => {
        addAlert(
          generateSuccessAlert(
            `Snippet${snippet.title ? ' ' + snippet.title : ' '} created`,
            () => {
              router.push({
                pathname: routes.snippet,
                query: { id: snippet.id },
              });
            },
          ),
        );
      })
      .catch((error: AxiosError | ValidationError) => {
        if (error.name === 'ValidationError') {
          addAlert(
            generateErrorAlert(
              validationToMsg((error as ValidationError).errors),
            ),
          );
        }
        if (
          error.name === 'AxiosError' &&
          (error as AxiosError).response.status ===
            HttpClient.HttpErrors.UNAUTHORIZED
        ) {
          sessionStorage.setItem('body', JSON.stringify(body));
          router.push({
            pathname: routes.login,
            query: { back: true },
          });
        }
      });

  useEffect(() => {
    if (router.query.back) {
      const body: string = sessionStorage.getItem('body');
      if (!isNil(body)) {
        const data: SnippetPostDTO = JSON.parse(body);
        setSnippet(data as Snippet);
        onSave(data);
      }
    }
  }, []);

  return (
    <Fragment>
      <Head title="Inicio" />
      {alerts}
      <div className="bg-sky-900 min-h-screen">
        <NavBar />
        <main>
          <section>
            <Editor
              title="Create new snippet"
              snippet={snippet}
              onSave={onSave}
            ></Editor>
          </section>
        </main>
      </div>
    </Fragment>
  );
}
