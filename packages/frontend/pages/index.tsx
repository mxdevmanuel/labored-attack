import isNil from 'lodash/isNil';
import Head from '@components/head';
import NavBar from '@components/navbar';
import Editor from '@components/editor';
import Footer from '@components/footer';
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
import { Fragment, useRef } from 'react';

export default function Home() {
  const { current: client } = useRef(new HttpClient());
  const [alerts, addAlert] = useAlert();
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
              onSave={(body: SnippetPostDTO) => {
                validateSnippetPostBody(body)
                  .then((errors: Record<string, string[]>) => {
                    if (isNil(errors)) {
                      return client.createSnippet(body);
                    } else {
                      return Promise.reject(errors);
                    }
                  })
                  .then((snippet: Snippet) => {
                    addAlert(
                      generateSuccessAlert(
                        `Snippet${
                          snippet.title ? ' ' + snippet.title : ' '
                        } created`,
                      ),
                    );
                  })
                  .catch((errors: Record<string, string[]>) => {
                    console.error(errors);
                    addAlert(generateErrorAlert(validationToMsg(errors)));
                  });
              }}
            ></Editor>
          </section>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
