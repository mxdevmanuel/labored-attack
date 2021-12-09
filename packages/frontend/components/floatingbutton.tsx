import UpIcon from '@components/icons/up';
import clsx from 'clsx';

interface FloatingButtonProps {
  onClick: (e: MouseEvent) => void;
  icon?: JSX.Element;
  visible?: boolean;
  className?: string;
}

export default function FloatingButton(props: FloatingButtonProps) {
  return (
    <div
      className={clsx(
        props.className,
        'rounded-full bg-sky-700 hover:bg-sky-600 p-2 shadow-lg',
        {
          hidden: !props.visible,
        },
      )}
    >
      <UpIcon className="h-8 w-8 m-auto text-white" />
    </div>
  );
}
