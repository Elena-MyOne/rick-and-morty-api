import { useDispatch } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { setSavedValue } from '../redux/slices/charactersSlice';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
  const [savedLSValue, setSavedLSValue] = useLocalStorage('rickAndMortyCo');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setSavedLSValue(savedLSValue);
  }, [savedLSValue, setSavedLSValue]);

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    setSavedLSValue(target);
  }

  function handleSearchButton(): void {
    setSavedLSValue(savedLSValue);
    dispatch(setSavedValue(savedLSValue));
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
