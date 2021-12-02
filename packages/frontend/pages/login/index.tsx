import { useRouter } from 'next/router';
import { useEffect, useRef, FormEvent } from 'react';
import { loginError } from '@components/alerts/auth.alerts';
import TopologyBackground from '@components/topologybackground';
import NavBar from '@components/navbar';
import Footer from '@components/footer';
import Link from 'next/link';
import HttpClient from '@data/httpclient';
import { LoginDTO, UserLoginDTO, validateUserLoginBody } from '@data/user.dto';
import routes from '@routes';

/*
 * styles
 *
 * loginInput: classes for white bg input with blue border
 * */

const loginInput =
  'placeholder-orange-400 text-orange-400 text-2xl border-4 rounded-lg border-sky-700 px-4 py-2 my-5';

export default function Login() {
  const { current } = useRef(new HttpClient());
  const router = useRouter();
  useEffect(() => {
    // Go to home page if logged in
    current
      .profile()
      .then(() => router.push(routes.home))
      .catch(console.error);
  }, []);
  const username = useRef('');
  const password = useRef('');
  return (
    <TopologyBackground className="h-screen font-publicsans">
      <NavBar showSignUpButton={false} />
      <main className="flex flex-row justify-end px-10">
        <section className="w-full lg:w-1/3 2xl:w-1/4 flex flex-col place-content-center bg-sky-900 p-5 rounded-lg border-4 border-sky-700 my-10">
          <h1 className="text-orange-400 text-5xl text-center mb-5">Sign In</h1>
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
          <button
            onClick={() => {
              const data: UserLoginDTO = {
                username: username.current,
                password: password.current,
              };
              validateUserLoginBody(data).then(
                (validations: Record<string, string[]> | undefined) => {
                  if (validations === undefined) {
                    current
                      .login(data)
                      .then((_login: LoginDTO) => router.push(routes.home))
                      .catch(console.error);
                  } else {
                    loginError({ validation: validations });
                  }
                },
              );
            }}
            className="px-4 py-3 bg-orange-400 text-xl text-white rounded-lg my-5"
          >
            Submit
          </button>
          <Link href="/register">
            <a className="text-indigo-200 text-center hover:font-bold">
              {' '}
              Don't have an account?{' '}
              <span className="font-semibold">Sign Up</span>{' '}
            </a>
          </Link>
        </section>
      </main>
      <Footer />
    </TopologyBackground>
  );
}
