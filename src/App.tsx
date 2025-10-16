import { Route, Routes } from 'react-router-dom';

import CharacterInfo from '@/pages/CharacterInfo/CharacterInfo.component';
import CharactersList from '@/pages/CharactersList/CharactersList.component';
import Layout from '@/shared/components/Layout/Layout.component';

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
