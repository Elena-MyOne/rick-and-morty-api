import { Link } from 'react-router-dom';
import { CharacterData } from '../types/CharacterData';

interface CharacterCardProps {
  character: CharacterData;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, id, image, gender, species, status } = character;
  return (
    <Link
      to={`/details/${id}`}
      className="bg-gray-50 hover:shadow-lg cursor-pointer duration-300 shadow-md border"
      data-testid="card"
    >
      <figure className=" flex items-center justify-center w-[300px] h-[300px]">
        <img src={image} alt={`pokemon ${name} image`} />
      </figure>
      <div className="items-center p-4 ">
        <h2 className="text-center font-bold pb-2">{name}</h2>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <p>Status: {status}</p>
      </div>
    </Link>
  );
}
