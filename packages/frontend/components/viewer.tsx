import { useEffect, useState } from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js';
import { Snippet } from '@data/snippet.dto';
import 'highlight.js/styles/github.css';

interface ViewerProps {
  snippet: Snippet;
}

export default function Viewer(props: ViewerProps) {
  const { snippet } = props;
  const [highlightedCode, setHighlightedCode] = useState(snippet.code);

  useEffect(() => {
    setHighlightedCode(
      hljs.highlight(snippet.code, { language: snippet.language }).value,
    );
  });

  return (
    <div className="flex flex-col place-content-center p-4 mx-auto w-5/6 lg:w-2/3 2xl:w-1/2 font-publicsans">
      <h2 className="text-4xl text-orange-400">{snippet.title}</h2>
    </div>
  );
}
