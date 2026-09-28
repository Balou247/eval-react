import { Link, useParams } from "react-router-dom";
import type { Dock } from "../types";

const exampleDocks: Dock[] = [
  {
    id: "A-1",
    name: "Sas Aster",
    kind: "crew",
    status: "available",
    capacityTons: 12,
    maxPeople: 6,
  },
  {
    id: "B-2",
    name: "Quai Helios",
    kind: "cargo",
    status: "blocked",
    capacityTons: 40,
    craneCount: 2,
  },
  {
    id: "C-3",
    name: "Nacelle Vega",
    kind: "service",
    status: "available",
    capacityTons: 8,
    toolStation: "R2",
  },
];

export default function DockDetailPage() {
  const { dockId } = useParams();

  const dock = exampleDocks.find(
    (dock) => dock.id === dockId
  );

  if (!dock) {
    return (
      <main>
        <h1>Quai introuvable</h1>

        <p>
          Aucun quai ne possède cet identifiant.
        </p>

        <Link to="/docks">
          Retour aux quais
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/docks">
        Retour aux quais
      </Link>

      <h1>{dock.name}</h1>

      <p>ID : {dock.id}</p>
      <p>Type : {dock.kind}</p>
      <p>Statut : {dock.status}</p>
      <p>
        Capacité : {dock.capacityTons} tonnes
      </p>

      {dock.kind === "crew" && (
        <p>
          Personnes max : {dock.maxPeople}
        </p>
      )}

      {dock.kind === "cargo" && (
        <p>
          Nombre de grues : {dock.craneCount}
        </p>
      )}

      {dock.kind === "service" && (
        <p>
          Station outil : {dock.toolStation}
        </p>
      )}
    </main>
  );
}
