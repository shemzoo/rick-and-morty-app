import { Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout/Layout.component";
import CharactersList from "@/pages/CharactersList/CharactersList.component";
import CharacterInfo from "@/pages/CharacterInfo/CharacterInfo.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CharactersList />} />
        <Route path="character/:id" element={<CharacterInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
