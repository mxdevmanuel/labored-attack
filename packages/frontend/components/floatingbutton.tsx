import { MouseEventHandler } from 'react';
import clsx from 'clsx';

interface FloatingButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: JSX.Element;
  visible?: boolean;
  className?: string;
}

export default function FloatingButton(props: FloatingButtonProps) {
  return (
    <div
      onClick={props.onClick}
      className={clsx(
        props.className,
        'rounded-full bg-sky-700 hover:bg-sky-600 p-2 shadow-lg cursor-pointer animate__animated animate__faster',
        {
          animate__fadeIn: props.visible,
          animate__fadeOut: !props.visible,
        },
      )}
    >
      {props.children}
    </div>
  );
}
