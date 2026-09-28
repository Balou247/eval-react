import { useEffect, useState } from "react";
import DockCard from "../components/DockCard";
import type { Dock } from "../types";

export default function DocksPage() {

  const [docks, setDocks] = useState<Dock[]>([]);

  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"all" | "available" | "blocked">("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDocks() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/docks.json");

        if (!response.ok) {
          throw new Error("Erreur HTTP");
        }

        const raw = await response.json();

        const adapted: Dock[] = raw.map((item: any) => ({
          id: item.dock_id,
          name: item.label,
          kind: item.kind,
          status:
            item.state === "OPEN"
              ? "available"
              : "blocked",
          capacityTons: item.limit_tons,

          ...(item.kind === "crew"
            ? { maxPeople: item.max_people }
            : {}),

          ...(item.kind === "cargo"
            ? { craneCount: item.crane_count }
            : {}),

          ...(item.kind === "service"
            ? { toolStation: item.tool_station }
            : {}),
        }));

        setDocks(adapted);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDocks();
  }, []);

   const visibleDocks = docks.filter((dock) => {
    const matchesSearch =
      dock.name
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      dock.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function resetFilters() {
    setQuery("");
    setStatusFilter("all");
  }

  if (loading) {
    return (
      <main>
        <h1>Quais d'amarrage</h1>
        <p>Chargement...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Quais d'amarrage</h1>
        <p>Erreur : {error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Quais d'amarrage</h1>

      <p>
        {visibleDocks.length} résultat(s)
      </p>

      <div class = "navbar">
        <input 
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value as
                | "all"
                | "available"
                | "blocked"
            )
          }
        >
          <option value="all">Tous</option>
          <option value="available">
            Disponible
          </option>
          <option value="blocked">
            Bloqué
          </option>
        </select>

        <button onClick={resetFilters}>
          Réinitialiser
        </button>
      </div>

      {docks.length === 0 ? (
        <p>
          Aucun quai disponible dans le manifeste.
        </p>
      ) : visibleDocks.length === 0 ? (
        <div>
          <p>
            Aucun quai ne correspond à votre recherche
          </p>

          <button onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>
      ) : (
        visibleDocks.map((dock) => (
          <DockCard
            key={dock.id}
            dock={dock}
          />
        ))
      )}
    </main>
  );
}
