import { Route, Routes } from 'react-router-dom';

import { CharacterInfo, CharactersList } from '@/pages';
import { Layout } from '@/shared/components';

function App() {
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
