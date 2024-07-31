import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SelectedItems from '../components/SelectedItems';
import { Provider } from 'react-redux';
import { setSelectedItems } from '../redux/slices/selectedItemsSlice';
import { mockCharacter } from '../mocks/mockCharacter';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const initialState = {
  selectedItems: {
    selectedItems: [mockCharacter],
  },
};
const store = mockStore(initialState);

const MockSelectedItems = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SelectedItems />
      </BrowserRouter>
    </Provider>
  );
};

describe('SelectedItems component', () => {
  it('renders with selected items', () => {
    render(<MockSelectedItems />);
    expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('deletes items when "Unselect all" button clicked', () => {
    store.dispatch = vi.fn();
    render(<MockSelectedItems />);
    const button = screen.getByText(/Unselect all/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedItems([]));
  });
});
