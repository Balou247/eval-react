import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import DocksPage from "./pages/DocksPage";
import DockDetailPage from "./pages/DockDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div class = "cadre_titre">
          <h1 class = "titre">Station Atlas</h1>
        </div>

        <nav>
          <NavLink to="/docks">
            Quais
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={<DocksPage />}
        />

        <Route
          path="/docks"
          element={<DocksPage />}
        />

        <Route
          path="/docks/:dockId"
          element={<DockDetailPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
