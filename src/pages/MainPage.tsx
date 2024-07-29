import { useDispatch, useSelector } from 'react-redux';
import { useGetCharactersListQuery } from '../redux/api/apiSlice';
import { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import {
  selectCharacters,
  setCharacters,
  setNextPage,
  setPages,
  setPrevPage,
} from '../redux/slices/charactersSlice';
import Loader from '../components/Loader';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, pages, currentPage } = useSelector(selectCharacters);

  const {
    data: charactersList,
    isFetching: isFetchingList,
    isError: isErrorList,
  } = useGetCharactersListQuery({ page: currentPage });

  useEffect(() => {
    if (charactersList) {
      dispatch(setCharacters(charactersList.results));
      dispatch(setPages(charactersList.info.pages));
      dispatch(setNextPage(charactersList.info.next));
      dispatch(setPrevPage(charactersList.info.prev));
    }
  }, [charactersList, dispatch]);

  return (
    <>
      {isErrorList ? (
        <div className="text-red-500 text-center pt-4">
          <span>Unable to fetch the characters list</span>
        </div>
      ) : (
        <>
          {isFetchingList && <Loader />}
          {!isFetchingList && (
            <>
              <div className="grid grid-cols-4 grid-rows-2 gap-6 py-4 grow">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              {pages > 0 && <Pagination />}
            </>
          )}
        </>
      )}
    </>
  );
}
