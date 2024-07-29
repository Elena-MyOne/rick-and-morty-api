import { useNavigate, useParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../redux/api/apiSlice';
import Loader from '../components/Loader';
import { ROUTE_PATHS } from '../enums';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: character,
    isFetching,
    isError,
  } = useGetCharacterByIdQuery(id!, {
    skip: !id,
  });

  return (
    <div className="w-full my-12 text-center bg-gray-100">
      {isFetching ? (
        <div className="w-full">
          <Loader />
        </div>
      ) : (
        <>
          {character && (
            <div className="shadow-md border ">
              <figure className=" flex items-center justify-center w-[300px] h-[300px]">
                <img src={character.image} alt={`pokemon ${character.image} image`} />
              </figure>
              <div className="py-4 font-bold pb-2">{character.name}</div>
              <p>Gender: {character.gender}</p>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
              <p>Type: {character.type ? character.type : 'unknown'}</p>
              <button
                className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
                onClick={() => navigate(`${ROUTE_PATHS.MAIN}`)}
              >
                Close details
              </button>
            </div>
          )}
          {isError && <div className="text-red-600">Character not found</div>}
        </>
      )}
    </div>
  );
}
