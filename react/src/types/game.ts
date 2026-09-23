export type ThemeId = 'animais' | 'frutas' | 'cores' | 'tecnologia' | 'escola' | 'natureza' | 'profissoes'

export type WordDirection = 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up'

export interface CellPosition {
  row: number
  column: number
}

export interface GridCell {
  id: string
  letter: string
  position: CellPosition
}

export interface Word {
  id: string
  text: string
  normalized: string
  category: ThemeId
}

export interface WordPlacement {
  word: Word
  direction: WordDirection
  start: CellPosition
  cells: CellPosition[]
}

export interface GameConfig {
  gridSize: number
  wordsPerGame: number
  defaultTheme: ThemeId
  themes: readonly ThemeId[]
}

export type GameStatus = 'playing' | 'won'

export interface GameState {
  status: GameStatus
  config: GameConfig
  theme: ThemeId
  words: Word[]
  grid: GridCell[][]
  placements: WordPlacement[]
  foundWordIds: string[]
  selectedCells: CellPosition[]
  selectionAnchor: CellPosition | null
  isSelecting: boolean
  elapsedSeconds: number
}

export interface GameContextValue extends GameState {
  tick: () => void
  newGame: (theme?: ThemeId) => void
  changeTheme: (theme: ThemeId) => void
  beginSelection: (position: CellPosition) => void
  updateSelection: (position: CellPosition) => void
  finishSelection: () => void
}