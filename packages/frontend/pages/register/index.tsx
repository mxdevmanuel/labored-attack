import {
  useAlert,
  generateErrorAlert,
  generateSuccessAlert,
  validationToMsg,
} from '@components/alerts';
import Head from '@components/head';
import NavBar from '@components/navbar';
import TopologyBackground from '@components/topologybackground';
import HttpClient from '@data/httpclient';
import { validateUserPostBody, UserPostDTO, User } from '@data/user.dto';
import { httpErrorExtractor } from '@errors/utils';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRef, useEffect, FormEvent, KeyboardEvent } from 'react';

// loginInput: classes for white bg input with blue border
const loginInput =
  'placeholder-orange-400 text-orange-400 text-2xl border-4 rounded-lg border-sky-700 px-4 py-2 my-5';

export default function Register() {
  const router = useRouter();
  const [alerts, addAlert] = useAlert();

  const { current } = useRef(new HttpClient());
  const username = useRef('');
  const password = useRef('');
  const confirmPassword = useRef('');
  const submitButton = useRef<HTMLButtonElement>(null);

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitButton.current?.click();
    }
  };
  useEffect(() => {
    // Go to home page if logged in
    current
      .profile()
      .then(() => router.push(routes.home))
      .catch(console.error);
  }, []);
  return (
    <Fragment>
      <Head title="Register" />
      <TopologyBackground className="h-screen font-publicsans">
        {alerts}
        <NavBar showAuthAction={false} />
        <main className="flex flex-row justify-start px-10">
          <section className="w-full lg:w-1/3 2xl:w-1/4 flex flex-col place-content-center bg-sky-900 p-5 rounded-lg border-4 border-sky-700 my-10">
            <h1 className="text-orange-400 text-5xl text-center mb-5">
              Sign Up
            </h1>
            <input
              type="email"
              placeholder="Username"
              className={loginInput}
              onInput={(e: FormEvent<HTMLInputElement>) =>
                (username.current = e.currentTarget.value)
              }
              onKeyPress={onEnter}
            />
            <input
              type="password"
              placeholder="Password"
              className={loginInput}
              onInput={(e: FormEvent<HTMLInputElement>) =>
                (password.current = e.currentTarget.value)
              }
              onKeyPress={onEnter}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className={loginInput}
              onInput={(e: FormEvent<HTMLInputElement>) =>
                (confirmPassword.current = e.currentTarget.value)
              }
              onKeyPress={onEnter}
            />
            <button
              ref={submitButton}
              onClick={() => {
                const data: UserPostDTO = {
                  username: username.current,
                  password: password.current,
                  confirmPassword: confirmPassword.current,
                };
                validateUserPostBody(data).then(
                  (validations: Record<string, string[]> | undefined) => {
                    if (validations === undefined) {
                      current
                        .register(data)
                        .then(
                          (user: User) =>
                            new Promise<void>((resolve) =>
                              addAlert(
                                generateSuccessAlert(
                                  `Successfully registered as ${user.username}`,
                                  resolve,
                                ),
                              ),
                            ),
                        )
                        .then(() => router.push(routes.login))
                        .catch((err: AxiosError) => {
                          const msg = httpErrorExtractor(err);
                          addAlert(generateErrorAlert(msg));
                        });
                    } else {
                      addAlert(
                        generateErrorAlert(validationToMsg(validations)),
                      );
                    }
                  },
                );
              }}
              className="px-4 py-3 bg-orange-400 text-xl text-white rounded-lg my-5"
            >
              Submit
            </button>
            <Link href="/login">
              <a className="text-indigo-200 text-center hover:font-bold">
                {' '}
                Already registered?{' '}
                <span className="font-semibold">Sign In</span>{' '}
              </a>
            </Link>
          </section>
        </main>
      </TopologyBackground>
    </Fragment>
  );
}
