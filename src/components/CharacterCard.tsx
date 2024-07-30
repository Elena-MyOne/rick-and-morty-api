import { Link } from 'react-router-dom';
import { CharacterData } from '../types/CharacterData';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedItems, setSelectedItems } from '../redux/slices/selectedItemsSlice';
import { AppDispatch } from '../redux/store';

interface CharacterCardProps {
  character: CharacterData;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, id, image, gender, species } = character;
  const { selectedItems } = useSelector(selectSelectedItems);
  const dispatch = useDispatch<AppDispatch>();

  function handleSelectedItem(character: CharacterData) {
    if (selectedItems.includes(character)) {
      dispatch(setSelectedItems(selectedItems.filter((item) => item.id !== character.id)));
    } else {
      dispatch(setSelectedItems([...selectedItems, character]));
    }
  }

  return (
    <div
      className="bg-gray-50 hover:shadow-lg cursor-pointer duration-300 shadow-md border w-[300px] relative"
      data-testid="card"
    >
      <figure className=" flex items-center justify-center w-[299px] h-[299px]">
        <img src={image} alt={`pokemon ${name} image`} />
      </figure>
      <div className="items-center p-4 ">
        <h2 className="text-center font-bold pb-2">{name}</h2>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <div className="text-center mt-4 mb-2">
          <Link
            to={`/details/${id}`}
            className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
          >
            Learn More
          </Link>
        </div>
      </div>
      <button
        className={`${selectedItems.some((item) => item.id === character.id) ? 'text-green-400 hover:text-green-500' : 'text-gray-700 hover:text-green-400'} absolute top-0 right-0 bg-white -700 p-2 text-xl duration-300 `}
        onClick={() => handleSelectedItem(character)}
      >
        <IoHeart />
      </button>
    </div>
  );
}
