import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/slices/charactersSlice';

const mockStore = configureStore();
const initialState = {
  characters: {
    currentPage: 1,
    pages: 2,
    nextPage: '2',
    prevPage: null,
  },
};
const store = mockStore(initialState);

const MockPagination = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    </Provider>
  );
};

const mockStoreForPreviousButton = configureStore();
const initialStatePrev = {
  characters: {
    currentPage: 2,
    pages: 2,
    nextPage: null,
    prevPage: '1',
  },
};
const storePrev = mockStoreForPreviousButton(initialStatePrev);

const MockPaginationPrev = () => {
  return (
    <Provider store={storePrev}>
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    </Provider>
  );
};

describe('Pagination component', () => {
  it('renders component elements', () => {
    render(<MockPagination />);
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('renders previous button correctly', () => {
    render(<MockPagination />);
    const previous = screen.getByText(/Previous/i);
    expect(previous).toBeDisabled;
  });

  it('renders next button correctly', async () => {
    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;
    render(<MockPagination />);
    const next = screen.getByText(/Next/i);
    expect(next).toBeEnabled;
    fireEvent.click(next);
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setCurrentPage(2));
    });
    expect(next).toBeDisabled;
  });

  it('renders last page button correctly', async () => {
    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;
    render(<MockPagination />);
    const last = screen.getByText(/2/i);
    fireEvent.click(last);
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setCurrentPage(2));
    });
  });

  it('previous button functionality', async () => {
    const dispatchMock = vi.fn();
    storePrev.dispatch = dispatchMock;
    render(<MockPaginationPrev />);
    const previous = screen.getByText(/Previous/i);
    expect(previous).toBeEnabled;
    fireEvent.click(previous);
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setCurrentPage(1));
    });
    expect(previous).toBeDisabled;
  });
});
