import capitalize from 'lodash/capitalize';
import { Snippet } from '@data/snippet.dto';

interface ListTileProps {
  snippet: Snippet;
}

export default function ListTile({ snippet }: ListTileProps) {
  return (
    <div className="bg-sky-800 mx-5 p-3 rounded-lg">
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
  );
}
