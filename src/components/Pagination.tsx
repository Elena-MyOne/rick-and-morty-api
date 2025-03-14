import { useDispatch, useSelector } from 'react-redux';
import { selectCharacters, setCurrentPage } from '../redux/slices/charactersSlice';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, pages, nextPage, prevPage } = useSelector(selectCharacters);

  function handlePrevious() {
    if (prevPage) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }

  function handleNext() {
    if (nextPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  }

  function handleLastPage() {
    dispatch(setCurrentPage(pages));
  }

  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <button
        onClick={handlePrevious}
        disabled={!prevPage}
        className={`px-4 py-2 rounded duration-300 ${!prevPage ? 'bg-gray-200 opacity-35' : 'bg-gray-200 cursor-pointer hover:bg-green-400'}`}
      >
        Previous
      </button>
      <div className="px-4 py-2 rounded">{currentPage}</div>
      {pages !== currentPage && (
        <>
          <div className="">...</div>
          <button
            onClick={handleLastPage}
            className="px-4 py-2 rounded duration-300 bg-gray-200 cursor-pointer hover:bg-green-400"
          >
            {pages}
          </button>
        </>
      )}
      <button
        onClick={handleNext}
        disabled={!nextPage}
        className={`px-4 py-2 rounded duration-300 ${!nextPage ? 'bg-gray-200 opacity-35 ' : 'bg-gray-200 cursor-pointer hover:bg-green-400'}`}
      >
        Next
      </button>
    </div>
  );
}
