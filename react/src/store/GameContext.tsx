import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { GameContextValue, GameState, GameConfig, ThemeId, CellPosition } from '../types/game'
import { createWord } from '../utils/words'
import { generateGrid } from '../utils/generateGrid'
import { getThemeWords, getAllThemes } from '../data/themes'
import { getLineCells } from '../utils/words'
import { sameSequence } from '../utils/words'

const DEFAULT_CONFIG: GameConfig = {
  gridSize: 10,
  wordsPerGame: 8,
  defaultTheme: 'animais',
  themes: getAllThemes()
}

function loadWordsForTheme(theme: ThemeId, limit: number): string[] {
  const words = getThemeWords(theme)
  const seen = new Set<string>()
  return words
    .map(w => w.trim().toUpperCase())
    .filter(w => {
      if (seen.has(w)) return false
      seen.add(w)
      return true
    })
    .slice(0, limit)
}

function buildState(theme: ThemeId): GameState {
  const words = loadWordsForTheme(theme, DEFAULT_CONFIG.wordsPerGame).map((text, index) => createWord(text, theme, index))
  const { grid, placements } = generateGrid(words, DEFAULT_CONFIG)

  return {
    status: 'playing',
    config: DEFAULT_CONFIG,
    theme,
    words,
    grid,
    placements,
    foundWordIds: [],
    selectedCells: [],
    selectionAnchor: null,
    isSelecting: false,
    elapsedSeconds: 0
  }
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => buildState(DEFAULT_CONFIG.defaultTheme))

  const tick = useCallback(() => {
    setState(s => ({ ...s, elapsedSeconds: s.elapsedSeconds + 1 }))
  }, [])

  useEffect(() => {
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [tick])

  const initGame = useCallback((nextTheme: ThemeId) => {
    setState(buildState(nextTheme))
  }, [])

  const newGame = useCallback((theme?: ThemeId) => {
    initGame(theme ?? state.theme)
  }, [initGame, state.theme])

  const changeTheme = useCallback((theme: ThemeId) => {
    initGame(theme)
  }, [initGame])

  const beginSelection = useCallback((position: CellPosition) => {
    setState(s => {
      if (s.status !== 'playing') return s
      if (!s.selectionAnchor) {
        return { ...s, selectionAnchor: position, selectedCells: [position], isSelecting: true }
      }
      const cells = getLineCells(s.selectionAnchor, position)
      return { ...s, selectedCells: cells ?? [position], isSelecting: true }
    })
  }, [])

  const updateSelection = useCallback((position: CellPosition) => {
    setState(s => {
      if (s.status !== 'playing' || !s.selectionAnchor || !s.isSelecting) return s
      const cells = getLineCells(s.selectionAnchor, position)
      return { ...s, selectedCells: cells ?? [s.selectionAnchor] }
    })
  }, [])

  const finishSelection = useCallback(() => {
    setState(s => {
      if (s.status !== 'playing' || s.selectedCells.length < 2) {
        return { ...s, selectedCells: [], selectionAnchor: null, isSelecting: false }
      }
      const selected = s.selectedCells
      const match = s.placements.find(p =>
        sameSequence(p.cells, selected) || sameSequence([...p.cells].reverse(), selected)
      )
      if (match && !s.foundWordIds.includes(match.word.id)) {
        const nextFound = [...s.foundWordIds, match.word.id]
        const won = nextFound.length === s.words.length
        return {
          ...s,
          foundWordIds: nextFound,
          selectedCells: [],
          selectionAnchor: null,
          isSelecting: false,
          status: won ? 'won' : 'playing'
        }
      }
      return { ...s, selectedCells: [], selectionAnchor: null, isSelecting: false }
    })
  }, [])

  const value: GameContextValue = {
    ...state,
    tick,
    newGame,
    changeTheme,
    beginSelection,
    updateSelection,
    finishSelection
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame deve ser usado dentro de GameProvider')
  return context
}