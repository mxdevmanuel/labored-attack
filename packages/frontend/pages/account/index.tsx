import {
  useAlert,
  generateErrorAlert,
  generateSuccessAlert,
  validationToMsg,
} from '@components/alerts';
import ChangePassword from '@components/changepassword';
import ChangeUsername from '@components/changeusername';
import Head from '@components/head';
import Loading from '@components/loading';
import Navbar from '@components/navbar';
import HttpClient from '@data/httpclient';
import { PasswordPutDTO, Profile, User, UsernamePutDTO } from '@data/user.dto';
import { ValidationError } from '@errors/invaliddata.exception';
import { httpErrorExtractor } from '@errors/utils';
import routes from '@routing/routes';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, StrictMode } from 'react';

const baseTitle = 'text-indigo-200 text-left';
const baseSection = 'w-full px-5 lg:w-1/2 lg:mx-auto py-2';

export default function Account() {
  const { current: client } = useRef(new HttpClient());
  const [profile, setProfile] = useState<Profile | undefined>();
  const router = useRouter();
  const [alerts, addAlert] = useAlert();

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
      {alerts}
      <div className="min-h-screen bg-sky-900 pb-5 -mb-5 font-publicsans">
        <Navbar />
        <StrictMode>
          <main className="flex flex-col justify-start lg:items-center">
            <div className={clsx(baseSection, 'pt-0')}>
              <h1 className={clsx(baseTitle, 'text-5xl')}>My account</h1>
            </div>
            <section className={baseSection}>
              <ChangeUsername
                profile={profile}
                onSubmit={(data: UsernamePutDTO) => {
                  client
                    .changeUsername(data)
                    .then((user: User) => {
                      console.log('user');
                      addAlert(
                        generateSuccessAlert(
                          `Username succesfully changed to ${user.username}`,
                          () => router.reload(),
                        ),
                      );
                    })
                    .catch((error: AxiosError | ValidationError) => {
                      console.error(error);
                      if (error.name === 'ValidationError') {
                        addAlert(
                          generateErrorAlert(
                            validationToMsg((error as ValidationError).errors),
                          ),
                        );
                      }
                      if (error.name === 'AxiosError') {
                        const msg = httpErrorExtractor(error as AxiosError);
                        addAlert(generateErrorAlert(msg));
                      }
                    });
                }}
              />
            </section>
            <section className={baseSection}>
              <ChangePassword
                onSubmit={(data: PasswordPutDTO) => {
                  client
                    .changePassword(data)
                    .then((user: User) => {
                      addAlert(
                        generateSuccessAlert(
                          'Password succesfully changed.',
                          () => router.reload(),
                        ),
                      );
                    })
                    .catch((error: AxiosError | ValidationError) => {
                      console.log(error);
                      if (error.name === 'ValidationError') {
                        addAlert(
                          generateErrorAlert(
                            validationToMsg((error as ValidationError).errors),
                          ),
                        );
                      }
                      if (error.name === 'AxiosError') {
                        const msg = httpErrorExtractor(error as AxiosError);
                        addAlert(generateErrorAlert(msg));
                      }
                    });
                }}
              />
            </section>
          </main>
        </StrictMode>
      </div>
    </>
  );
}
