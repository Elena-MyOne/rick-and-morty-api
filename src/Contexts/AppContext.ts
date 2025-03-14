import { createContext } from 'react';

export type ThemeStateType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<Partial<ThemeStateType>>({});
