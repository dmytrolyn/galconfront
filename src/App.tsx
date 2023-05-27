import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout";
import HomePage from "pages/HomePage";
import MenuPage from "pages/MenuPage";
import LobbyPage from "pages/LobbyPage";
import GamePage from "pages/GamePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/lobby/:id" element={<LobbyPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
