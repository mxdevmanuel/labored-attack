import { useRef, FormEvent } from 'react';
import Link from 'next/link';
import TopologyBackground from '@components/topologybackground';
import NavBar from '@components/navbar';
import Footer from '@components/footer';
import HttpClient from '@data/httpclient';
import { validateUserPostBody, UserPostDTO, User } from '@data/user.dto';

/*
 * styles
 *
 * loginInput: classes for white bg input with blue border
 * */

const loginInput =
  'placeholder-orange-400 text-orange-400 text-2xl border-4 rounded-lg border-sky-700 px-4 py-2 my-5';

export default function Register() {
  const { current } = useRef(new HttpClient());
  const username = useRef('');
  const password = useRef('');
  return (
    <TopologyBackground className="h-screen font-publicsans">
      <NavBar showSignUpButton={false} />
      <main className="flex flex-row justify-start px-10">
        <section className="w-full lg:w-1/3 2xl:w-1/4 flex flex-col place-content-center bg-sky-900 p-5 rounded-lg border-4 border-sky-700 my-10">
          <h1 className="text-orange-400 text-5xl text-center mb-5">Sign Up</h1>
          <input
            type="email"
            placeholder="Username"
            className={loginInput}
            onInput={(e: FormEvent<HTMLInputElement>) =>
              (username.current = e.currentTarget.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            className={loginInput}
            onInput={(e: FormEvent<HTMLInputElement>) =>
              (password.current = e.currentTarget.value)
            }
          />
          <input
            type="password"
            placeholder="Confirm password"
            className={loginInput}
          />
          <button
            onClick={() => {
              const data: UserPostDTO = {
                username: username.current,
                password: password.current,
              };
              validateUserPostBody(data).then(
                (validations: Record<string, string[]> | undefined) => {
                  if (validations === undefined) {
                    current
                      .register(data)
                      .then((user: User) => console.log(user))
                      .catch(console.error);
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
              Already registered? <span className="font-semibold">
                Sign In
              </span>{' '}
            </a>
          </Link>
        </section>
      </main>
      <Footer />
    </TopologyBackground>
  );
}