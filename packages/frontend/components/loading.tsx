import LoadingGrid from './icons/loadinggrid';

const Loading = () => (
  <div className="h-screen w-screen bg-sky-900 grid grid-cols-1 justify-center items-center">
    <div className="mx-auto animate-pulse">
      <LoadingGrid />
    </div>
  </div>
);

export default Loading;
