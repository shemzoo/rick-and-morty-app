import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.component";
import CharactersList from "./pages/CharactersList/CharactersList.component";
import CharacterInfo from "./pages/CharacterInfo/CharacterInfo.component";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterInfo />} />
      </Routes>
    </Layout>
  );
}

export default App;