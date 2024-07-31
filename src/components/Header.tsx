import { useDispatch } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { setCurrentPage, setSavedValue } from '../redux/slices/charactersSlice';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';

export default function Header() {
  const [savedLSValue, setSavedLSValue] = useLocalStorage('rickAndMortyCo');
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSavedLSValue(savedLSValue);
    searchParams.set('name', savedLSValue);
    setSearchParams(searchParams);
  }, [savedLSValue, searchParams, setSavedLSValue, setSearchParams]);

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    setSavedLSValue(target);
  }

  function handleSearchButton(): void {
    dispatch(setSavedValue(savedLSValue));
    dispatch(setCurrentPage(1));
  }

  function handleSearchForm(event: React.FormEvent) {
    event.preventDefault();
    handleSearchButton();
  }

  return (
    <>
      <header className="font-custom flex m-auto gap-4 border-b border-gray-200 p-0 py-4 md:container justify-between items-center">
        <div className="font-bold text-green-500 text-xl">Rick and Morty</div>
        <form onSubmit={handleSearchForm} data-testid="search-form">
          <div className="flex items-center">
            <input
              type="text"
              className="grow border-gray-300 border-[1px] p-2"
              placeholder="Search for character..."
              value={savedLSValue}
              onChange={handleChange}
            />
            <button
              className="text-2xl cursor-pointertext-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2"
              onClick={handleSearchButton}
            >
              <CiSearch />
            </button>
          </div>
        </form>
      </header>
    </>
  );
}
