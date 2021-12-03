import clsx from 'clsx';

// loginInput: classes for white bg input with blue border
const inputStyle =
  'placeholder-gray-400 text-orange-400 text-2xl border-4 rounded-lg border-sky-700 px-4 py-2 my-2';

export default function Editor() {
  return (
    <div className="flex flex-col place-content-center p-20 mx-auto">
      <h2 className="text-2xl text-orange-400">Create new snippet</h2>
      <input type="text" placeholder="// Title" className={clsx(inputStyle)} />
      <textarea placeholder="// Code" className={clsx(inputStyle)} rows={10} />
    </div>
  );
}
