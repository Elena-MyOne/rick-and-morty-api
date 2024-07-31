import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { store } from '../redux/store';
import MainPage from '../pages/MainPage';

const MockMainPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );
};

describe('MainPage component', () => {
  it('should render default home page layout', async () => {
    await act(async () => {
      render(<MockMainPage />);
    });
    const title1 = await screen.findByRole('heading', {
      name: /Rick Sanchez/i,
    });
    const title2 = await screen.findByRole('heading', {
      name: /Morty Smith/i,
    });

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });
});
