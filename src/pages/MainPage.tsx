import { useDispatch, useSelector } from 'react-redux';
import { useGetCharactersListQuery } from '../redux/api/apiSlice';
import { AppDispatch } from '../redux/store';
import { useCallback, useEffect, useState } from 'react';
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
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, pages, currentPage, savedValue } = useSelector(selectCharacters);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');

  console.log(searchParams);
  console.log('savedValue', savedValue);

  useEffect(() => {
    setSearchQuery(searchParams.get('name') || '');
  }, [searchParams]);

  const {
    data: charactersList,
    isFetching: isFetchingList,
    isError: isErrorList,
  } = useGetCharactersListQuery({ name: searchQuery, page: currentPage });

  useEffect(() => {
    if (charactersList) {
      dispatch(setCharacters(charactersList.results));
      dispatch(setPages(charactersList.info.pages));
      dispatch(setNextPage(charactersList.info.next));
      dispatch(setPrevPage(charactersList.info.prev));
    }
  }, [charactersList, dispatch]);

  const updateSearchParams = useCallback(() => {
    const isDetailsPage =
      location.pathname === '/details' || location.pathname.startsWith('/details/');

    let needsUpdate = false;

    if (isDetailsPage) {
      if (searchParams.has('page')) {
        searchParams.delete('page');
        needsUpdate = true;
      }
    } else {
      const page = searchParams.get('page');
      if (!page || page !== `${currentPage}`) {
        searchParams.set('page', `${currentPage}`);
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      setSearchParams(searchParams);
    }
  }, [currentPage, location, searchParams, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [currentPage, location, searchParams, updateSearchParams]);

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
              <div className="flex gap-6">
                <div className="flex flex-wrap gap-6 py-4 grow">
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </div>
                <div>
                  <Outlet />
                </div>
              </div>

              {pages > 0 && <Pagination />}
            </>
          )}
        </>
      )}
    </>
  );
}
