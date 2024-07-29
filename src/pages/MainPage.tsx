import { useDispatch, useSelector } from 'react-redux';
import { useGetCharactersListQuery } from '../redux/api/apiSlice';
import { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { selectCharacters, setCharacters, setPages } from '../redux/slices/charactersSlice';
import Loader from '../components/Loader';
import CharacterCard from '../components/CharacterCard';

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters } = useSelector(selectCharacters);

  const {
    data: charactersList,
    isFetching: isFetchingList,
    isError: isErrorList,
  } = useGetCharactersListQuery();

  useEffect(() => {
    if (charactersList) {
      dispatch(setCharacters(charactersList.results));
      dispatch(setPages(charactersList.info.pages));
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
            <div className="grid grid-cols-4 grid-rows-2 gap-6 py-4 grow">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </>
      )}
      <div className=""></div>
    </>
  );
}
