import {
  useAlert,
  generateErrorAlert,
  generateSuccessAlert,
  validationToMsg,
} from '@components/alerts';
import Editor from '@components/editor';
import Head from '@components/head';
import NavBar from '@components/navbar';
import HttpClient from '@data/httpclient';
import {
  validateSnippetPutBody,
  SnippetPutDTO,
  Snippet,
} from '@data/snippet.dto';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';

type ValidationError = { name: string; errors: Record<string, string[]> };

interface EditProps {
  snippet: Snippet;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<EditProps>> {
  const client = new HttpClient();
  let snippetId: string | string[] | undefined = params?.id;
  if (!isNil(snippetId) && Array.isArray(snippetId)) {
    snippetId = snippetId[0];
  }
  const snippet = await client.getSnippet(snippetId as string);
  return { props: { snippet } };
}

export default function Edit({ snippet }: EditProps) {
  const router = useRouter();
  const { current: client } = useRef(new HttpClient());
  const [alerts, addAlert] = useAlert();
  return (
    <Fragment>
      <Head title="Edit" />
      {alerts}
      <div className="bg-sky-900 min-h-screen">
        <NavBar />
        <main>
          <section>
            <Editor
              title="Edit snippet"
              snippet={snippet}
              onUpdate={(body: SnippetPutDTO) => {
                let data: SnippetPutDTO = {
                  ...body,
                  id: router.query.id as string,
                };
                data = omitBy<SnippetPutDTO>(data, isNil) as SnippetPutDTO;
                validateSnippetPutBody(data)
                  .then((errors: Record<string, string[]> | undefined) => {
                    if (isNil(errors)) {
                      return client.updateSnippet(data);
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
                        `Snippet${
                          snippet.title ? ' ' + snippet.title : ' '
                        } updated`,
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
                      (error as AxiosError).response?.status ===
                        HttpClient.HttpErrors.UNAUTHORIZED
                    ) {
                      // TODO: refactor for edition exceptions
                      console.error(error);
                    }
                  });
              }}
              onCancel={() => router.back()}
            ></Editor>
          </section>
        </main>
      </div>
    </Fragment>
  );
}
