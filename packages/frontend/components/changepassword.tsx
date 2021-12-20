import PivotCaret from '@components/pivotcaret';
import { PasswordPutDTO } from '@data/user.dto';
import { baseInput, baseHeader, baseButton } from '@styles/base';
import clsx from 'clsx';
import { FormEvent, useRef, useState } from 'react';

interface ChangePasswordProps {
  containerClassname?: string;
  onSubmit: (data: PasswordPutDTO) => void;
}

const ChangePassword = (props: ChangePasswordProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const confirmPassword = useRef<string>('');
  const currentPassword = useRef<string>('');
  const newPassword = useRef<string>('');
  return (
    <div className={clsx(props.containerClassname)}>
      <h2
        className={clsx(
          baseHeader,
          'text-3xl w-full inline-flex cursor-pointer',
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="my-auto">
          <PivotCaret open={open} />{' '}
        </span>
        Change password
        <small className="text-xs my-auto">( Click to open )</small>
      </h2>
      <div
        className={clsx('flex flex-col mt-4 overflow-hidden', { 'h-0': !open })}
      >
        <label htmlFor="current" className={clsx(baseHeader, 'text-2xl')}>
          Current password
        </label>
        <input
          onInput={(e: FormEvent<HTMLInputElement>) => {
            currentPassword.current = e.currentTarget.value;
          }}
          id="current"
          type="password"
          className={clsx(baseInput)}
        />
        <label htmlFor="new" className={clsx(baseHeader, 'text-2xl')}>
          New password
        </label>
        <input
          onInput={(e: FormEvent<HTMLInputElement>) => {
            newPassword.current = e.currentTarget.value;
          }}
          id="new"
          type="password"
          className={clsx(baseInput)}
        />
        <label htmlFor="confirm" className={clsx(baseHeader, 'text-2xl')}>
          Confirm new password
        </label>
        <input
          onInput={(e: FormEvent<HTMLInputElement>) => {
            confirmPassword.current = e.currentTarget.value;
          }}
          id="confirm"
          type="password"
          className={clsx(baseInput)}
        />
        <button
          onClick={() =>
            props.onSubmit({
              password: newPassword.current,
              oldPassword: currentPassword.current,
              confirmPassword: confirmPassword.current,
            })
          }
          className={baseButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default ChangePassword;
