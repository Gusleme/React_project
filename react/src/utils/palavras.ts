export function normalizeWord(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

export function createWord(text: string, category: string, index: number): import('../types/game').Word {
  const normalized = normalizeWord(text)
  return {
    id: `${category}-${index}-${normalized}`,
    text,
    normalized,
    category: category as import('../types/game').ThemeId
  }
}

export function positionKey(pos: import('../types/game').CellPosition): string {
  return `${pos.row},${pos.column}`
}

export function arePositionsEqual(a: import('../types/game').CellPosition, b: import('../types/game').CellPosition): boolean {
  return a.row === b.row && a.column === b.column
}

export function getLineCells(
  start: import('../types/game').CellPosition,
  end: import('../types/game').CellPosition
): import('../types/game').CellPosition[] | null {
  const dr = Math.sign(end.row - start.row)
  const dc = Math.sign(end.column - start.column)
  const rowDiff = Math.abs(end.row - start.row)
  const colDiff = Math.abs(end.column - start.column)

  const isStraight = rowDiff === 0 || colDiff === 0 || rowDiff === colDiff
  if (!isStraight) return null

  const steps = Math.max(rowDiff, colDiff)
  const cells: import('../types/game').CellPosition[] = []

  for (let i = 0; i <= steps; i++) {
    cells.push({ row: start.row + dr * i, column: start.column + dc * i })
  }

  return cells
}

export function sameSequence(
  a: import('../types/game').CellPosition[],
  b: import('../types/game').CellPosition[]
): boolean {
  if (a.length !== b.length) return false
  return a.every((pos, i) => arePositionsEqual(pos, b[i]))
}