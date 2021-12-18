import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
}

const base = 'text-indigo-200 cursor-pointer hover:bg-sky-700';
const extremes = 'px-4 py-2';
const pad = 3;

const calculatePages = (currentPage: number, pageCount: number): number[] => {
  const makesOffsetLeft = currentPage > pad;
  const makesOffsetRight = currentPage <= pageCount - pad;
  const first = makesOffsetLeft ? currentPage - pad : 1;
  const last = makesOffsetRight ? currentPage + pad : pageCount;

  // console.log({
  //   currentPage,
  //   pageCount,
  //   makesOffsetLeft,
  //   makesOffsetRight,
  //   first,
  //   last,
  // });
  return Array.from({ length: last }, (_, i) => i + first);
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, pageCount } = props;
  const pages = calculatePages(currentPage, pageCount);
  console.log(pages);
  return (
    <div className="flex flex-row justify-center bg-sky-900 font-publicsans font-semibold my-5">
      <div
        onClick={() => props.setPage(currentPage - 1)}
        className={clsx(base, extremes, 'rounded-l-lg', {
          hidden: currentPage === 1,
        })}
      >
        Prev
      </div>
      {pages.map((page) => (
        <div
          key={`page-${page}`}
          className={clsx(base, 'px-3 py-2', {
            'bg-sky-700': page === currentPage,
          })}
          onClick={() => props.setPage(page)}
        >
          {page}
        </div>
      ))}
      <div
        onClick={() => props.setPage(currentPage + 1)}
        className={clsx(base, extremes, 'rounded-r-lg', {
          hidden: currentPage === props.pageCount,
        })}
      >
        Next
      </div>
    </div>
  );
};
export default Pagination;
