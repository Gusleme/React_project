import { useGame } from '../store/ContextoJogo'
import { Celula } from './Celula'
import type { CelulaPosition } from '../types/game'

export function Grid() {
  const { grid, placements, foundWordIds, selectedCelulas, isSelecting, beginSelection, updateSelection, finishSelection } = useGame()

  const foundPositions = new Set<string>()
  placements
    .filter(p => foundWordIds.includes(p.word.id))
    .forEach(p => p.cells.forEach(pos => foundPositions.add(`${pos.row},${pos.column}`)))

  const isSelected = (row: number, column: number) =>
    selectedCelulas.some(pos => pos.row === row && pos.column === column)

  const handlePointerDown = (position: CelulaPosition) => {
    beginSelection(position)
  }

  const handlePointerEnter = (position: CelulaPosition) => {
    if (isSelecting) updateSelection(position)
  }

  const handlePointerUp = () => {
    finishSelection()
  }

  const handlePointerLeave = () => {
  }

  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 10}, 1fr)` }}
      role="grid"
      aria-label="Grade do caça-palavras"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <Celula
            key={cell.id}
            cell={cell}
            isSelected={isSelected(r, c)}
            isFound={foundPositions.has(cell.id)}
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
          />
        ))
      )}
    </div>
  )
}