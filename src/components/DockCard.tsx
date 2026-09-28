import { Link } from "react-router-dom";
import type { Dock } from "../types";

interface DockCardProps {
  dock: Dock;
}

export default function DockCard({ dock }: DockCardProps) {
  return (
    <article class = "fond_cards">
      <h2>{dock.name}</h2>

      <p>ID : {dock.id}</p>
      <p>Type : {dock.kind}</p>

      <p>
        Statut :{" "}
        {dock.status === "available"
          ? "Disponible"
          : "Bloqué"}
      </p>

      <p>
        Capacité : {dock.capacityTons} tonnes
      </p>

      <Link to={`/docks/${dock.id}`}>
        Voir le quai
      </Link>
    </article>
  );
}
