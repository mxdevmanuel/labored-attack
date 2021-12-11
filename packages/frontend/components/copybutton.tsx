import clsx from 'clsx';
import CopyIcon from '@components/icons/copy';
import CheckIcon from '@components/icons/check';
import { useEffect, useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const base = 'px-1 flex lg:hidden group-hover:lg:flex rounded-lg lg:border';
const CopyButton = (props: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(!copied);
      }, 1000);
    }
  }, [copied]);
  let cbutton: JSX.Element;
  if (copied) {
    cbutton = (
      <button
        className={clsx(
          base,
          'bg-green-500 font-bold text-white ',
          props.className,
        )}
      >
        <CheckIcon />
        <span className="hidden lg:flex lg:mx-1">Copied</span>
      </button>
    );
  } else {
    cbutton = (
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(props.text);
          setCopied(true);
        }}
        className={clsx(
          base,
          'text-indigo-200  border-white inline-flex',
          props.className,
        )}
      >
        <CopyIcon />
        <span className="hidden lg:flex lg:mx-1">Copy to clipboard</span>
      </button>
    );
  }
  return cbutton;
};

export default CopyButton;
