import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { CharacterInfo, CharactersList } from '@/pages';
import { Layout } from '@/shared/ui';
import { getThemeState } from '@/features/switchTheme/model';

function App() {
  const { theme } = useSelector(getThemeState);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Routes>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          index
          element={<CharactersList />}
        />
        <Route
          path='character/:id'
          element={<CharacterInfo />}
        />
      </Route>
    </Routes>
  );
}

export default App;
