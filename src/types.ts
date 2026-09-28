
export type DockStatus =
  | "available"
  | "blocked";

interface DockBase {
  readonly id: string;
  name: string;
  status: DockStatus;
  capacityTons: number;
}

export interface CrewDock extends DockBase {
  kind: "crew";
  maxPeople: number;
}

export interface CargoDock extends DockBase {
  kind: "cargo";
  craneCount: number;
}

export interface ServiceDock extends DockBase {
  kind: "service";
  toolStation: string;
}

export type Dock =
  | CrewDock
  | CargoDock
  | ServiceDock;

export interface DockDto {
  dock_id?: unknown;
  label?: unknown;
  kind?: unknown;
  state?: unknown;
  limit_tons?: unknown;

  max_people?: unknown;
  crane_count?: unknown;
  tool_station?: unknown;
}
