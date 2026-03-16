export const DEFAULT_TERMINAL_WIDTH = 600;
export const DEFAULT_TERMINAL_HEIGHT = 400;

export interface LayoutTerminalSnapshot {
  id: string;
  name: string;
  command: string;
  cwd: string;
  x: number;
  y: number;
  w: number;
  h: number;
  parentId: string | null;
}

export interface SavedLayoutState {
  terminals: LayoutTerminalSnapshot[];
  canvasX: number;
  canvasY: number;
  zoom: number;
}

type LayoutTerminalInput = Partial<LayoutTerminalSnapshot> &
  Pick<LayoutTerminalSnapshot, 'id' | 'name' | 'cwd'>;

interface SavedLayoutInput {
  terminals?: LayoutTerminalInput[];
  canvasX?: number;
  canvasY?: number;
  zoom?: number;
}

export function normalizeLayoutTerminal(terminal: LayoutTerminalInput): LayoutTerminalSnapshot {
  return {
    id: terminal.id,
    name: terminal.name,
    command: terminal.command ?? '',
    cwd: terminal.cwd,
    x: terminal.x ?? 0,
    y: terminal.y ?? 0,
    w: terminal.w ?? DEFAULT_TERMINAL_WIDTH,
    h: terminal.h ?? DEFAULT_TERMINAL_HEIGHT,
    parentId: terminal.parentId ?? null,
  };
}

export function normalizeSavedLayout(
  layout: SavedLayoutInput | null | undefined,
): SavedLayoutState | null {
  if (!layout || !Array.isArray(layout.terminals)) {
    return null;
  }

  return {
    terminals: layout.terminals.map((terminal) => normalizeLayoutTerminal(terminal)),
    canvasX: typeof layout.canvasX === 'number' ? layout.canvasX : 0,
    canvasY: typeof layout.canvasY === 'number' ? layout.canvasY : 0,
    zoom: typeof layout.zoom === 'number' ? layout.zoom : 1,
  };
}

export function serializeLayoutState(
  terminals: Iterable<LayoutTerminalInput>,
  canvasX: number,
  canvasY: number,
  zoom: number,
): SavedLayoutState {
  return {
    terminals: Array.from(terminals, (terminal) => normalizeLayoutTerminal(terminal)),
    canvasX,
    canvasY,
    zoom,
  };
}
