import React from 'react';
import clsx from 'clsx';
import styles from './burgerbutton.module.scss';

interface BurguerButtonProps {
  className?: string;
  open: boolean;
  toggle: () => void;
}
const BurguerButton = (props: BurguerButtonProps) => {
  return (
    <div className={clsx(props.className)}>
      <div className={styles.container}>
        <input
          id="toggle"
          checked={props.open}
          type="checkbox"
          className={styles.state}
        />
        <label htmlFor="toggle" className={styles.burguer}></label>
      </div>
      <button
        className={clsx(styles.toggler, 'absolute')}
        onClick={props.toggle}
      >
        open menu
      </button>
    </div>
  );
};
export default BurguerButton;
