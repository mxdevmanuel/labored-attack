import { useEffect } from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js';
import { Snippet } from '@data/snippet.dto';
import 'highlight.js/styles/github.css';

// editor: classed to match textarea and pre > code element for highlighted editor
const editor =
  'absolute top-0 bottom-0 min-w-full p-2 rounded-lg overflow-auto focus:outline-none';

interface ViewerProps {
  snippet: Snippet;
}

export default function Viewer(props: ViewerProps) {
  const { snippet } = props;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="flex flex-col place-content-center p-4 mx-auto w-5/6 lg:w-2/3 2xl:w-1/2 font-publicsans">
      <div className="relative h-72 bg-white border-4 rounded-lg border-sky-700">
        <pre
          className={clsx(
            'font-sourcecodepro whitespace-pre-wrap break-words',
            editor,
          )}
        >
          <code className={`rounded-lg language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
