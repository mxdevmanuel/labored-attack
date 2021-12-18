import ChangeUsername from '@components/changeusername';
import ChangePassword from '@components/changepassword';
import Head from '@components/head';
import Loading from '@components/loading';
import Navbar from '@components/navbar';
import HttpClient from '@data/httpclient';
import { Profile } from '@data/user.dto';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, StrictMode } from 'react';

const baseTitle = 'w-full text-indigo-200 text-left';
const baseSection = 'w-full mx-5 lg:w-1/2 lg:mx-auto py-2';

export default function MySnippets() {
  const { current: client } = useRef(new HttpClient());
  const [profile, setProfile] = useState<Profile | undefined>();
  const router = useRouter();

  const getProfile = () => {
    client
      .profile()
      .then((profile: Profile) => setProfile(profile))
      .catch((err) => {
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
    getProfile();
  }, []);

  if (profile === undefined) return <Loading />;

  return (
    <>
      <Head title="My account" />
      <div className="min-h-screen bg-sky-900 pb-5 -mb-5 font-publicsans">
        <Navbar />
        <StrictMode>
          <main className="flex flex-col justify-start lg:items-center">
            <div className={clsx(baseSection, 'pt-0')}>
              <h1 className={clsx(baseTitle, 'text-5xl')}>My account</h1>
            </div>
            <section className={baseSection}>
              <ChangeUsername profile={profile} />
            </section>
            <section className={baseSection}>
              <ChangePassword />
            </section>
          </main>
        </StrictMode>
      </div>
    </>
  );
}
