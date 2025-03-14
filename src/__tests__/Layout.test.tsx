import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../Contexts/AppContext';
import Layout from '../components/Layout';

vi.mock('../components/Header', () => ({
  default: () => <div>Header</div>,
}));
vi.mock('../components/SelectedItems', () => ({
  default: () => <div>SelectedItems</div>,
}));
vi.mock('../components/ThemesSelection', () => ({
  default: () => <div>ThemesSelection</div>,
}));

const MockThemeContextProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) => <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;

describe('Layout component', () => {
  it('renders child components correctly', () => {
    render(
      <BrowserRouter>
        <MockThemeContextProvider theme="light">
          <Layout />
        </MockThemeContextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/ThemesSelection/i)).toBeInTheDocument();
    expect(screen.getByText(/SelectedItems/i)).toBeInTheDocument();
  });
});
