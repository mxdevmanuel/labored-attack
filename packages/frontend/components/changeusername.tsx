import PivotCaret from '@components/pivotcaret';
import { Profile, UsernamePutDTO } from '@data/user.dto';
import { baseInput, baseHeader, baseButton } from '@styles/base';
import clsx from 'clsx';
import { FormEvent, useRef, useState } from 'react';

interface ChangeUsernameProps {
  containerClassname?: string;
  profile: Profile;
  onSubmit: (data: UsernamePutDTO) => void;
}

const ChangeUsername = (props: ChangeUsernameProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const username = useRef<string>('');
  return (
    <div className={clsx(props.containerClassname)}>
      <h2
        className={clsx(
          baseHeader,
          'text-3xl w-full cursor-pointer inline-flex',
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="my-auto">
          <PivotCaret open={open} />
        </span>
        Change username
        <small className="text-xs my-auto">( Click to open )</small>
      </h2>
      <div
        className={clsx('flex flex-col mt-4 overflow-hidden', { 'h-0': !open })}
      >
        <label htmlFor="current" className={clsx(baseHeader, 'text-2xl')}>
          Username
        </label>
        <input
          placeholder={props.profile.username}
          id="current"
          type="text"
          onInput={(e: FormEvent<HTMLInputElement>) =>
            (username.current = e.currentTarget.value)
          }
          className={clsx(baseInput)}
        />
        <button
          onClick={() => {
            props.onSubmit({ username: username.current });
          }}
          className={baseButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default ChangeUsername;
