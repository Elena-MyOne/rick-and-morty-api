import { useContext } from 'react';
import { ThemeContext } from '../Contexts/AppContext';

export default function ThemesSelection() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`${theme === 'dark' ? 'text-gray-50' : 'text-black'} flex gap-4 justify-end`}>
      <div className="">Themes:</div>
      <label>
        Light{' '}
        <input
          type="radio"
          name="theme"
          value="light"
          style={{ accentColor: '#4ADE80' }}
          checked={theme === 'light'}
          onChange={() => setTheme && setTheme('light')}
        />
      </label>
      <label>
        Dark{' '}
        <input
          type="radio"
          name="theme"
          value="dark"
          style={{ accentColor: '#4ADE80' }}
          checked={theme === 'dark'}
          onChange={() => setTheme && setTheme('dark')}
        />
      </label>
    </div>
  );
}
