import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThemesSelection from '../components/ThemesSelection';
import { ThemeProvider } from '../Contexts/AppProvider';

describe('ThemesSelection component', () => {
  const renderWithProvider = () => {
    return render(
      <ThemeProvider>
        <ThemesSelection />
      </ThemeProvider>
    );
  };

  it('renders the correct theme options', () => {
    renderWithProvider();

    expect(screen.getByLabelText(/Light/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dark/i)).toBeInTheDocument();
  });

  it('checks the correct radio button based on the current theme', () => {
    renderWithProvider();

    const lightRadio = screen.getByLabelText(/Light/i) as HTMLInputElement;
    const darkRadio = screen.getByLabelText(/Dark/i) as HTMLInputElement;

    expect(lightRadio.checked).toBe(true);
    expect(darkRadio.checked).toBe(false);
  });
});
