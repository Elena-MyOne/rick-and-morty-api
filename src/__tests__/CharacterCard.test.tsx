import { BrowserRouter } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockCharacter } from '../mocks/mockCharacter';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setSelectedItems } from '../redux/slices/selectedItemsSlice';

const MockCharacterCard = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    </Provider>
  );
};

describe('CharacterCard component', () => {
  it('renders the relevant card data', () => {
    render(<MockCharacterCard />);
    const cardImage = screen.getByRole('img', { name: /character rick sanchez image/i });
    const cardName = screen.getByRole('heading', {
      name: /Rick Sanchez/i,
    });
    const gender = screen.getByText(/Gender: Male/i);
    const species = screen.getByText(/Species: Human/i);
    const button = screen.getByText(/learn more/i);
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('navigates to details page when clicked', async () => {
    render(<MockCharacterCard />);
    const button = screen.getByText(/learn more/i);
    fireEvent.click(button);
    const expectedURL = `/details/${mockCharacter.id}`;
    expect(window.location.pathname).toBe(expectedURL);
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(<MockCharacterCard />);
    const button = screen.getByText(/learn more/i);
    fireEvent.click(button);

    const cardImage = screen.getByRole('img', { name: /character rick sanchez image/i });
    const cardName = screen.getByRole('heading', {
      name: /Rick Sanchez/i,
    });
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });

  it('handles selection and deselection of a character', () => {
    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;
    render(<MockCharacterCard />);
    const heartButton = screen.getByTestId('icon');
    fireEvent.click(heartButton);
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedItems([mockCharacter]));
  });
});
