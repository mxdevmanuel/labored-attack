import Link from 'next/link';
import capitalize from 'lodash/capitalize';
import { Snippet } from '@data/snippet.dto';
import routes from '@routing/routes';

interface ListTileProps {
  snippet: Snippet;
}

export default function ListTile({ snippet }: ListTileProps) {
  return (
    <Link href={{ pathname: routes.snippet, query: { id: snippet.id } }}>
      <div className="flex flex-col bg-sky-800 hover:bg-sky-700 mx-5 p-3 rounded-lg">
        <span className="text-xl text-orange-400">{snippet.title}</span>
        <span className="text-lg text-indigo-200">
          {capitalize(snippet.language)}
        </span>
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
