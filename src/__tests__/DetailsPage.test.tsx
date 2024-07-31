import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const MockDetailsPage = (id: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/details/${id}?name=`]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loader when loading', () => {
    global.fetch = vi.fn(() => new Promise(() => {}) as Promise<Response>);
    MockDetailsPage('1');

    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });

  it('displays error message when character is not found', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: false,
        }) as Promise<Response>
    );

    MockDetailsPage('111');

    await waitFor(() => {
      const errorMessage = screen.getByText(/Character not found/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
