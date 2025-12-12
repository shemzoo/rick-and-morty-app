import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { CharacterInfo, CharactersList } from '@/pages';
import { Layout } from '@/shared/components';

import { type RootState } from './stores/store';

function App() {
  const { theme } = useSelector((state: RootState) => state.theme);

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
