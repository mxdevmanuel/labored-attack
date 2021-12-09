import clsx from 'clsx';
import { Snippet } from '@data/snippet.dto';
import ListTile from '@components/listtile';
import { RefObject } from 'react';

interface ListProps {
  snippets: Snippet[];
  className?: string;
  innerRef?: RefObject<HTMLDivElement>;
}

export default function List(props: ListProps) {
  return (
    <div
      className={clsx(
        props.className,
        'grid grid-cols-1 gap-3 place-content-center h-full my-5',
      )}
      ref={props.innerRef}
    >
      {props.snippets.map((snippet: Snippet) => (
        <ListTile key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
