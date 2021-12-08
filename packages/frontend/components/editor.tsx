import isNil from 'lodash/isNil';
import { languages } from '@data/constants';
import {
  UIEvent,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js';
import { SnippetPostDTO, SnippetPutDTO, Snippet } from '@data/snippet.dto';
import 'highlight.js/styles/github.css';

// titleStyle: classes for white bg input with blue border
const titleStyle =
  'placeholder-gray-400 text-orange-400 text-lg border-4 rounded-lg border-sky-700 px-4 py-2 my-4 focus:outline-none';
// loginInput: classes for white bg input with blue border
const selectStyle =
  'bg-white placeholder-gray-400 text-sky-900 text-xl border-4 rounded-lg border-sky-700 px-4 py-2 my-2 w-1/3';
// editor: classed to match textarea and pre > code element for highlighted editor
const editor =
  'absolute top-0 bottom-0 min-w-full p-2 rounded-lg overflow-auto focus:outline-none';

interface EditorProps {
  title: string;
  snippet?: Snippet;
  recover?: boolean;
  onSave: (body: SnippetPostDTO | SnippetPutDTO) => void;
  onCancel?: () => void;
}

export default function Editor(props: EditorProps) {
  const { recover, snippet } = props;
  const preRef = useRef<HTMLPreElement>();
  const [title, setTitle] = useState(recover ? snippet?.title : null);
  const [language, setLanguage] = useState(
    recover ? snippet?.language : 'javascript',
  );
  const [code, setCode] = useState(recover ? snippet?.code : '');
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (!isNil(snippet)) {
      setHighlightedCode(
        hljs.highlight(snippet.code, { language: snippet.language }).value,
      );
    }
  });
  useEffect(() => {
    setHighlightedCode(hljs.highlight(code, { language }).value);
  }, [code, language]);

  return (
    <div className="flex flex-col place-content-center p-4 mx-auto w-5/6 lg:w-2/3 2xl:w-1/2 font-publicsans">
      <h2 className="text-4xl text-orange-400">{props.title}</h2>
      <input
        type="text"
        placeholder="// Title"
        defaultValue={!recover ? snippet?.title : undefined}
        onInput={(e: FormEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
        className={clsx(titleStyle)}
      />
      <div className="relative h-72 bg-white border-4 rounded-lg border-sky-700">
        <textarea
          id="editor"
          placeholder="// Code"
          defaultValue={!recover ? snippet?.code : undefined}
          className={clsx(
            'text-transparent ring-transparent bg-transparent caret-sky-900 z-40 focus:outline-none resize-none',
            editor,
          )}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              e.currentTarget.setRangeText(
                '  ',
                e.currentTarget.selectionStart,
                e.currentTarget.selectionStart,
                'end',
              );
            }
          }}
          onScroll={(e: UIEvent<HTMLTextAreaElement>) => {
            preRef.current.scrollTop = e.currentTarget.scrollTop;
            preRef.current.scrollLeft = e.currentTarget.scrollLeft;
          }}
          onInput={(e: FormEvent<HTMLTextAreaElement>) => {
            preRef.current.scrollTop = e.currentTarget.scrollTop;
            preRef.current.scrollLeft = e.currentTarget.scrollLeft;
            let preproc: string = e.currentTarget.value;
            if (preproc.endsWith('\n')) {
              preproc += ' ';
            }
            setCode(preproc);
          }}
        />
        <pre
          ref={preRef}
          className={clsx(
            'font-sourcecodepro whitespace-pre-wrap break-words',
            editor,
          )}
        >
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
        </pre>
      </div>
      <div className="flex flex-row justify-between my-2">
        <select
          id="something"
          placeholder="Language"
          className={selectStyle}
          defaultValue={snippet?.language ?? 'javascript'}
          name="lang"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setLanguage(
              e.currentTarget.options[e.currentTarget.selectedIndex].value,
            )
          }
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          onClick={() => props.onSave({ title, code, language })}
          className="rounded-lg px-8 py-2 my-auto bg-orange-400 text-white text-xl font-semibold"
        >
          Save
        </button>
      </div>
      {!isNil(props.onCancel) && (
        <div className="flex flex-row justify-end my-1">
          <span className="text-red-500 underline hover:text-red-300 cursor-pointer">
            Cancel
          </span>
        </div>
      )}
    </div>
  );
}
