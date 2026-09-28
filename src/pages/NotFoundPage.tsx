import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>

      <p>
        Cette page n'existe pas.
      </p>

      <Link to="/docks">
        Retour aux quais
      </Link>
    </main>
  );
}
