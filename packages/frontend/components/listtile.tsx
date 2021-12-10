import Link from 'next/link';
import capitalize from 'lodash/capitalize';
import { Snippet } from '@data/snippet.dto';
import routes from '@routing/routes';
import dayjs from 'dayjs';

interface ListTileProps {
  snippet: Snippet;
}

export default function ListTile({ snippet }: ListTileProps) {
  const notUpdated = snippet.created === snippet.updated;
  const dateSign = notUpdated ? 'created: ' : 'updated: ';

  return (
    <Link href={{ pathname: routes.snippet, query: { id: snippet.id } }}>
      <div className="flex flex-col bg-sky-800 hover:bg-sky-700 mx-5 p-3 rounded-lg">
        <span className="text-xl text-orange-400">{snippet.title}</span>
        <div className="flex flex-row items-baseline">
          <span className="text-lg text-indigo-200">
            {capitalize(snippet.language)}
          </span>
          <span className="text-lg text-gray-400 mx-2 font-bold">·</span>
          <span className="text-md text-gray-400">
            {snippet.owner.username}
          </span>
          <div className="text-right flex-grow">
            <span className="text-orange-400">{dateSign}</span>
            <span className="text-indigo-300 text-sm">
              {dayjs(snippet.updated).format('MMMM D, YY')}
            </span>
          </div>
        </div>
        <pre
          key={snippet.id}
          className="font-publicsans bg-white rounded-lg border-4 border-sky-600"
        >
          <code className={`rounded-lg language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </Link>
  );
}
