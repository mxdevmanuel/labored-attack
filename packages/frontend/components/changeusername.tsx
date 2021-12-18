import PivotCaret from '@components/pivotcaret';
import { Profile } from '@data/user.dto';
import { baseInput, baseHeader, baseButton } from '@styles/base';
import clsx from 'clsx';
import { useState } from 'react';

interface ChangeUsernameProps {
  containerClassname?: string;
  profile: Profile;
}

const ChangeUsername = (props: ChangeUsernameProps) => {
  const [open, setOpen] = useState<boolean>(false);
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
          className={clsx(baseInput)}
        />
        <button className={baseButton}>Submit</button>
      </div>
    </div>
  );
};
export default ChangeUsername;
