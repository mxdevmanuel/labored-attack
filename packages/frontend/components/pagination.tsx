import clsx from 'clsx';
import isNil from 'lodash/isNil';

interface PaginationProps {
  onPrev?: () => void;
  currentPage: number;
  pages: number[];
  setPage: (page: number) => void;
  onNext?: () => void;
}

const base = 'text-indigo-200 cursor-pointer hover:bg-sky-700';
const extremes = 'px-4 py-2';

const Pagination = (props: PaginationProps) => {
  const { currentPage } = props;
  return (
    <div className="flex flex-row justify-center bg-sky-900 font-publicsans font-semibold my-5">
      <div
        onClick={props.onPrev}
        className={clsx(base, extremes, 'rounded-l-lg', {
          hidden: isNil(props.onPrev),
        })}
      >
        Prev
      </div>
      {props.pages.map((page) => (
        <div
          key={`page-${page}`}
          className={clsx(base, 'px-3 py-2', {
            'bg-sky-700': page == currentPage,
          })}
          onClick={() => props.setPage(page)}
        >
          {page}
        </div>
      ))}
      <div
        onClick={props.onNext}
        className={clsx(base, extremes, 'rounded-r-lg', {
          hidden: isNil(props.onNext),
        })}
      >
        Next
      </div>
    </div>
  );
};
export default Pagination;
