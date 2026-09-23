import type { Word, WordPlacement, GameConfig, WordDirection, CellPosition, GridCell } from '../types/game'

const DIRECTIONS: Record<WordDirection, [number, number]> = {
  horizontal: [0, 1],
  vertical: [1, 0],
  'diagonal-down': [1, 1],
  'diagonal-up': [-1, 1]
}

const DIRECTION_KEYS: WordDirection[] = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up']

function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function canPlace(
  grid: string[][],
  word: Word,
  start: CellPosition,
  direction: WordDirection,
  gridSize: number
): boolean {
  const [dr, dc] = DIRECTIONS[direction]
  const len = word.normalized.length
  const endRow = start.row + dr * (len - 1)
  const endCol = start.column + dc * (len - 1)

  if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) return false

  for (let i = 0; i < len; i++) {
    const r = start.row + dr * i
    const c = start.column + dc * i
    const existing = grid[r][c]
    if (existing !== '' && existing !== word.normalized[i]) return false
  }
  return true
}

function placeWord(
  grid: string[][],
  word: Word,
  start: CellPosition,
  direction: WordDirection
): CellPosition[] {
  const [dr, dc] = DIRECTIONS[direction]
  const len = word.normalized.length
  const cells: CellPosition[] = []

  for (let i = 0; i < len; i++) {
    const r = start.row + dr * i
    const c = start.column + dc * i
    grid[r][c] = word.normalized[i]
    cells.push({ row: r, column: c })
  }
  return cells
}

function findPlacement(
  grid: string[][],
  word: Word,
  gridSize: number
): { start: CellPosition; direction: WordDirection; cells: CellPosition[] } | null {
  const directions = shuffle([...DIRECTION_KEYS])
  const positions: CellPosition[] = []
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) positions.push({ row: r, column: c })
  }
  shuffle(positions)

  for (const direction of directions) {
    for (const start of positions) {
      if (canPlace(grid, word, start, direction, gridSize)) {
        const cells = placeWord(grid, word, start, direction)
        return { start, direction, cells }
      }
    }
  }
  return null
}

function fillEmpty(grid: string[][], gridSize: number): void {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[randomInt(letters.length)]
      }
    }
  }
}

function gridToCells(grid: string[][], gridSize: number): GridCell[][] {
  const result: GridCell[][] = []
  for (let r = 0; r < gridSize; r++) {
    const row: GridCell[] = []
    for (let c = 0; c < gridSize; c++) {
      row.push({
        id: `${r},${c}`,
        letter: grid[r][c],
        position: { row: r, column: c }
      })
    }
    result.push(row)
  }
  return result
}

export function generateGrid(words: Word[], config: GameConfig): { grid: GridCell[][]; placements: WordPlacement[] } {
  const maxAttempts = 100
  const sortedWords = [...words].sort((a, b) => b.normalized.length - a.normalized.length)

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const emptyGrid = Array.from({ length: config.gridSize }, () =>
      Array.from({ length: config.gridSize }, () => '')
    )
    const placements: WordPlacement[] = []
    let success = true

    for (const word of sortedWords) {
      const placement = findPlacement(emptyGrid, word, config.gridSize)
      if (!placement) {
        success = false
        break
      }
      placements.push({
        word,
        direction: placement.direction,
        start: placement.start,
        cells: placement.cells
      })
    }

    if (success) {
      fillEmpty(emptyGrid, config.gridSize)
      const grid = gridToCells(emptyGrid, config.gridSize)
      return { grid, placements }
    }
  }

  throw new Error('Não foi possível gerar a grade após múltiplas tentativas')
}