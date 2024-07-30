import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedItems, setSelectedItems } from '../redux/slices/selectedItemsSlice';
import { AppDispatch } from '../redux/store';
import { CharacterData } from '../types/CharacterData';

export default function Layout() {
  const { selectedItems } = useSelector(selectSelectedItems);
  const dispatch = useDispatch<AppDispatch>();

  function createCSVFile(selectedItems: CharacterData[]) {
    const headers = ['Name', 'Species', 'Status', 'Type', 'ImageLink'];
    const rows = selectedItems.map((item) => [
      item.name,
      item.species,
      item.status,
      item.type,
      item.image,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      rows.map((e) => e.join(',')).join('\n');

    return encodeURI(csvContent);
  }

  function handleDownload() {
    const csvContent = createCSVFile(selectedItems);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `rick-and-morty-${selectedItems.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Header />
      <main className="m-auto px-0 py-6 md:container font-custom relative">
        <Outlet />
        {selectedItems.length > 0 && (
          <div className="fixed bottom-0 right-10 bg-gray-100 p-5 flex gap-12 items-center ">
            <button
              className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
              onClick={() => dispatch(setSelectedItems([]))}
            >
              Unselect all
            </button>
            <div className="">{selectedItems.length} items selected</div>
            <button
              className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        )}
      </main>
    </>
  );
}
