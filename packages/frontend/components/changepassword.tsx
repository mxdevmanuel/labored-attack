import PivotCaret from '@components/pivotcaret';
import { baseInput, baseHeader, baseButton } from '@styles/base';
import clsx from 'clsx';
import { useState } from 'react';

interface ChangePasswordProps {
  containerClassname?: string;
}

const ChangePassword = (props: ChangePasswordProps) => {
  const [open, setOpen] = useState(false);
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
        <input id="current" type="password" className={clsx(baseInput)} />
        <label htmlFor="new" className={clsx(baseHeader, 'text-2xl')}>
          New password
        </label>
        <input id="new" type="password" className={clsx(baseInput)} />
        <label htmlFor="confirm" className={clsx(baseHeader, 'text-2xl')}>
          Confirm new password
        </label>
        <input id="confirm" type="password" className={clsx(baseInput)} />
        <button className={baseButton}>Submit</button>
      </div>
    </div>
  );
};
export default ChangePassword;
